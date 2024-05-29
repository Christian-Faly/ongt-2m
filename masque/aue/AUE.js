import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import AUEForm from './AUEForm';
import * as SQLite from 'expo-sqlite';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia



export default function AUE({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieAUE, setSaisieAUE] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'AUE'
  const [valeurID, setValeurID] = useState(0);
  const [AUE, setAUE] = useState([]);
  const [mode, setMode] = useState('Ajouter')
  let currentAUE = undefined
  const [dataFokontany, setDataFokontany] = useState([])
  const [initialValue,setInitialValue] = useState({ ncommune:'',
                                                    fokontany:'',
                                                    date_creation:'', 
                                                    nom_president:'' ,
                                                    nom_perimetre:'',
                                                    nom_aue:'',
                                                    nb_membre:'',
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
  //  tx.executeSql("DROP TABLE  aue",
      tx.executeSql("CREATE TABLE IF NOT EXISTS aue"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, ncommune INTEGER,fokontany TEXT,"+
        "date_creation TEXT, nom_president TEXT, sexe_president TEXT,nb_membre INTEGER,"+
        "nom_aue TEXT,nom_perimetre TEXT,num_recepisse_commune INTEGER,date_recepisse_district DATE,num_recepisse_district INTEGER)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
    )
  });
 
  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM aue ",
      null,
      (txObj, resultSet) => setAUE(resultSet.rows._array),
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
                      ncommune: '',
                      fokontany:'',
                      date_creation:'', 
                      nom_president:'' ,
                      nom_perimetre:'',
                      nom_aue:'',
                      nb_membre:'',
                      num_recepisse_commune :'',
                      date_recepisse_district:'',
                      num_recepisse_district:''
                     })
  }
  else{
    setMode('Modifier')
    const nv = [...AUE].filter(aue => aue.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieAUE(true)
}  

const addAUE = (nouveau) => {
    let insertInto = "INSERT INTO aue(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom_aue'){
        values = values +"?"+","
        currentAUE = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentAUE],
        (txObj, resultSet) => {
          let existingAUE = [...AUE];
          nouveau['id'] = resultSet.insertId
          existingAUE.push(nouveau);
          setAUE(existingAUE);
          currentAUE=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateAUE = (donnee) => {
    let update = "UPDATE aue SET ";  
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
          let existingAUE = [...AUE];
          const indexToUpdate = existingAUE.findIndex(aue => aue.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingAUE[indexToUpdate] = donnee;
          setAUE(existingAUE);
          setSaisieAUE(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }

  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM aue WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingAUE = [...AUE].filter(nom => nom.id !== id);
            setAUE(existingAUE);
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
    setSaisieAUE:setSaisieAUE
  }
  let passServeur ={
    activity : 'AUE',
    valeurID : valeurID,
    setExporter: setExporter
  }


  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des AUE '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieAUE} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieAUE(false)} 
            />
            <AUEForm passAUE={{dataPass,add:addAUE,update:updateAUE}}/>
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

      <FlatList data={AUE} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Membre AUE', item)}>
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.nom_aue}</Text>
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'AUE '
                        navigation.navigate('Dotation AUE', item)}} >
              <Text style={styles.text}>Dotation</Text>
            </Pressable>
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingAUE = [...AUE].filter(nom => nom.id !== item.id);
                                      setAUE(existingAUE);
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