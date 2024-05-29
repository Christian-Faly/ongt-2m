import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import AUPForm from './AUPForm';
import * as SQLite from 'expo-sqlite';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia

export default function AUP({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieAUP, setSaisieAUP] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'AUP'
  const [valeurID, setValeurID] = useState(0);

  const [AUP, setAUP] = useState([]);
  const [mode, setMode] = useState('Ajouter')

  let currentAUP = undefined
  const [dataCommune, setDataCommune] = useState([])
  const [dataFokontany, setDataFokontany] = useState([])
  const [initialValue,setInitialValue] = useState({ nom_aup:'',
                                                    date_creation:'',
                                                    ncommune:'', 
                                                    fokontany:'',
                                                    type_organisation:'',
                                                    num_recepisse_commune :'',
                                                    date_recepisse_commune:'',
                                                    num_recepisse_district:'',
                                                    date_recepisse_district:'',
                                                    })

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

     db.transaction((tx) => {
  //  tx.executeSql("DROP TABLE  aup",
      tx.executeSql("CREATE TABLE IF NOT EXISTS aup"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT,ncommune INTEGER,fokontany TEXT, nom_aup TEXT,"+
        "date_creation TEXT, type_organisation TEXT,num_recepisse_commune TEXT, date_recepisse_commune DATE,"+
        "num_recepisse_district TEXT, date_recepisse_district DATE)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
    )
  });
 
  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM aup ",
      null,
      (txObj, resultSet) => setAUP(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM pa_commune', null,
      (txObj, resultSet) => setDataCommune(resultSet.rows._array),
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
    setInitialValue({  nom_aup:'',
                        date_creation:'',
                        ncommune:'', 
                        fokontany:'',
                        type_organisation:'',
                        num_recepisse_commune :'',
                        date_recepisse_commune:'',
                        num_recepisse_district:'',
                        date_recepisse_district:'',
    })
  }else{
    setMode('Modifier')
    const nv = [...AUP].filter(aup => aup.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieAUP(true)
}  

const addAUP = (nouveau) => {
    let insertInto = "INSERT INTO aup(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom_aup'){
        values = values +"?"+","
        currentAUP = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentAUP],
        (txObj, resultSet) => {
          let existingAUP = [...AUP];
          nouveau['id'] = resultSet.insertId
          existingAUP.push(nouveau);
          setAUP(existingAUP);
          currentAUP=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateAUP = (donnee) => {
    let update = "UPDATE aup SET ";  
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
          let existingAUP = [...AUP];
          const indexToUpdate = existingAUP.findIndex(aup => aup.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingAUP[indexToUpdate] = donnee;
          setAUP(existingAUP);
          setSaisieAUP(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }
  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM aup WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingAUP = [...AUP].filter(nom => nom.id !== id);
            setAUP(existingAUP);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  const dataPass ={
    lstdataCommune:dataCommune,
    lstFokontany:dataFokontany,
    initValue:initialValue,
    comTab:comTab,
    mode : mode,
    setSaisieAUP:setSaisieAUP
  }
  let passServeur ={
    activity : 'AUP',
    valeurID : valeurID,
    setExporter: setExporter
  }


  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des AUP '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieAUP} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieAUP(false)} 
            />
            <AUPForm passAUP={{dataPass,add:addAUP, update:updateAUP}}/>
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

      <FlatList data={AUP} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Membre AUP', item)}>
          <View style={styles.row}>
            <Pressable  style={styles.box}
                        onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.nom_aup}</Text>
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'AUP '
                        navigation.navigate('Dotation AUP', item)}} >
              <Text style={styles.text}>Dotation</Text>
            </Pressable>
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingAUP = [...AUP].filter(nom => nom.id !== item.id);
                                      setAUP(existingAUP);
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
    width: Dimensions.get("window").width / 5-15,
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