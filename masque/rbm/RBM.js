import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions,Alert } from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import * as SQLite from 'expo-sqlite';
import RBMForm from './RBMForm';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia

export default function RBM({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieRBM, setSaisieRBM] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'RBM'
  const [valeurID, setValeurID] = useState(0);

  const [RBM, setRBM] = useState([]);
  const [mode, setMode] = useState('Ajouter')
  let currentRBM = undefined

  const [dataFokontany, setDataFokontany] = useState([]);
  const [dataCommune, setDataCommune] = useState([]);
 
  const [initialValue,setInitialValue] = useState({ ref: '',
                                                    h_f :'',
                                                    ncommune: '',
                                                    fokontany:'',
                                                    village:'',
                                                    date_mep: '', 
                                                    pepineriste: '',
                                                  })

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

    db.transaction((tx) => {
      // tx.executeSql("DROP TABLE  rbm",
        tx.executeSql("CREATE TABLE IF NOT EXISTS rbm"+
          "(id INTEGER PRIMARY KEY AUTOINCREMENT, h_f  TEXT,ref TEXT,ncommune TEXT, fokontany TEXT ,village TEXT,date_mep DATE, pepineriste TEXT)",
            null,
       ()=>console.log('OK'),
    (error)=>console.log('erreur')
  )
});
  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM rbm ",null,
      (txObj, resultSet) => setRBM(resultSet.rows._array),
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
    tx.executeSql("SELECT * FROM pa_commune ",null,
      (txObj, resultSet) => setDataCommune(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM pa_fokontany ",null,
      (txObj, resultSet) => setDataFokontany(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
},[]);
  
const showMasque = (id) =>{
  if (id===0){
    setMode('Ajouter')
    setInitialValue({ ref: '', 
                      h_f :'',
                      ncommune:'',
                      fokontany:'',
                      village:'',
                      date_mep: '', 
                      pepineriste: '', 
                    })}
  else{
    setMode('Modifier')
    const nv = [...RBM].filter(rbm => rbm.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieRBM(true)
}  

const addRBM = (nouveau) => {
    let insertInto = "INSERT INTO rbm(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='pepineriste'){
        values = values +"?"+","
        currentRBM = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentRBM],
        (txObj, resultSet) => {
          let existingRBM = [...RBM];
          nouveau['id'] = resultSet.insertId
          existingRBM.push(nouveau);
          setRBM(existingRBM);
          currentRBM=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateRBM = (donnee) => {
    let update = "UPDATE rbm SET ";  
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
          let existingRBM = [...RBM];
          const indexToUpdate = existingRBM.findIndex(rbm => rbm.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingRBM[indexToUpdate] = donnee;
          setRBM(existingRBM);
          setSaisieRBM(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }
  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM rbm WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingRBM = [...RBM].filter(nom => nom.id !== id);
            setRBM(existingRBM);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  const dataPass ={
    lstFokontany :dataFokontany,
    comTab:comTab,
    initValue:initialValue,
    mode : mode,
    setSaisieRBM:setSaisieRBM
  }
  let passServeur ={
    activity : 'RBM',
    valeurID : valeurID,
    setExporter: setExporter
  }
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


  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des RBM '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieRBM} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieRBM(false)} 
            />
            <RBMForm passRBM={{dataPass,add:addRBM, update:updateRBM}}/>
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

      <FlatList data={RBM} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Bénéficiaire RBM', item)}>
          <View style={styles.row}>
            <Pressable  style={styles.box}
                        onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.pepineriste+'-'+item.date_mep}</Text>
            {/* <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'RBM '
                        navigation.navigate('Dotation RBM', item)}} >
              <Text style={styles.text}>Dotation</Text>
            </Pressable> */}
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingRBM = [...RBM].filter(nom => nom.id !== item.id);
                                      setRBM(existingRBM);
                                  }
                                }
                        style={styles.box}> 
               <Text style={{color:'green', fontWeight: 'bold'}}>transférer</Text>  
            </Pressable>                             
            
            <Pressable style={styles.box}
                       onPress={() =>
                       showAlert(item.id)}
                        >
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