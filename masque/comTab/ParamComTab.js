import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Pressable,StyleSheet,Dimensions,Modal, FlatList,TouchableOpacity,
  TouchableWithoutFeedback,Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global';
import * as SQLite from 'expo-sqlite';
import ComTabForm from './ParamComTabForm';
import { MaterialIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';

export default function ParamaComTab({navigation}) {
  const [saisieComTab, setSaisieComTab] = useState(false);
  const [dataCommune, setDataCommune] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataRegion, setDataRegion] = useState([]);
  const [comTab, setComTab] = useState([]);
  const [mode, setMode] = useState('Ajouter');
  let currentComTab = undefined
  
  const [initialValue,setInitialValue] = useState({
    ncommune: 0,
    nDistrict: 0,
    nregion: 0,
  })

  const db = SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur database')
  )
  
  useEffect(()=>{
    db.transaction((tx) => {
      // tx.executeSql("DROP TABLE commune_tablette",
      let sql = "CREATE TABLE IF NOT EXISTS commune_tablette (id INTEGER PRIMARY KEY AUTOINCREMENT, nregion integer, ndistrict integer, ncommune integer);"
      tx.executeSql(sql, 
        null,
        ()=>
        {console.log('OK Create commune_tablette')
        // db.transaction(tx => {
        //   let sql ="INSERT INTO commune_tablette(id,nregion, ndistrict, ncommune) VALUES(1,0,0,0)"
        //   tx.executeSql(sql,
        //     null,
        //     ()=>console.log('OK INSERT commune_tablette'),
        //     (error)=>console.log(10,'erreur insert tabcom')
        //   )
        // });

        },
        (error)=>console.log('erreur create table commune_tablette',error)
      )
    });

    db.transaction(tx => {
      tx.executeSql("SELECT *, nom AS commune FROM commune_tablette JOIN pa_commune ON ncommune = code ",
        null,
        (txObj, resultSet) => setComTab(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pa_region', null,
        (txObj, resultSet) => setDataRegion(resultSet.rows._array),
        (txObj, error) => console.log(3,error)
      );
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pa_district', null,
        (txObj, resultSet) => setDataDistrict(resultSet.rows._array),
        (txObj, error) => console.log(4,error)
      );
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM pa_commune', null,
        (txObj, resultSet) => setDataCommune(resultSet.rows._array),
        (txObj, error) => console.log(5,error)
      );
    });
    console.log('length',comTab.length)
    // if (comTab.length ===0)
    //   db.transaction((tx) => {
    //       let sql ="INSERT INTO commune_tablette(id,nregion, ndistrict, ncommune) VALUES(1,0,0,0)"
    //       // console.log(sql)
    //       tx.executeSql(sql,
    //         null,
    //         ()=>console.log('OK Create FLAG'),
    //         (error)=>console.log(10,'erreur insert tabcom')
    //       )
    // });
  },[]);
  
  const addComTab = (nouveau) => {
    let insertInto = "INSERT INTO commune_tablette(";
    let values = " VALUES(";
    let tabvalues = [];
    let nom_commune = ""
    Object.keys(nouveau).forEach(key => {
      if (key !=='commune')
        insertInto = insertInto+key+','

        if (key ==='commune'){
        nom_commune = nouveau[key]
      }
      else if (key ==='ncommune'){
          values = values +"?"+","
        currentComTab = nouveau[key]
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
    console.log(insertInto + values)
    db.transaction(tx => {
      tx.executeSql(insertInto + values, [currentComTab],
        (txObj, resultSet) => {
          let existingComTab = [...comTab];
          nouveau['id'] = resultSet.insertId
          nouveau['commune'] = nom_commune
          existingComTab.push(nouveau);
          setComTab(existingComTab);
          currentComTab=undefined;
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateComTab = (donnee) => {
    console.log("donnee",donnee)
    let update = "UPDATE commune_tablette SET "+
      "nregion = "+donnee["nregion"]+", ndistrict = "+donnee["ndistrict"]+", ncommune = "+donnee["ncommune"];  
      db.transaction(tx => {
        tx.executeSql(update,()=> {},
          (txObj, resultSet) => {
            console.log('resultSet',resultSet)
            setSaisieComTab(false)
          },
          (txObj, error) => 
            console.log('update',error)
          );
    });
  }

  const deleteComTab = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM commune_tablette WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingComTab = [...comTab].filter(com => com.id !== id);
            setComTab(existingComTab);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const showMasque = (id) =>{
    if (id===0){
      setMode('Ajouter')
      setInitialValue({ nregion:'',
                        ndistrict:'',
                        ncommune:''
                      })}
    else{
      setMode('Modifier')
      const nv = [...comTab].filter(com => com.id == id)[0]
      console.log(nv)
      setInitialValue (nv);
    }
    setSaisieComTab(true)
  }  

  const dataPass ={
    lstCommune : dataCommune,
    lstDistrict : dataDistrict,
    lstRegion : dataRegion,
    initValue : initialValue,
    setSaisie : setSaisieComTab,
    mode : mode
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
        onPress: () => deleteComTab(id),
        // style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
  return (
  <View style={globalStyles.container}>
      <Entypo
        name='add-to-list' 
        size={40} 
        color ="blue"
        style={styles.modalToggle}
        onPress={() => showMasque(0)} 
      />

      <FlatList data={comTab} renderItem={({ item }) => ( 
        <TouchableOpacity >
          <View style={styles.container}>
    
          {/* <Pressable onPress={() => {showMasque()}}
                        style={styles.box} >
              <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
          </Pressable> */}
         
             <Text style={styles.box}>{item.commune}</Text>
             
            <Pressable onPress={() => showAlert(item.id)}
                       style={styles.box}>
              <Text style={{color:'#FF0000', fontWeight: 'bold'}}>Supprimer</Text> 
            </Pressable>                            
                                         
          </View> 
        </TouchableOpacity>
      )} />


      <Modal visible={saisieComTab} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
    
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieComTab(false)}
            />
    
    
            <ComTabForm pass = {{dataPass,add:addComTab, update:updateComTab}}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    width: Dimensions.get("window").width / 2.2-2,
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