import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
// import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';
import { globalStyles  } from '../../styles/global';
import { MaterialIcons,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import Card from '../../shared/card';
import DotationRbmCOMForm from './rbmComDotatForm';
import * as SQLite from 'expo-sqlite';

export default function RbmComDotat({ route, navigation }) {
  const [saisieOffert, setSaisieOffert] = useState(false);
  const [offert, setOffert] = useState([]);
  const [valueToUpdate, setValueToUpdate] = useState({});
  const [mode, setMode] = useState('Ajouter');



  let currentOffert = undefined

  const [initialValue, setInitialValue] = useState({ id_rbm_com : route.params.id,
                                                     nom_espece : '',
                                                     nb_jeune_plant : ''
                                                   })
  
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{
    setValueToUpdate({id:route.params.id});
    db.transaction((tx) => {
        //  tx.executeSql("DROP TABLE dotation_rbm_com",
        tx.executeSql("CREATE TABLE IF NOT EXISTS dotation_rbm_com"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_rbm_com INTEGER,"+
        "nom_espece TEXT,nb_jeune_plant INTEGER)",
            null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
    
     db.transaction(tx => {
      tx.executeSql('SELECT * FROM dotation_rbm_com WHERE id_rbm_com='+ route.params.id, null,
        (txObj, resultSet) => setOffert(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  
  
    },[]);
  
    const showMasque = (id) =>{
      if (id===0){
        setMode('Ajouter')
        setInitialValue({ id_rbm_com : route.params.id,
                          nom_espece : '',
                          nb_jeune_plant : ''
                        })}
      else{
        setMode('Modifier')
        const nv = [...offert].filter(offert => offert.id == id)[0]
        setInitialValue (nv);
      }
      setSaisieOffert(true)
    }  
    
    const addOffert = (nouveau) => {
        let insertInto = "INSERT INTO dotation_rbm_com(";
        let values = " VALUES(";
        let tabvalues = [];
            
        Object.keys(nouveau).forEach(key => {
          insertInto =insertInto+key+','
          if (key ==='nom_espece'){
            values = values +"?"+","
            currentOffert = nouveau[key]
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
          tx.executeSql(insertInto + values, [currentOffert],
            (txObj, resultSet) => {
              let existingOffert = [...offert];
              nouveau['id'] = resultSet.insertId
              existingOffert.push(nouveau);
              setOffert(existingOffert);
              currentOffert=undefined;
            },
            (txObj, error) => console.log(error)
          );
        });
      };
    
      const updateOffert = (donnee) => {
        let update = "UPDATE dotation_rbm_com SET ";  
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
              let existingOffert = [...offert];
              const indexToUpdate = existingOffert.findIndex(offert => offert.id === donnee['id']);
              console.log(donnee['id']  +' index  '+indexToUpdate)
              existingOffert[indexToUpdate] = donnee;
              setOffert(existingOffert);
              setSaisieOffert(false)
            }
            else
              console.log('ERREUR')
          }
        );
      });
      }
    
    const deleteNom = (id) => {
      
      db.transaction(tx => {
        tx.executeSql('DELETE FROM dotation_rbm_com WHERE id = ?', [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              console.log('mandalo2')
              let existingOffert = [...offert].filter(designation => designation.id !== id);
              setOffert(existingOffert);
            }
          },
          (txObj, error) => console.log(error)
        );
      });
    };
    const dataPass ={
      id_rbm_com:route.params.id_rbm_com,
      initValue:initialValue,
      mode:mode
    }
     
  return (
    <View style={globalStyles.container}>

      <Card>
        <Text style={globalStyles.titleText}>
          { route.params.designation }
        </Text>
      </Card>

      <Modal visible={saisieOffert} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieOffert(false)} 
            />
            <DotationRbmCOMForm passOffert={{dataPass,add:addOffert, update:updateOffert}} />
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

      <FlatList data={offert} renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable style={styles.box}
                      onPress={() => {showMasque(item.id),
                                     setValueToUpdate({id:100})}}>
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>
            <Text style={styles.box}>{ item.nom_espece }</Text>

            <Pressable style={styles.box}
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
    margin: 2
  },
  container: {
    flex:1,
    flexDirection: 'row',
    flexWrap:'wrap',
    padding:2
  },
  box:{
    margin:2,
    width: Dimensions.get("window").width / 3.2-2,
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