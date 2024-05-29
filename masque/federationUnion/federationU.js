import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import FederationUForm from './federationUForm';
import * as SQLite from 'expo-sqlite';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia



export default function FederationU({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieFederationU, setSaisieFederationU] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'FederationU'
  const [valeurID, setValeurID] = useState(0);
  const [FederationU, setFederationU] = useState([]);
  const [mode, setMode] = useState('Ajouter')
  let currentFederationU = undefined
  const [dataFokontany, setDataFokontany] = useState([])
  
   const [initialValue,setInitialValue] = useState({ ncommune:'',
                                                    fokontany:'',
                                                    date_creation:'', 
                                                    nom_perimetre:'',
                                                    nom_federation_union:'',
                                                    num_recepisse_commune :'',
                                                    date_recepisse_district:'',
                                                    num_recepisse_district:''
  })

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

     db.transaction((tx) => {
  //  tx.executeSql("DROP TABLE  federation_union",
      tx.executeSql("CREATE TABLE IF NOT EXISTS federation_union"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, f_ou_u TEXT, ncommune INTEGER,fokontany TEXT,"+
        "date_creation TEXT, nom_perimetre TEXT, nom_federation_union TEXT,num_recepisse_commune INTEGER,date_recepisse_district DATE,num_recepisse_district INTEGER)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
    )
  });
 
  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM federation_union ",
      null,
      (txObj, resultSet) => setFederationU(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM pa_fokontany ",null,
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
      date_creation:'', 
      nom_perimetre:'',
      nom_federation_union:'',
      num_recepisse_commune :'',
      date_recepisse_district:'',
      num_recepisse_district:''
    })
  }
  else{
    setMode('Modifier')
    const nv = [...FederationU].filter(FederationU => FederationU.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieFederationU(true)
}  

const addFederationU = (nouveau) => {
    let insertInto = "INSERT INTO federation_union(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom_federation_union'){
        values = values +"?"+","
        currentFederationU = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentFederationU],
        (txObj, resultSet) => {
          let existingFederationU = [...FederationU];
          nouveau['id'] = resultSet.insertId
          existingFederationU.push(nouveau);
          setFederationU(existingFederationU);
          currentFederationU=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateFederationU = (donnee) => {
    let update = "UPDATE federation_union SET ";  
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
          let existingFederationU = [...FederationU];
          const indexToUpdate = existingFederationU.findIndex(FederationU => FederationU.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingFederationU[indexToUpdate] = donnee;
          setFederationU(existingFederationU);
          setSaisieFederationU(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }

  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM FederationU WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingFederationU = [...FederationU].filter(nom => nom.id !== id);
            setFederationU(existingFederationU);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  const dataPass ={
    lstFokontany :dataFokontany,
    initValue:initialValue,
    comTab:comTab,
    mode : mode,
    setSaisieFederationU:setSaisieFederationU
  }
  let passServeur ={
    activity : 'FederationU',
    valeurID : valeurID,
    setExporter: setExporter
  }


  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des Federation/Union '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieFederationU} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieFederationU(false)} 
            />
            <FederationUForm passFederationU={{dataPass,add:addFederationU,update:updateFederationU}}/>
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

      <FlatList data={FederationU} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Membre Federation/Union', item)}>
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.nom_federation_union}</Text>
            <Pressable style={styles.box}
                        onPress={() => {item['titre'] = 'FederationU '
                        navigation.navigate('Dotation Federation', item)}} >
              <Text style={styles.text}>Dotation</Text>
            </Pressable>
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingFederationU = [...FederationU].filter(nom => nom.id !== item.id);
                                      setFederationU(existingFederationU);
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
    width: Dimensions.get("window").width / 5-15,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius: 8,
  },
 text:{
  color:'#00FF00',
  // '#808000',
  fontWeight: 'bold'

 }

 
});