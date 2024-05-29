import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles,} from '../../styles/global';
import { MaterialIcons ,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import * as SQLite from 'expo-sqlite';
import BenefFAForm from './benefFAForm';

export default function BenefFA({ route,navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieBenef, setSaisieBenef] = useState(false);
  const [benef, setBenef] = useState(false);
  const [dataListBenef, setDataListBenef] = useState([]);
  const [dataFokontany, setDataFokontany] = useState([]);
  const [mode, setMode] = useState('Ajouter');
  let currentBenef = undefined
  
  const [initialValue,setInitialValue] = useState({ 
    
    
                                                    ncommune:'',
                                                    fokontany:'',
                                                    nom_prenom: '', 
                                                    cin: '', 
                                                    id_fa :route.params.id,
                                                    
                                                  })
 
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

      db.transaction((tx) => {
      //  tx.executeSql("DROP TABLE benef_f_amel",
        tx.executeSql("CREATE TABLE IF NOT EXISTS benef_f_amel"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT,ncommune INTEGER,fokontany TEXT,id_fa INTEGER,"+
        "nom_prenom TEXT, nb_foyer_diffuse INTEGER, cin TEXT)",
            null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM benef_f_amel WHERE id_fa='+route.params.id ,null,
        (txObj, resultSet) => setBenef(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM commune_tablette",
        null,
        (txObj, resultSet) => setComTab(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM pa_fokontany",null,
        (txObj, resultSet) => setDataFokontany(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  
  
    },[]);
  
    const showMasque = (id) =>{
      if (id===0){
        setMode('Ajouter')
        setInitialValue({ 
                          ncommune:comTab[0].ncommune,
                          fokontany:'',
                          nom_prenom: '', 
                          cin: '', 
                          id_fa :route.params.id,
                          
                        })}
      else{
        setMode('Modifier')
        const nv = [...benef].filter(benef => benef.id == id)[0]
        setInitialValue (nv);
      }
      setSaisieBenef(true)
    }  
    
    const addBenef = (nouveau) => {
        let insertInto = "INSERT INTO benef_f_amel(";
        let values = " VALUES(";
        let tabvalues = [];
            
        Object.keys(nouveau).forEach(key => {
          insertInto =insertInto+key+','
          if (key ==='nom_prenom'){
            values = values +"?"+","
            currentBenef = nouveau[key]
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
          tx.executeSql(insertInto + values, [currentBenef],
            (txObj, resultSet) => {
              let existingBenefFA = [...benef];
              nouveau['id'] = resultSet.insertId
              existingBenefFA.push(nouveau);
              setBenef(existingBenefFA);
              currentBenef=undefined;
            },
            (txObj, error) => console.log(error)
          );
        });
      };
    
      const updateBenef = (donnee) => {
        let update = "UPDATE benef_f_amel SET ";  
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
              let existingBenefFA = [...benef];
              const indexToUpdate = existingBenefFA.findIndex(benef => benef.id === donnee['id']);
              console.log(donnee['id']  +' index  '+indexToUpdate)
              existingBenefFA[indexToUpdate] = donnee;
              setBenef(existingBenefFA);
              setSaisieBenef(false)
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
      tx.executeSql('DELETE FROM benef_f_amel WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log('mandalo2')
            let existingBenefFA = [...benef].filter(benef => benef.id !== id);
            setBenef(existingBenefFA);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  let dataPass ={
    id_fa:route.params.id,
    lstListBenef :dataListBenef,
    lstFokontany :dataFokontany,
    initValue:initialValue,
    mode : mode
  }

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { route.params.nom_prenom }
        </Text>
        <Text>{ route.params.commune }</Text>
        <Text>{ route.params.annee }</Text>
        <Text>{ route.params.campagne }</Text>
      </Card>
  
      <Modal visible={saisieBenef} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieBenef(false)} 
            />
            <BenefFAForm passBenef={{dataPass,add:addBenef, update:updateBenef}}/>
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

      <FlatList data={benef} renderItem={({ item }) => (
        <TouchableOpacity 
        // onPress={() => navigation.navigate('Dotation FA', item)}
        >
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>
            
            <Text style={styles.box}>{item.nom_prenom}</Text>
            {/* <Pressable style={styles.box}
                        onPress={() => {
                        navigation.navigate('Membre famille beneficiaire FA', item)}} >
            <Text style={{color:'#29B960', fontWeight: 'bold'}} >Lien de parenté</Text>
            </Pressable> */}
            <Pressable style={styles.box}
                       onPress={() => deleteNom(item.id)} >
            <Text style={{color:'#FF0000', fontWeight: 'bold'}}>Supprimer</Text>
            </Pressable>
          </View>
        </TouchableOpacity>
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