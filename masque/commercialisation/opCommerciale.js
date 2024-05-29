import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button,Pressable,Dimensions } from 'react-native';
import { globalStyles , ButtonStyles} from '../../styles/global';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import OPCommercialeForm from './opCommercialeForm';
import * as SQLite from 'expo-sqlite';
import ConnexionServer from '../ConnexionServer';
// 034 12 468 62 supermen huile de cigelia

// AUE = op

export default function OPCommerciale({ route, navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieOP, setSaisieOP] = useState(false);
  const [exporter, setExporter] = useState(false);
  const activity = 'Pepiniere'
  const [valeurID, setValeurID] = useState(0);
  const [op, setOP] = useState([]);
  const [mode, setMode] = useState('Ajouter')
  let currentOP = undefined
  const [dataFokontany, setDataFokontany] = useState([])
  const [initialValue,setInitialValue] = useState({ ncommune:'',
                                                    fokontany:'',
                                                    site:'', 
                                                    coo_x:'' ,
                                                    coo_y:'',
                                                    type_op: '',
                                                    nom_op:'',
                                                    date_creation : '',
                                                    num_certificat_enr : '',
                                                    date_certificat_enr : '',
                                                    filiere : '',
                                                    capital : '',

  })
  //id , ncommune, fokontany, site TEXT, coo_x TEXT, coo_y TEXT, nom_op TEXT, sexe TEXT, date
    

  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{
    
     db.transaction((tx) => {
  //  tx.executeSql("DROP TABLE  op_commerciale",
      tx.executeSql("CREATE TABLE IF NOT EXISTS op_commerciale"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, ncommune INTEGER, fokontany TEXT,"+
        "site TEXT, coo_x TEXT, coo_y TEXT, type_op TEXT, nom_op TEXT, date_creation DATE,"+
        "num_certificat_enr TEXT,  date_certificat_enr DATE,"+
        "filiere TEXT, capital REAL)",
          null,
      ()=>console.log('OK'),
      (error)=>console.log('erreur')
      )
  });
 
  
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM op_commerciale ",
      null,
      (txObj, resultSet) => setOP(resultSet.rows._array),
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
                      type_op: '',
                      nom_op:'',
                      date_creation : '',
                      num_certificat_enr : '',
                      date_certificat_enr : '',
                      filiere : '',
                      capital : '',

})
  }
  else{
    setMode('Modifier')
    const nv = [...op].filter(pepi => pepi.id == id)[0]
    setInitialValue (nv);
  }
  setSaisieOP(true)
}  

const addOP = (nouveau) => {
    let insertInto = "INSERT INTO op_commerciale(";
    let values = " VALUES(";
    let tabvalues = [];
        
    Object.keys(nouveau).forEach(key => {
      insertInto =insertInto+key+','
      if (key ==='nom_op'){
        values = values +"?"+","
        currentOP = nouveau[key]
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
      tx.executeSql(insertInto + values, [currentOP],
        (txObj, resultSet) => {
          let existingOP = [...op];
          nouveau['id'] = resultSet.insertId
          existingOP.push(nouveau);
          setOP(existingOP);
          currentOP=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateOP = (donnee) => {
    let update = "UPDATE op_commerciale SET ";  
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
      console.log(update)
      
  db.transaction(tx => {
    tx.executeSql(update,()=> {},
      (txObj, resultSet) => {
        console.log(resultSet)
        // console.log(resultSet)
        if (resultSet.rowsAffected > 0) {
          let existingOP = [...op];
          const indexToUpdate = existingOP.findIndex(pepi => pepi.id === donnee['id']);
          console.log(donnee['id']  +' index  '+indexToUpdate)
          existingOP[indexToUpdate] = donnee;
          setOP(existingOP);
          setSaisieOP(false)
        }
        else
          console.log('ERREUR')
      }
    );
  });
  }

  const deleteNom = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM op_commerciale WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingOP = [...op].filter(pepi => pepi.id !== id);
            setOP(existingOP);
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
    setSaisie : setSaisieOP,
    mode : mode,
    setSaisieOP:setSaisieOP
  }
  let passServeur ={
    activity : 'Pepinière',
    valeurID : valeurID,
    setExporter: setExporter
  }
 


  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Liste des OP commerciale '}
          {/* navigation.getParam('description') } */}
        </Text>
      </Card>

      <Modal visible={saisieOP} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieOP(false)} 
            />
            <OPCommercialeForm pass={{dataPass,add:addOP,update:updateOP}}/>
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

      <FlatList data={op} renderItem={({ item }) => (
         <TouchableOpacity> 
          {/* onPress={() => navigation.navigate('Pépinière', item)}> */}
          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            {/* <Text style={styles.box}>{ item.nom_op}</Text> */}
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'OP '
                        navigation.navigate('Membres OP Commerciale', item)}} >
              <Text>{ item.nom_op}</Text>
            </Pressable>
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'OP '
                        navigation.navigate('Mise en relation OM', item)}} >
              <Text style={styles.text}>Relation OM</Text>
            </Pressable>
            <Pressable style={styles.box}
                        onPress={() => {item['titre']= 'OP '
                        navigation.navigate('Appuis OP Commerciale', item)}} >
              <Text style={styles.text}>Appuis</Text>
            </Pressable>
            <Pressable onPress={() =>{
                                      setValeurID(item.id)
                                      setExporter(true)
                                      let existingOP = [...op].filter(pepi => pepi.id !== item.id);
                                      setop(existingOP);
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
    width: Dimensions.get("window").width / 5.9-15,
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