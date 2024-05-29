import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable ,Dimensions} from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import COGEForm from './COGEForm';
import * as SQLite from 'expo-sqlite';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia



export default function COGE({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieCOGE, setSaisieCOGE] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'COGE'
  const [valeurID, setValeurID] = useState(0);

  const [COGE, setCOGE] = useState([]);
  const [mode, setMode] = useState('Ajouter');
  let currentCOGE = undefined

  const [dataFokontany, setDataFokontany] = useState([])
  const [initialValue,setInitialValue] = useState({ ncommune:'',                                                    fokontany:'',
                                                    date_creation:'', 
                                                    nom_president:'' ,
                                                    nom_leader:'',
                                                    contact:'',
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
  // tx.executeSql("DROP TABLE  coge",
      tx.executeSql("CREATE TABLE IF NOT EXISTS coge"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, fokontany TEXT,ncommune INTEGER,"+
        "date_creation DATE, nom_president TEXT, sexe_president TEXT,"+
        "nom_leader TEXT,contact INTEGER,num_recepisse_commune INTEGER,date_recepisse_district DATE,num_recepisse_district INTEGER)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
    )
  });
 
  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM coge ",
      null,
      (txObj, resultSet) => setCOGE(resultSet.rows._array),
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
    setInitialValue({ ncommune:'',
                      fokontany:'',
                      date_creation:'', 
                      nom_president:'' ,
                      nom_leader:'',
                      contact:'',
                      num_recepisse_commune :'',
                      date_recepisse_district:'',
                      num_recepisse_district:''
                    })}
  else{
    setMode('Modifier')
    const nv = [...COGE].filter(coge => coge.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieCOGE(true)
}  

const addCOGE = (nouveau) => {
    let insertInto = "INSERT INTO coge(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom_president'){
        values = values +"?"+","
        currentCOGE = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentCOGE],
        (txObj, resultSet) => {
          let existingCOGE = [...COGE];
          nouveau['id'] = resultSet.insertId
          existingCOGE.push(nouveau);
          setCOGE(existingCOGE);
          currentCOGE=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateCOGE = (donnee) => {
    let update = "UPDATE coge SET ";  
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
          let existingCOGE = [...COGE];
          const indexToUpdate = existingCOGE.findIndex(coge => coge.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingCOGE[indexToUpdate] = donnee;
          setCOGE(existingCOGE);
          setSaisieCOGE(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }

  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM coge WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingCOGE = [...COGE].filter(nom => nom.id !== id);
            setCOGE(existingCOGE);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  const dataPass ={
    lstFokontany:dataFokontany,
    comTab:comTab,
    initValue:initialValue,
    mode : mode,
    setSaisieCOGE:setSaisieCOGE
  }
  let passServeur ={
    activity : 'COGE',
    valeurID : valeurID,
    setExporter: setExporter
  }


  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des COGEPEC '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieCOGE} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieCOGE(false)} 
            />
            <COGEForm passCOGE={{dataPass,add:addCOGE, update:updateCOGE}}/>
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
        onPress={() => showMasque(0)}      />

      <FlatList data={COGE} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Membre COGE', item)}>
          <View style={styles.container}>
            <Pressable  style={styles.box}
                        onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.nom_president}</Text>
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingCOGE = [...COGE].filter(nom => nom.id !== item.id);
                                      setCOGE(existingCOGE);
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