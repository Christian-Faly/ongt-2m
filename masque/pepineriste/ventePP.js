import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button ,Pressable,Dimensions} from 'react-native';
import { globalStyles,} from '../../styles/global';
import { MaterialIcons ,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import * as SQLite from 'expo-sqlite';
import VentePPForm from './ventePPForm';

// VenteAUE == VentePP
export default function VentePP({ route,navigation }) {
  const [saisieVente, setSaisieVente] = useState([]);
  const [vente, setVente] = useState([]);
  const [mode, setMode] = useState('Ajouter')

  let currentVente = undefined
  
  const [initialValue,setInitialValue] = useState({ 
      id_pepiniere :route.params.id,
      periode:'', 
      essence_vendue:'', 
      quantite:'',
      pu:'', 
      destinataire:''
    
    })
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{
    //Période, Essence vendue, Quantité,PU, Destinataire
    
      db.transaction((tx) => {
        //  tx.executeSql("DROP TABLE vente_pp",
        tx.executeSql("CREATE TABLE IF NOT EXISTS vente_pp"+
          "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_pepiniere INTEGER, annee INTEGER,"+
          "periode TEXT, essence_vendue TEXT, quantite REAL,pu REAL, destinataire TEXT)",
        null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM vente_pp WHERE id_pepiniere='+route.params.id ,null,
        (txObj, resultSet) => setVente(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  
     
    },[]);

    const showMasque = (id) =>{
      if (id===0){
        setMode('Ajouter')
        setInitialValue({ 
          id_pepiniere :route.params.id,
          annee:'', 
          periode:'', 
          essence_vendue:'', 
          quantite:'',
          pu:'', 
          destinataire:''
        });
      }else{
        setMode('Modifier')
        const nv = [...vente].filter(vente => vente.id == id)[0]
        setInitialValue (nv);
      }
      setSaisieVente(true)
    }  
    
    const addVente = (nouveau) => {
        let insertInto = "INSERT INTO vente_pp(";
        let values = " VALUES(";
        let tabvalues = [];
            
        Object.keys(nouveau).forEach(key => {
          insertInto =insertInto+key+','
          if (key ==='periode'){
            values = values +"?"+","
            currentVente = nouveau[key]
          }
          else
            values = values +"'" + nouveau[key]+"',"
          tabvalues = tabvalues +[nouveau[key]] 
        });
        
        if (insertInto.charAt(insertInto.length-1)===','){
          insertInto = insertInto.slice(0,insertInto.length-1);
        }
        insertInto = insertInto +')';
        
        if (values.charAt(values.length-1)===','){
          values = values.slice(0,values.length-1);
        }
        values = values +')';
        
        db.transaction(tx => {
          tx.executeSql(insertInto + values, [currentVente],
            (txObj, resultSet) => {
              let existingVentePP = [...vente];
              nouveau['id'] = resultSet.insertId
              existingVentePP.push(nouveau);
              setVente(existingVentePP);
              currentVente=undefined;
            },
            (txObj, error) => console.log(error)
          );
        });
      };
    
      const updateVente = (donnee) => {
        let update = "UPDATE vente_pp SET ";  
        Object.keys(donnee).forEach(key => {
          if (donnee[key]!==null && key!=='id') {
            if (typeof (donnee[key]) == "number")
              update = update + " " + key + " = " + donnee[key] + ","
            else
              update = update + " " + key + " = '" + donnee[key] +"',"
          }
        });
           if (update.charAt(update.length-1)===','){
               update = update.slice(0,update.length-1);
        }
        update = update + ' WHERE id ='+ donnee['id']
          // console.log(update)
          
      db.transaction(tx => {
        tx.executeSql(update,()=> {},
          (txObj, resultSet) => {
            console.log(resultSet)
            // console.log(resultSet)
            if (resultSet.rowsAffected > 0) {
              let existingVentePP = [...vente];
              const indexToUpdate = existingVentePP.findIndex(vente => vente.id === donnee['id']);
              console.log(donnee['id']  +' index  '+indexToUpdate)
              existingVentePP[indexToUpdate] = donnee;
              setVente(existingVentePP);
              setSaisieVente(false)
            }
            else
              console.log('ERREUR')
          }
        );
      });
      }
    const deleteNom = (id) => {
    console.log('id',id)  
    db.transaction(tx => {
      tx.executeSql('DELETE FROM vente_pp WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log('mandalo2')
            let existingVentePP = [...vente].filter(vente => vente.id !== id);
            setVente(existingVentePP);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  let dataPass ={
    id_pepiniere:route.params.id,
    initValue:initialValue,
    mode : mode
  }

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { route.params.nom }
        </Text>
        <Text>{ route.params.commune }</Text>
        <Text>{ route.params.annee }</Text>
      </Card>
  
      <Modal visible={saisieVente} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieVente(false)} 
            />
            <VentePPForm pass={{dataPass,add:addVente,update:updateVente}}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Entypo 
        name='add-to-list' 
        color='blue'
        size={40} 
        style={styles.modalToggle}
        onPress={() => showMasque(0)} 
      />

      <FlatList data={vente} renderItem={({ item }) => (
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>
            <Text style={styles.box}>{item.periode+' - '+item.essence_vendue}</Text>
            {/* <Pressable style={styles.box}
                        onPress={() => {
                        navigation.navigate('Membre famille des membres AUE', item)}} >
            <Text style={{color:'#29B960', fontWeight: 'bold'}} >Lien de parenté</Text>
            </Pressable> */}
            
            <Pressable  
                     style={styles.box}
                     onPress={() => deleteNom(item.id)} >
                        <Text style={{color:'#FF0000', fontWeight: 'bold'}}>Supprimer</Text> 
           </Pressable>
          </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8
  },
  container: {
    flex:1,
    flexDirection: 'row',
    flexWrap:'wrap',
    padding:2
  },
  box:{
    margin:2,
    width: Dimensions.get("window").width / 3.2-3,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius: 8
  },
 text:{
  color:'#00FF00',
  // '#808000',
  fontWeight: 'bold'

 }

});