import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button ,Pressable,Dimensions} from 'react-native';
import { globalStyles,} from '../../styles/global';
import { MaterialIcons ,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import * as SQLite from 'expo-sqlite';
import MembreOPForm from './membreOPForm';

// BenefAUE == MembreOP
export default function MembreOP({ route,navigation }) {
  const [saisieMembre, setSaisieMembre] = useState([]);
  const [membreOP, setMembreOP] = useState([]);
  const [mode, setMode] = useState('Ajouter')

  let currentMembreOP = undefined
 
  const [initialValue,setInitialValue] = useState({
      id_op :route.params.id,
      nom_prenom : '',
      annee_naissance : '',
      cin : '',
      sexe : '',
      lettree_on : '',
      niveau_etude : '',
      fonction : '',
      date_entree : '',
      date_sortie : '',
    })
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{
      
      db.transaction((tx) => {
        // tx.executeSql("DROP TABLE membre_op_com",
        tx.executeSql("CREATE TABLE IF NOT EXISTS membre_op_com"+
          "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_op INTEGER, nom_prenom TEXT, " +
          "annee_naissance TEXT, cin TEXT, sexe TEXT, lettree_on TEXT, niveau_etude TEXT,"+
          "fonction  TEXT, date_entree DATE, date_sortie DATE)",
        null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM membre_op_com WHERE id_op ='+route.params.id ,null,
        (txObj, resultSet) => setMembreOP(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  },[]);

    const showMasque = (id) =>{
      if (id===0){
        setMode('Ajouter')
        setInitialValue({ 
          id_op :route.params.id,
          nom_prenom : '',
          annee_naissance : '',
          cin : '',
          sexe : '',
          lettree_on : '',
          niveau_etude : '',
          fonction : '',
          date_entree : '',
          date_sortie : '',
        });
      }else{
        setMode('Modifier')
        const nv = [...membreOP].filter(membre => membre.id == id)[0]
        setInitialValue (nv);
      }
      setSaisieMembre(true)
    }  
    
    const addMembreOP = (nouveau) => {
        let insertInto = "INSERT INTO membre_op_com(";
        let values = " VALUES(";
        let tabvalues = [];
            
        Object.keys(nouveau).forEach(key => {
          insertInto =insertInto+key+','
          if (key ==='nom_prenom'){
            values = values +"?"+","
            currentMembreOP = nouveau[key]
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
        // console.log(insertInto + values)
        db.transaction(tx => {
          tx.executeSql(insertInto + values, [currentMembreOP],
            (txObj, resultSet) => {
              let existingMembreOP = [...membreOP];
              nouveau['id'] = resultSet.insertId
              existingMembreOP.push(nouveau);
              setMembreOP(existingMembreOP);
              currentMembreOP=undefined;
            },
            (txObj, error) => console.log(error)
          );
        });
      };
    
      const updateMembreOP = (donnee) => {
        let update = "UPDATE membre_op_com SET ";  
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
              let existingMembreOP = [...membreOP];
              const indexToUpdate = existingMembreOP.findIndex(exploi => exploi.id === donnee['id']);
              console.log(donnee['id']  +' index  '+indexToUpdate)
              existingMembreOP[indexToUpdate] = donnee;
              setMembreOP(existingMembreOP);
              setSaisieMembre(false)
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
      tx.executeSql('DELETE FROM membre_op_com WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log('mandalo2')
            let existingMembreOP = [...membreOP].filter(pepi => pepi.id !== id);
            setMembreOP(existingMembreOP);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  let dataPass ={
    id_op:route.params.id,
    initValue:initialValue,
    mode : mode,
    setSaisieMembre:setSaisieMembre
  }

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { route.params.nom }
        </Text>
      </Card>
  
      <Modal visible={saisieMembre} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieMembre(false)} 
            />
            <MembreOPForm pass={{dataPass,add:addMembreOP,update:updateMembreOP}}/>
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

      <FlatList data={membreOP} renderItem={({ item }) => (
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>
            <Text style={styles.box}>{item.nom_prenom}</Text>
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