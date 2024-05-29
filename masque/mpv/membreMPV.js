import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button, Pressable,Dimensions } from 'react-native';
import { globalStyles,} from '../../styles/global';
import { MaterialIcons ,MaterialCommunityIcons,Entypo} from '@expo/vector-icons';
import Card from '../../shared/card';
import MembreMPVForm from './membreMPVForm';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';

export default function MembreMPV({ route,navigation }) {
  const [comTab, setComTab] = useState([]);
  const [saisieMembre, setSaisieMembre] = useState(false);
  const [membre, setMembre] = useState([]);
  const [dataFokontany, setDataFokontany] = useState([]);
  const [dataListBenef, setDataListBenef] = useState([]);
  
  const [mode, setMode] = useState('Ajouter');

  let currentMembre = undefined
  
  const [initialValue,setInitialValue] = useState({ nom: '',
                                                    surnom: '',
                                                    ncommune:route.params.ncommune,
                                                    id_mpv :route.params.id,
                                                    fokontany: '',
                                                    village: '',
                                                    h_f: '',
                                                    annee_naissance: '',
                                                    cin:'',type_mp :'',
                                                    code_menage:''
                                                  })
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{
    db.transaction((tx) => {
      //  tx.executeSql("DROP TABLE membre_mpv",
      tx.executeSql("CREATE TABLE IF NOT EXISTS membre_mpv"+
      "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_mpv INTEGER,ncommune INTEGER,"+
      "fokontany TEXT,village TEXT, nom TEXT, surnom TEXT, h_f TEXT, annee_naissance INTEGER, cin TEXT,"+
      "type_mp TEXT, code_menage TEXT)",
            null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM membre_mpv WHERE id_mpv='+route.params.id ,null,
        (txObj, resultSet) => setMembre(resultSet.rows._array),
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
      tx.executeSql("SELECT * FROM list_benef",
        null,
        (txObj, resultSet) => setDataListBenef(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });
  
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM commune_tablette",
        null,
        (txObj, resultSet) => setComTab(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });
  

  
    },[]);
  
    const showMasque = (id) =>{
      if (id===0){
        setMode('Ajouter')
        setInitialValue({ nom: '',
                          surnom: '',
                          ncommune:route.params.ncommune,
                          id_mpv :route.params.id,
                          fokontany: '',
                          village: '',
                          h_f: '',
                          annee_naissance: '',
                          cin:'',type_mp :'',
                          code_menage:''
                        })}
      else{
        setMode('Modifier')
        const nv = [...membre].filter(membre => membre.id == id)[0]
        setInitialValue (nv);
      }
      setSaisieMembre(true)
    }  
    
    const addMembre = (nouveau) => {
        let insertInto = "INSERT INTO membre_mpv(";
        let values = " VALUES(";
        let tabvalues = [];
            
        Object.keys(nouveau).forEach(key => {
          insertInto =insertInto+key+','
          if (key ==='nom'){
            values = values +"?"+","
            currentMembre = nouveau[key]
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
          tx.executeSql(insertInto + values, [currentMembre],
            (txObj, resultSet) => {
              let existingMembreMPV = [...membre];
              nouveau['id'] = resultSet.insertId
              existingMembreMPV.push(nouveau);
              setMembre(existingMembreMPV);
              currentMembre=undefined;
            },
            (txObj, error) => console.log(error)
          );
        });
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
        
        db.transaction(tx => {
          tx.executeSql(insertInto + values, [currentBenef],
            (txObj, resultSet) => {
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


      const updateMembre = (donnee) => {
        let update = "UPDATE membre_mpv SET ";  
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
              let existingMembreMPV = [...membre];
              const indexToUpdate = existingMembreMPV.findIndex(membre => membre.id === donnee['id']);
              console.log(donnee['id']  +' index  '+indexToUpdate)
              existingMembreMPV[indexToUpdate] = donnee;
              setMembre(existingMembreMPV);
              setSaisieMembre(false)
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
      tx.executeSql('DELETE FROM membre_mpv WHERE id = ?', [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            console.log('mandalo2')
            let existingMembreMPV = [...membre].filter(membre => membre.id !== id);
            setMembre(existingMembreMPV);
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
    id_mpv:route.params.id,
    typa:route.params.typa,
    lstFokontany :dataFokontany,
    lstListBenef :dataListBenef,
    initValue:initialValue,
    titre: 'Groupement : '+route.params.nom +' - '+route.params.titre,
    mode : mode
  }
  console.log('route.params membre',route.params.speculation_special)
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { 'Groupement : '+route.params.nom +' - '+route.params.titre}
        </Text>
        <Text>{ route.params.commune }</Text>
        <Text>{ route.params.annee }</Text>
      </Card>
  
      <Modal visible={saisieMembre} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieMembre(false)} 
            />
            <MembreMPVForm passMembre={{dataPass,add:addMembre, update:updateMembre,addBenef:addBeneficiaire}}/>
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

      <FlatList data={membre} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {
          item['titre'] ='Groupement : '+route.params.nom +' - '+route.params.titre
          item['typa'] = route.params.typa
          item['speculation_special'] = route.params.speculation_special
          navigation.navigate('Dotation Membres MPV', item)}}>


          <View style={styles.container}>
            <Pressable style={styles.box}
                       onPress={() => {showMasque(item.id)}} >
              <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>
            <Text style={styles.box}>{item.nom}</Text>
            {/* <Pressable style={styles.box}
                        onPress={() => {
                        navigation.navigate('Membre famille beneficiaire MPV', item)}} >
            <Text style={{color:'#29B960', fontWeight: 'bold'}} >Lien de parenté</Text>
            </Pressable> */}
        
            <Pressable style={styles.box}
                       onPress={() => showAlert(item.id)} >
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
    borderRadius: 8
  }

});