import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button ,Dimensions,Pressable} from 'react-native';
import { globalStyles,} from '../../styles/global';
import { MaterialIcons ,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import BenefRBMForm from './benefRBMForm';

export default function BenefRBM({ route,navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieBenef, setSaisieBenef] = useState(false);
  const [dataListBenef, setDataListBenef] = useState([]);
  const [benef, setBenef] = useState([]);
  const [dataFokontany, setDataFokontany] = useState([]);
  const [mode, setMode] = useState('Ajouter');
  const [raffr, setRaffr] = useState(false);
  let currentBenef = undefined
  
  const [initialValue,setInitialValue] = useState({ nom: '',
                                                    surnom: '',
                                                    ncommune:'',
                                                    id_rbm :route.params.id,
                                                    fokontany: '',
                                                    village: '',
                                                    h_f: '',
                                                    annee_naissance: '',
                                                    cin:''
                                                  })
 
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{

    db.transaction((tx) => {
      //  tx.executeSql("DROP TABLE benef_rbm",
      tx.executeSql("CREATE TABLE IF NOT EXISTS benef_rbm"+
                  "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_rbm INTEGER,"+
                  "fokontany TEXT,ncommune INTEGER,village TEXT, nom TEXT, surnom TEXT, h_f TEXT, annee_naissance INTEGER, cin TEXT)",
        null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM benef_rbm WHERE id_rbm='+route.params.id ,null,
        (txObj, resultSet) => setBenef(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM pa_fokontany" ,null,
        (txObj, resultSet) => setDataFokontany(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM commune_tablette",
        null,
        (txObj, resultSet) => setComTab(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });
  
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM list_benef",
        null,
        (txObj, resultSet) => setDataListBenef(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });
  
  
    },[]);

    const showMasque = (id) =>{
      if (id===0){
        setMode('Ajouter')
        setInitialValue({ nom: '',
                          surnom: '',
                          ncommune:comTab[0].ncommune,
                          id_rbm :route.params.id,
                          fokontany: '',
                          village: '',
                          h_f: '',
                          annee_naissance: '',
                          cin:''
                        })}
      else{
        setMode('Modifier')
        const nv = [...benef].filter(benef => benef.id == id)[0]
        setInitialValue (nv);
      }
      setSaisieBenef(true)
    }  
    
    const addBenef = (nouveau) => {
        let insertInto = "INSERT INTO benef_rbm(";
        let values = " VALUES(";
        let tabvalues = [];
            
        Object.keys(nouveau).forEach(key => {
          insertInto = insertInto + key+','
          if (key ==='nom'){
            values = values +"?"+","
            currentBenef = nouveau[key]
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
        // console.log('insertInto rbm',insertInto + values)
        db.transaction(tx => {
           tx.executeSql(insertInto + values, [currentBenef],
            (txObj, resultSet) => {
              let existingBenef = [...benef];
              nouveau['id'] = resultSet.insertId
              existingBenef.push(nouveau);
              setBenef(existingBenef);
              currentBenef=undefined;
            },
            (txObj, error) => console.log(error)
          );
        });
        setRaffr(true)
      }; 

      const addBeneficiaire = (nouveau) => {
        let insertInto = "INSERT INTO list_benef(";
        let values = " VALUES(";
        let tabvalues = [];
            
        Object.keys(nouveau).forEach(key => {
          insertInto =insertInto+key+','
          if (key ==='nom_prenom'){
            values = values +"?"+","
            currentBenef = nouveau[key]
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

        console.log('insertInto benef',insertInto + values)
        
        db.transaction(tx => {
          tx.executeSql(insertInto + values, [currentBenef],
            (txObj, resultSet) => {
              console.log("insert list_benef OK")
              let existing = [...dataListBenef];
              nouveau['id'] = resultSet.insertId
              console.log("nouveau",nouveau)
              existing.push(nouveau);
              setDataListBenef(existing);
              currentBenef=undefined;
            },
            (txObj, error) => console.log("insert list_benef",error)
          );
        });
      };

      const updateBenef = (donnee) => {
        let update = "UPDATE benef_rbm SET ";  
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
              let existingBenef = [...benef];
              const indexToUpdate = existingBenef.findIndex(benef => benef.id === donnee['id']);
              console.log(donnee['id']  +' index  '+indexToUpdate)
              existingBenef[indexToUpdate] = donnee;
              setBenef(existingBenef);
              setSaisieBenef(false)
            }
            else
              console.log('ERREUR')
          }
        );
      });
      }
    
  const deleteNom = (id) => {
    console.log('id',id)  
    db.transaction(tx => {
      tx.executeSql('DELETE FROM benef_rbm WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log('mandalo2')
            let existingBenef = [...benef].filter(benef => benef.id !== id);
            setBenef(existingBenef);
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

  let dataPass ={
    id_rbm:route.params.id,
    lstFokontany :dataFokontany,
    lstListBenef :dataListBenef,
    initValue:initialValue,
    mode: mode
  }
  console.log("dataListBenef",dataListBenef)
  // console.log("benef",benef)
  return (
    <View style={globalStyles.container}>
      <Card style = {{borderColor:'red'}}>
        <Text style={globalStyles.titleText}>
          </Text>
      </Card>
  
      <Modal visible={saisieBenef} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieBenef(false)} 
            />
            <BenefRBMForm passBenef={{dataPass,add:addBenef, update:updateBenef,addBeneficiaire:addBeneficiaire}}/>
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
      

      <FlatList data={benef} renderItem={({ item }) => (
        <TouchableOpacity>

        <View style={styles.container}>
          <Pressable onPress={() => {showMasque(item.id)}}
                        style={styles.box} >
          <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
          </Pressable>
  
           <Pressable style={styles.box}
           onPress={() => {
            navigation.navigate('Dotation bénéficiaire RBM', item)}}
         > 
             <Text style={styles.box}>{item.nom}</Text>
          </Pressable>
    {/* <Pressable style={styles.box}
                        onPress={() => {
                        navigation.navigate('Membre famille beneficiaire RBM', item)}} >
            <Text style={{color:'#29B960', fontWeight: 'bold'}} >Lien de parenté</Text>
            </Pressable> */}
            
          <Pressable onPress={() => showAlert(item.id)}
                     style={styles.box}>
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
    width: Dimensions.get("window").width / 3.2-3,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius: 8,
  },
 text:{
  color:'#808000',
  fontWeight: 'bold'

 }
});