import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import RbmComForm from './rbmComForm';
import * as SQLite from 'expo-sqlite';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia

export default function RbmCom({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieRbmCom, setSaisieRbmCom] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'RBMCOM'
  const [valeurID, setValeurID] = useState(0);

  const [RbmCom, setRbmCom] = useState([]);
  const [mode, setMode] = useState('Ajouter');

  let currentRbmCom = undefined
  const [dataRegion, setDataRegion] = useState([])
  const [dataDistrict, setDataDistrict] = useState([])
  const [dataCommune, setDataCommune] = useState([])
  const [dataFokontany, setDataFokontany] = useState([]);
 
  const [initialValue,setInitialValue] = useState({ 
                                                    // nregion: '', 
                                                    // ndistrict: '', 
                                                    ncommune: '',
                                                    fokontany: '',
                                                    village:'', 
                                                    date_mis_terre: '', 
                                                    latitude: '' ,
                                                    longitude: '' ,
                                                    beneficiaire: '' ,
                                                    date_suivie_reb: '' ,
                                                  })

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

    db.transaction((tx) => {
      //  tx.executeSql("DROP TABLE  rbm_com",
          tx.executeSql("CREATE TABLE IF NOT EXISTS rbm_com"+
            "(id INTEGER PRIMARY KEY AUTOINCREMENT,nregion TEXT,"+
             "ndistrict TEXT,ncommune TEXT,fokontany TEXT,village TEXT,date_mis_terre DATE,"+
             "latitude INTEGER,longitude INTEGER,beneficiaire TEXT, date_suivie_reb DATE)",
              null,
         ()=>console.log('OK'),
      (error)=>console.log('erreur')
    )
  });

  db.transaction(tx => {
    tx.executeSql('SELECT * FROM pa_fokontany', null,
      (txObj, resultSet) => setDataFokontany(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
    db.transaction(tx => {
      tx.executeSql("SELECT commune_tablette.*, nom AS commune FROM commune_tablette "+
      "JOIN pa_commune ON ncommune = code",
        null,
        (txObj, resultSet) => setComTab(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });
  
  });



},[]);
  
const showMasque = (id) =>{
  if (id===0){
    setMode('Ajouter')
    setInitialValue({ 
                      // nregion: '', 
                      // ndistrict: '', 
                      ncommune:'',
                      fokontany: '', 
                      village:'',
                      date_mis_terre: '', 
                      latitude: '' ,
                      longitude: '' ,
                      beneficiaire: '' ,
                      date_suivie_reb: '' ,
                    })}
  else{
    setMode('Modifier')
    const nv = [...RbmCom].filter(RbmCom => RbmCom.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieRbmCom(true)
}  

const addRbmCom = (nouveau) => {
    let insertInto = "INSERT INTO rbm_com(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='beneficiaire'){
        values = values +"?"+","
        currentRbmCom = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentRbmCom],
        (txObj, resultSet) => {
          let existingRbmCom = [...RbmCom];
          nouveau['id'] = resultSet.insertId
          existingRbmCom.push(nouveau);
          setRbmCom(existingRbmCom);
          currentRbmCom=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateRbmCom = (donnee) => {
    let update = "UPDATE rbm_com SET ";  
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
          let existingRbmCom = [...RbmCom];
          const indexToUpdate = existingRbmCom.findIndex(RbmCom => RbmCom.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingRbmCom[indexToUpdate] = donnee;
          setRbmCom(existingRbmCom);
          setSaisieRbmCom(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }
  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM rbm_com WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingRbmCom = [...RbmCom].filter(nom => nom.id !== id);
            setRbmCom(existingRbmCom);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };
  
  const dataPass ={
    lstRegion :dataRegion,
    lstDistrict :dataDistrict,
    lstFokontany :dataFokontany,
    comTab:comTab,
    lstCommune :dataCommune,
    initValue:initialValue,
    mode: mode
  
  }
  let passServeur ={
    activity : 'RBMCOM',
    valeurID : valeurID,
    setExporter: setExporter,
    setSaisieRbmCom:setSaisieRbmCom
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
          { 'Liste des RbmCom '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieRbmCom} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieRbmCom(false)} 
            />
            <RbmComForm passRbmCom={{dataPass,add:addRbmCom, update:updateRbmCom}}/>
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

      <FlatList data={RbmCom} renderItem={({ item }) => (
        <TouchableOpacity >
          <View style={styles.row}>
            <Pressable  style={styles.box}
                        onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.beneficiaire}</Text>
            <Pressable style={styles.box}
                         onPress={() => { navigation.navigate("RBMCom Dotation", item)}}
                          >
            <Text style={styles.text}>Dotation</Text>
            </Pressable> 
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingRbmCom = [...RbmCom].filter(nom => nom.id !== item.id);
                                      setRbmCom(existingRbmCom);
                                  }
                                }
                        style={styles.box}> 
               <Text style={{color:'green', fontWeight: 'bold'}}>transférer</Text>  
            </Pressable>                             
          
            
            <Pressable style={styles.box}
                       onPress={() => showAlert(item.id)}
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