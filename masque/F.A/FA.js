import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button ,Pressable,Dimensions} from 'react-native';
import { globalStyles } from '../../styles/global';
import { MaterialIcons,MaterialCommunityIcons ,Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import FAForm from './FAForm';
import * as SQLite from 'expo-sqlite';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia

export default function FA({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieFA, setSaisieFA] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'FA'
  const [valeurID, setValeurID] = useState(0);

  const [dataFokontany, setDataFokontany] = useState([]);
  const [FA, setFA] = useState([]);
  const [mode, setMode] = useState('Ajouter');

  let currentFA = undefined
  const [dataCommune, setDataCommune] = useState([])

  const [initialValue,setInitialValue] = useState({ ncommune: '',
                                                    fokontany:'',
                                                    village:'',
                                                    nom :'',
                                                    date_formation:'',
                                                    nb_foyer_diffuse: ''
                                                  })

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

     db.transaction((tx) => {
    //  tx.executeSql("DROP TABLE  foyer_amel",
      tx.executeSql("CREATE TABLE IF NOT EXISTS foyer_amel"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT,  ncommune TEXT, fokontany TEXT, village TEXT,"+
         "nom TEXT,localite_anim TEXT,date_formation DATE, nb_foyer_diffuse INTEGER)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
      )
    });
  
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM foyer_amel ", null,
        (txObj, resultSet) => setFA(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    db.transaction(tx => {
      tx.executeSql("SELECT commune_tablette.*, nom AS commune FROM commune_tablette "+
      "JOIN pa_commune ON ncommune = code",
        null,
        (txObj, resultSet) => setComTab(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM pa_fokontany" ,null,
        (txObj, resultSet) => setDataFokontany(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  

  },[]);
  
  const showMasque = (id) =>{
    if (id===0){
      setMode('Ajouter')
      setInitialValue({ ncommune:'',
                        fokontany:'',
                        village:'',
                        nom :'',
                        date_formation:'',
                        nb_foyer_diffuse: ''
                      })}
    else{
      setMode('Modifier')
      const nv = [...FA].filter(fa => fa.id == id)[0]
      setInitialValue (nv);
    }
    setSaisieFA(true)
  }  
  
  const addFA = (nouveau) => {
      let insertInto = "INSERT INTO foyer_amel(";
      let values = " VALUES(";
      let tabvalues = [];
          
      Object.keys(nouveau).forEach(key => {
        insertInto =insertInto+key+','
        if (key ==='nom'){
          values = values +"?"+","
          currentFA = nouveau[key]
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
        tx.executeSql(insertInto + values, [currentFA],
          (txObj, resultSet) => {
            let existingFA = [...FA];
            nouveau['id'] = resultSet.insertId
            existingFA.push(nouveau);
            setFA(existingFA);
            currentFA=undefined;
          },
          (txObj, error) => console.log(error)
        );
      });
    };
  
    const updateFA = (donnee) => {
      let update = "UPDATE foyer_amel SET ";  
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
            let existingFA = [...FA];
            const indexToUpdate = existingFA.findIndex(fa => fa.id === donnee['id']);
            console.log(donnee['id']  +' index  '+indexToUpdate)
            existingFA[indexToUpdate] = donnee;
            setFA(existingFA);
            setSaisieFA(false)
          }
          else
            console.log('ERREUR')
        }
      );
    });
    }

  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM foyer_amel WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingFA = [...FA].filter(nom => nom.id !== id);
            setFA(existingFA);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  const dataPass ={
    lstFokontany :dataFokontany,
    lstCommune :dataCommune,
    initValue:initialValue,
    comTab:comTab,
    mode : mode,
    setSaisieFA:setSaisieFA
  }

  let passServeur ={
    activity : 'FA',
    valeurID : valeurID,
    setExporter: setExporter
  }

  function transformDate(date_fr) {
    var temp = date_fr.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    return temp2
  }

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des F.A '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieFA} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieFA(false)} 
            />
            <FAForm passFA={{dataPass,add:addFA, update:updateFA}}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal visible={exporter} animationType='slide'>
          <View style={styles.modalContent}>
            <ConnexionServer passServeur = {passServeur}/>
          </View>
      </Modal>

      <Entypo
        name='add-to-list' 
        size={40} 
        color ="blue"
        style={styles.modalToggle}
        onPress={() => showMasque(0)} 
      />

      <FlatList data={FA} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Beneficiaire FA', item)}>
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.nom+'-'+transformDate(item.date_formation)}</Text>
            
            {/* <Button title='dotation' onPress={() => navigation.navigate('Dotation RBM', item)} /> */}
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingFA = [...FA].filter(nom => nom.id !== item.id);
                                      setFA(existingFA);
                                  }
                                }
                        style={styles.box}> 
               <Text style={{color:'green', fontWeight: 'bold'}}>transférer</Text>  
            </Pressable>
            
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
    width: Dimensions.get("window").width / 4-15,
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