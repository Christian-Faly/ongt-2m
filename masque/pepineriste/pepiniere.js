import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import PepiniereForm from './pepiniereForm';
import * as SQLite from 'expo-sqlite';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia

// AUE = pepiniere

export default function Pepiniere({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisiePepiniere, setSaisiePepiniere] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'Pepiniere'
  const [valeurID, setValeurID] = useState(0);
  const [pepiniere, setPepiniere] = useState([]);
  const [mode, setMode] = useState('Ajouter')
  let currentPepiniere = undefined
  const [dataFokontany, setDataFokontany] = useState([])
  const [initialValue,setInitialValue] = useState({ ncommune:'',
                                                    fokontany:'',
                                                    site:'', 
                                                    coo_x:'' ,
                                                    coo_y:'',
                                                    nom_pepineriste:'',
                                                    sexe:'',
                                                    debut_activite:''
  })
  //id , ncommune, fokontany, site TEXT, coo_x TEXT, coo_y TEXT, nom_pepineriste TEXT, sexe TEXT, date
    

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{
    
     db.transaction((tx) => {
  //  tx.executeSql("DROP TABLE  pepiniere",
      tx.executeSql("CREATE TABLE IF NOT EXISTS pepiniere"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, ncommune INTEGER, fokontany TEXT,"+
        "site TEXT, coo_x TEXT, coo_y TEXT, nom_pepineriste TEXT, sexe TEXT, debut_activite DATE)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
    )
  });
 
  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM pepiniere ",
      null,
      (txObj, resultSet) => setPepiniere(resultSet.rows._array),
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
    setInitialValue({ ncommune:'',
                      fokontany:'',
                      site:'', 
                      coo_x:'' ,
                      coo_y:'',
                      nom_pepineriste:'',
                      sexe:'',
                      debut_activite:''
    })
  }
  else{
    setMode('Modifier')
    const nv = [...pepiniere].filter(pepi => pepi.id == id)[0]
    setInitialValue (nv);
  }
  setSaisiePepiniere(true)
}  

const addPepiniere = (nouveau) => {
    let insertInto = "INSERT INTO pepiniere(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom_pepineriste'){
        values = values +"?"+","
        currentPepiniere = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentPepiniere],
        (txObj, resultSet) => {
          let existingPepiniere = [...pepiniere];
          nouveau['id'] = resultSet.insertId
          existingPepiniere.push(nouveau);
          setPepiniere(existingPepiniere);
          currentPepiniere=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updatePepiniere = (donnee) => {
    let update = "UPDATE pepiniere SET ";  
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
          let existingPepiniere = [...pepiniere];
          const indexToUpdate = existingPepiniere.findIndex(pepi => pepi.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingPepiniere[indexToUpdate] = donnee;
          setPepiniere(existingPepiniere);
          setSaisiePepiniere(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }

  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM pepiniere WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingPepiniere = [...pepiniere].filter(pepi => pepi.id !== id);
            setPepiniere(existingPepiniere);
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
    setSaisie : setSaisiePepiniere,
    mode : mode
  }
  let passServeur ={
    activity : 'Pepinière',
    valeurID : valeurID,
    setExporter: setExporter
  }
  // console.log(pepiniere)


  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des pépinière '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisiePepiniere} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisiePepiniere(false)} 
            />
            <PepiniereForm pass={{dataPass,add:addPepiniere,update:updatePepiniere}}/>
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

      <FlatList data={pepiniere} renderItem={({ item }) => (
         <TouchableOpacity> 
          {/* onPress={() => navigation.navigate('Pépinière', item)}> */}
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.nom_pepineriste}</Text>
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'Pépinière '
                        navigation.navigate('Exploitation PP', item)}} >
              <Text style={styles.text}>Exploitation</Text>
            </Pressable>
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'Pépinière '
                        navigation.navigate('Vente PP', item)}} >
              <Text style={styles.text}>Vente</Text>
            </Pressable>
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'Pépinière '
                        navigation.navigate('Appuis PP', item)}} >
              <Text style={styles.text}>Appuis</Text>
            </Pressable>
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingPepiniere = [...pepiniere].filter(pepi => pepi.id !== item.id);
                                      setPepiniere(existingPepiniere);
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
    width: Dimensions.get("window").width / 6.8-15,
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