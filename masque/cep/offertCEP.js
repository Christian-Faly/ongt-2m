import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button ,Pressable,Dimensions} from 'react-native';
// import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';
import { globalStyles  } from '../../styles/global';
import { MaterialIcons,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import Card from '../../shared/card';
import OffertCEPForm from './OffertCEPForm';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

export default function OffertCEP({ route, navigation }) {
  const [saisieOffert, setSaisieOffert] = useState(false);
  const [offert, setOffert] = useState([]);
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataDesignation, setDataDesignation] = useState([]);
  const [mode, setMode] = useState('Ajouter');
  let currentOffert = undefined

  const [initialValue, setInitialValue] = useState({
    id_cep : route.params.id,
                                                    categorie : '',
                                                    designation : '',
                                                    quantite : 0
   }
  )
  
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{
    db.transaction((tx) => {
        // tx.executeSql("DROP TABLE offert_cep",
        tx.executeSql("CREATE TABLE IF NOT EXISTS offert_cep"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_cep INTEGER,"+
        "categorie TEXT,designation TEXT, unite TEXT, quantite REAL)",
            null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
    
    db.transaction(tx => {


    
      tx.executeSql('SELECT * FROM offert_cep WHERE id_cep='+ route.params.id, null,
        (txObj, resultSet) => setOffert(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    db.transaction(tx => {
      let critere =""
      if (route.params.typa ==="Agriculture")
        critere = " agriculture = 'Oui'"
      if (route.params.typa ==="Apiculture")
        critere = " apiculture = 'Oui'"
      if (route.params.typa ==="Porciculture")
        critere = " porciculture = 'Oui'"
      let sql = "SELECT typa as categorie FROM type_offert "+" WHERE "+critere+" GROUP BY typa"
      console.log(sql)
      tx.executeSql(sql, null,
        (txObj, resultSet) => setDataCategorie(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  
    db.transaction(tx => {
      tx.executeSql("SELECT typa as categorie, designation||'('||unite||')' as designation FROM type_offert", null,
        (txObj, resultSet) => setDataDesignation(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  
  
},[]);
    
const showMasque = (id) =>{
  if (id===0){
    setMode('Ajouter')
    setInitialValue({
      id_cep : route.params.id,
                     categorie : '',
                     designation : '',
                     quantite : 0
    })
  }
  else{
    setMode('Modifier')
    const nv = [...offert].filter(offert => offert.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieOffert(true)
}  

const addOffert = (nouveau) => {
    let insertInto = "INSERT INTO offert_cep(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='designation'){
        values = values +"?"+","
        currentOffert = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentOffert],
        (txObj, resultSet) => {
          let existingOffert = [...offert];
          nouveau['id'] = resultSet.insertId
          existingOffert.push(nouveau);
          setOffert(existingOffert);
          currentOffert=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateOffert = (donnee) => {
    let update = "UPDATE offert_cep SET ";  
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
      
  db.transaction(tx => {
    tx.executeSql(update,()=> {},
      (txObj, resultSet) => {
        console.log(resultSet)
        if (resultSet.rowsAffected > 0) {
          let existingOffert = [...offert];
          const indexToUpdate = existingOffert.findIndex(offert => offert.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingOffert[indexToUpdate] = donnee;
          setOffert(existingOffert);
          setSaisieOffert(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  };
  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM offert_cep WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log('mandalo2')
            let existingOffert = [...offert].filter(designation => designation.id !== id);
            setOffert(existingOffert);
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
      // nom_membre:route.params.nom_prenom,
      id_cep:route.params.id_cep,
      lstCategorie :dataCategorie,
      lstDesignation :dataDesignation,
      initValue:initialValue,
      titre :'Groupement '+route.params.nom +' - '+route.params.titre,
      mode : mode
    }
    
  return (
    <View style={globalStyles.container}>

      <Card>
        <Text style={globalStyles.titleText}>
          { 'Groupement: '+route.params.nom+' '+route.params.titre +' '+route.params.typa }
        </Text>
        <Text>{ route.params.village }</Text>
        <Text>{ route.params.sexe }</Text>
        <Text>{route.params.annee_naissance }</Text>
      </Card>

      <Modal visible={saisieOffert} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieOffert(false)} 
            />
            <OffertCEPForm passOffert={{dataPass,add:addOffert,update:updateOffert}} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Entypo 
        name='add-to-list' 
        color='blue'
        size={40} 
        style={styles.modalToggle}
        onPress={() => showMasque(0)} 
      />

      <FlatList data={offert} renderItem={({ item }) => (
          <View style={styles.container}>
            <Pressable style={styles.box} 
                      onPress={() => {showMasque(item.id)}}>
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.designation +' '+ "Quantite"+': '+item.quantite}</Text>

            <Pressable onPress={() => showAlert(item.id)}
                       style={styles.box} >
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
    width: Dimensions.get("window").width / 3.2-2,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius: 8
  }


});