import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable ,Dimensions} from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import CEPForm from './CEPForm';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import ConnexionServer from '../ConnexionServer';
// import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia

export default function CEP({ route, navigation }) {
  const [isConnected, setIsConnected] = useState(false)
  const [comTab, setComTab] = useState([]);
  const [saisieCEP, setSaisieCEP] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'CEP'
  const [valeurID, setValeurID] = useState(0);
  const [CEP, setCEP] = useState([])
  let currentCEP = undefined
  const [dataFokontany, setDataFokontany] = useState([]);
  const [mode, setMode] = useState('Ajouter');
  
  const [initialValue,setInitialValue] = useState({ ref: '', 
                                                    ncommune: '',
                                                    fokontany:'',
                                                    typologie_sol: '',
                                                    nom_perimetre: '',
                                                    nom: '',
                                                    speculation_special: route.params.description,//navigation.getParam('description'),
                                                    date_mep: '', 
                                                    campagne: '', 
                                                    surface: '', 
                                                    rendement: '' ,
                                                    chef_menage:''
                                                  })

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

     db.transaction((tx) => {
      // tx.executeSql("DROP TABLE  cep",
      tx.executeSql("CREATE TABLE IF NOT EXISTS cep"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT,"+
          "ref TEXT, ncommune TEXT, fokontany TEXT, village TEXT, typologie_sol TEXT, "+
          "nom_perimetre TEXT, nom TEXT, variete TEXT, type_speculation TEXT, speculation_special TEXT, "+
          "speculation_scv TEXT, date_mep DATE, campagne TEXT, surface REAL,"+
           "rendement REAL,chef_menage TEXT)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
    )
  });

  db.transaction(tx => {
    tx.executeSql("SELECT * FROM pa_fokontany ",null,
      (txObj, resultSet) => setDataFokontany(resultSet.rows._array),
      (txObj, error) => console.log(error)
    );
  });

  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM cep WHERE speculation_special ='"+route.params.description+"'",
      null,
      (txObj, resultSet) => setCEP(resultSet.rows._array),
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
                      // ncommune: '',
                      ncommune: '',
                      fokontany:'',
                      typologie_sol: '',
                      nom_perimetre: '',
                      nom: '',
                      speculation_special: route.params.description,//navigation.getParam('description'),
                      date_mep: '', 
                      campagne: '', 
                      surface: '', 
                      rendement: '' ,
                      chef_menage:''
                    })}
  else{
    setMode('Modifier')
    const nv = [...CEP].filter(cep => cep.id == id)[0]
    // console.log(nv)
    setInitialValue (nv);
  }
  setSaisieCEP(true)
}  

const addCEP = (nouveau) => {
    let insertInto = "INSERT INTO cep(";
    let values = " VALUES(";
    let tabvalues = [];
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom'){
        values = values +"?"+","
        currentCEP = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentCEP],
        (txObj, resultSet) => {
          let existingCEP = [...CEP];
          nouveau['id'] = resultSet.insertId
          existingCEP.push(nouveau);
          setCEP(existingCEP);
          currentCEP=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateCEP = (donnee) => {
    let update = "UPDATE cep SET ";  
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
          let existingCEP = [...CEP];
          const indexToUpdate = existingCEP.findIndex(cep => cep.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingCEP[indexToUpdate] = donnee;
          setCEP(existingCEP);
          setSaisieCEP(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }

  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM cep WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingCEP = [...CEP].filter(nom => nom.id !== id);
            setCEP(existingCEP);
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
    lstFokontany :dataFokontany,
    initValue:initialValue,
    typeCEP :route.params.description,
    comTab: comTab,
    mode : mode,
    setSaisieCEP:setSaisieCEP
  }
  //console.log(lstCommune)

  let passServeur ={
    activity : 'CEP',
    valeurID : valeurID,
    idExport : 0,
    setExporter: setExporter
  }

  function testConnexion(){
    const test = async () => {
      const response = await fetch("http://localhost:5000/affiche/ad2m/pa_region",{
        method : 'GET',
        headers : {'Content-Type' : "application/json"},
      }); 
      return await response.json();
    }
    const statut = test()
    statut.then(function(result) {
       setIsConnected(true)
    }, function(err) {
      setIsConnected(false)
    });
  }
  return (
    <View style={globalStyles.container}>
      <Card style={globalStyles.Card}>
        <Text style={globalStyles.titleText}>
          { 'Liste des CEP '+route.params.description}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieCEP} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieCEP(false)}
            />
            <CEPForm passCEP = {{dataPass, add:addCEP, update:updateCEP}}/>
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

      <FlatList data={CEP} renderItem={({ item }) => ( 
        <TouchableOpacity 
          onPress={() => {
            item['titre']= 'CEP '+route.params.description
            item['typa'] = route.params.typa
            navigation.navigate('Membres CEP', item)
          }}>
          <View style={styles.container}>
             <Pressable onPress={() => {showMasque(item.id)}}
                        style={styles.box} >
              <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
             </Pressable>

             <Text style={styles.box}>{item.nom}</Text>
             
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'CEP '+route.params.description
                            item['typa'] = route.params.typa
                            navigation.navigate('Dotation CEP', item)}} >
              <Text style={styles.text}>Dotation</Text>
            </Pressable>

            <Pressable onPress={() => showAlert(item.id)}
                       style={styles.box}>
              <Text style={{color:'#FF0000', fontWeight: 'bold'}}>Supprimer</Text> 
            </Pressable>                            
            <Pressable onPress={() =>{
                                      passServeur.idExport = item.id
                                      setValeurID(item.id)
                                      setExporter(true)
                                      testConnexion()
                                      if (isConnected===true){
                                        let existingCEP = [...CEP].filter(nom => nom.id !== item.id);
                                        setCEP(existingCEP);
                                      }
                                  }
                                }
                        style={styles.box}> 
               <Text style={{color:'green', fontWeight: 'bold'}}>transférer</Text>  
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