import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles,ButtonStyles } from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import MPVForm from './MPVForm';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia


export default function MPV({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [exporter, setExporter] = useState(false);
  const activity = 'MPV'
  const [valeurID, setValeurID] = useState(0);
  const [saisieMPV, setSaisieMPV] = useState(false);
  const [MPV, setMPV] = useState([]);
  const [mode, setMode] = useState('Ajouter');
  let currentMPV = undefined
  const [dataFokontany, setDataFokontany] = useState([]);
  
  const [initialValue,setInitialValue] = useState({ ref: '', 
                                                    ncommune: '',
                                                    fokontany:'',
                                                    speculation_special: route.params.description,
                                                    nom: '',
                                                    date_mep: '',
                                                  })

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

     db.transaction((tx) => {
  // tx.executeSql("DROP TABLE  mpv",
  tx.executeSql("CREATE TABLE IF NOT EXISTS mpv"+
               "(id INTEGER PRIMARY KEY AUTOINCREMENT,speculation_special TEXT, ref TEXT, ncommune TEXT, fokontany TEXT, "+
               "nom TEXT, date_mep DATE)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
    )
  });
  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM mpv  WHERE speculation_special ='"+route.params.description+"'",
      null,
      (txObj, resultSet) => setMPV(resultSet.rows._array),
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
    setInitialValue({ ref: '', 
                      ncommune:'',
                      fokontany:'',
                      speculation_special: route.params.description,
                      nom: '',
                      date_mep: '',
                
                    })}
  else{
    setMode('Modifier')
    const nv = [...MPV].filter(mpv => mpv.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieMPV(true)
}  

const addMPV = (nouveau) => {
    let insertInto = "INSERT INTO mpv(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom'){
        values = values +"?"+","
        currentMPV = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentMPV],
        (txObj, resultSet) => {
          let existingMPV = [...MPV];
          nouveau['id'] = resultSet.insertId
          existingMPV.push(nouveau);
          setMPV(existingMPV);
          currentMPV=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateMPV = (donnee) => {
    let update = "UPDATE mpv SET ";  
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
          let existingMPV = [...MPV];
          const indexToUpdate = existingMPV.findIndex(mpv => mpv.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingMPV[indexToUpdate] = donnee;
          setMPV(existingMPV);
          setSaisieMPV(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }
  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM mpv WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingMPV = [...MPV].filter(nom => nom.id !== id);
            setMPV(existingMPV);
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
    speculation:route.params.description,//navigation.getParam('description'),
    typa:route.params.typa,//navigation.getParam('typa'),
    // lstCommune :dataCommune,
    initValue:initialValue,
    typeMPV :route.params.description,
    comTab:comTab,
    lstFokontany :dataFokontany,
    mode : mode,
    setSaisieMPV:setSaisieMPV
  }
  let passServeur ={
    activity : 'MPV',
    valeurID : valeurID,
    setExporter: setExporter
  }


  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des MPV '+route.params.description}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieMPV} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieMPV(false)} 
            />
            <MPVForm passMPV={{dataPass,add:addMPV, update:updateMPV}}/>
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

      <FlatList data={MPV} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {
          item['titre']= 'MPV '+route.params.description
          item['typa'] = route.params.typa
          navigation.navigate('Membres MPV', item)}}>
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
              <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
             </Pressable>

             <Text style={styles.box}>{ item.nom}</Text>
            {route.params.description === 'Cuma'
              ?<Pressable style={styles.box}
                          onPress={() => {
                              navigation.navigate('Dotation MPV', item)}} >
                  <Text style={styles.text}>Dotation</Text>
                </Pressable>
              :null
            }
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingMPV = [...MPV].filter(nom => nom.id !== item.id);
                                      setMPV(existingMPV);
                                  }
                                }
                        style={styles.box}> 
               <Text style={{color:'green', fontWeight: 'bold'}}>transférer</Text>  
            </Pressable>                             
          
            <Pressable onPress={() => showAlert(item.id)}
                       style={styles.box} >
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