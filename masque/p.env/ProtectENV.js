import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import ProtectEnvForm from './ProtectEnvForm';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia



export default function ProtectENV({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieENV, setSaisieENV] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'ENV'
  const [valeurID, setValeurID] = useState(0);

  const [ENV, setENV] = useState([]);
  const [mode, setMode] = useState('Ajouter');

  let currentENV = undefined
  const [dataFokontany, setDataFokontany] = useState([])

  const [initialValue,setInitialValue] = useState({ 
                                                    ncommune:'',
                                                    fokontany:'',
                                                    nom_perimetre: '', 
                                                    nom_espece_utilisee: '',
                                                    riv_canal_protegee: '',
                                                    longuer: '',
                                                    point_metriq_depart: '',
                                                    point_metriq_fin:'',
                                                    date_mis_terre:'',
                                                    date_suivie:''
                                                  })
  
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )
  
  useEffect(()=>{
  
    db.transaction((tx) => {
        //  tx.executeSql("DROP TABLE env",
        tx.executeSql("CREATE TABLE IF NOT EXISTS env"+
                    "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_env INTEGER,ncommune INTEGER,fokontany TEXT,"+
                    "nom_perimetre TEXT,partie_ouvrage TEXT, nom_espece_utilisee TEXT, riv_canal_protegee TEXT,"+
                     "longuer TEXT, point_metriq_depart TEXT, point_metriq_fin TEXT,date_mis_terre DATE,date_suivie DATE)",
       null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
   db.transaction(tx => {
    tx.executeSql("SELECT * FROM env ",
      null,
      (txObj, resultSet) => setENV(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM pa_fokontany', null,
      (txObj, resultSet) => setDataFokontany(resultSet.rows._array),
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

},[]);
  
const showMasque = (id) =>{
  if (id===0){
    setMode('Ajouter')
    setInitialValue({ 
                      ncommune:'',
                      fokontany:'',
                      nom_perimetre: '', 
                      nom_espece_utilisee: '',
                      riv_canal_protegee: '',
                      longuer: '',
                      point_metriq_depart: '',
                      point_metriq_fin:'',
                      date_mis_terre:'',
                      date_suivie:''
                    })}
  else{
    setMode('Modifier')
    const nv = [...ENV].filter(env => env.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieENV(true)
}  

const addENV = (nouveau) => {
    let insertInto = "INSERT INTO env(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom_perimetre'){
        values = values +"?"+","
        currentENV = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentENV],
        (txObj, resultSet) => {
          let existingENV = [...ENV];
          nouveau['id'] = resultSet.insertId
          existingENV.push(nouveau);
          setENV(existingENV);
          currentENV=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateENV = (donnee) => {
    let update = "UPDATE env SET ";  
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
          let existingENV = [...ENV];
          const indexToUpdate = existingENV.findIndex(env => env.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingENV[indexToUpdate] = donnee;
          setENV(existingENV);
          setSaisieENV(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }
  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM env WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingENV = [...ENV].filter(nom_perimetre => nom_perimetre.id !== id);
            setENV(existingENV);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showAlert = (id) =>
  Alert.alert(
    "Attention !!!",
    "Etes-vous sur de vouloir supprimer cet element?",
    [
      {
        text: "Non",
        style: "cancel",
      },
      {
        text: "Oui",
        onPress: () => deleteNom(id),
        // style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
  
  const dataPass ={
    lstFokontany :dataFokontany,
    comTab:comTab,
    initValue:initialValue,
    mode : mode
   }
   let passServeur ={
    activity : 'ENV',
    valeurID : valeurID,
    setExporter: setExporter
  }


  
  return (
    <View style={globalStyles.container}>
      <Card style={globalStyles.Card}>
        <Text style={globalStyles.titleText}>
          { 'Liste des protection '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieENV} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieENV(false)} 
            />
            <ProtectEnvForm passENV={{dataPass,add:addENV, update:updateENV}}/>
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

      <FlatList data={ENV} renderItem={({ item }) => (
          <View style={styles.row}>
          <Pressable  style={styles.box}
                        onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.nom_perimetre}</Text>
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingENV = [...ENV].filter(nom => nom.id !== item.id);
                                      setENV(existingENV);
                                  }
                                }
                        style={styles.box}> 
               <Text style={{color:'green', fontWeight: 'bold'}}>transférer</Text>  
            </Pressable>                             
          

            <Pressable style={styles.box}
                       onPress={() => showAlert(item.id)}>
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