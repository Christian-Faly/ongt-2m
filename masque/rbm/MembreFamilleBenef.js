import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, Button ,Pressable,Dimensions} from 'react-native';
// import { StyleSheet, Text, View, TextInput, Button, Platform } from 'react-native';
import { globalStyles  } from '../../styles/global';
import { MaterialIcons,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import Card from '../../shared/card';
// import OffertCEPForm from './OffertCEPForm';
import * as SQLite from 'expo-sqlite';
import { Alert } from 'react-native';
import MembreFamilleBenefForm from './MembreFamilleBenefForm';

export default function MembreFamilleBenefRBM({ route, navigation }) {
  const [saisieMembreFamille, setSaisieMembreFamille] = useState(false);
  const [membreFamille, setMembreFamille] = useState([]);
  const [valueToUpdate, setValueToUpdate] = useState({});
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataDesignation, setDataDesignation] = useState([]);
  const [mode, setMode] = useState('Ajouter');
  let currentMembreFamille = undefined

  const [initialValue, setInitialValue] = useState({id_benef : route.params.id,
                                                    lien_parente : '',
                                                    nom_prenom : '',
                                                    surnom:'',  
                                                    h_f:'',
                                                    annee_naissance : ''
                                                  })
  
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  useEffect(()=>{
    setValueToUpdate({id:route.params.id});
    db.transaction((tx) => {
        //  tx.executeSql("DROP TABLE membre_famille_cep",
        tx.executeSql("CREATE TABLE IF NOT EXISTS membre_famille_cep"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_benef INTEGER,"+
        "lien_parente TEXT,nom_prenom TEXT,surnom TEXT, h_f TEXT, annee_naissance TEXT)",
         null,
        ()=>console.log('OK'),
        (error)=>console.log('erreur')
      )
    });
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM membre_famille_cep WHERE id_benef='+ route.params.id, null,
        (txObj, resultSet) => setMembreFamille(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
    },[]);
    const showMasque = (id) =>{
      if (id===0){
        setMode('Ajouter')
        setInitialValue({ id_benef : route.params.id,
                          lien_parente : '',
                          nom_prenom : '',
                          surnom:'',  
                          h_f:'',
                          annee_naissance : ''
                        })}
      else{
        setMode('Modifier')
        const nv = [...membreFamille].filter(membreFamille => membreFamille.id == id)[0]
        setInitialValue (nv);
      }
      setSaisieMembreFamille(true)
    }  
    
    const addMembreFamille = (nouveau) => {
        let insertInto = "INSERT INTO membre_famille_cep(";
        let values = " VALUES(";
        let tabvalues = [];
            
        Object.keys(nouveau).forEach(key => {
          insertInto =insertInto+key+','
          if (key ==='nom_prenom'){
            values = values +"?"+","
            currentMembreFamille = nouveau[key]
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
          tx.executeSql(insertInto + values, [currentMembreFamille],
            (txObj, resultSet) => {
              let existingMembreFamille = [...membreFamille];
              nouveau['id'] = resultSet.insertId
              existingMembreFamille.push(nouveau);
              setMembreFamille(existingMembreFamille);
              currentMembreFamille=undefined;
            },
            (txObj, error) => console.log(error)
          );
        });
      };
    
      const updateMembreFamille = (donnee) => {
        let update = "UPDATE membre_famille_cep SET ";  
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
              let existingMembreFamille = [...membreFamille];
              const indexToUpdate = existingMembreFamille.findIndex(membreFamille => membreFamille.id === donnee['id']);
              console.log(donnee['id']  +' index  '+indexToUpdate)
              existingMembreFamille[indexToUpdate] = donnee;
              setMembreFamille(existingMembreFamille);
              setSaisieMembreFamille(false)
            }
            else
              console.log('ERREUR')
          }
        );
      });
      }
    
    const deleteNom = (id) => {
      
      db.transaction(tx => {
        tx.executeSql('DELETE FROM membre_famille_cep WHERE id = ?', [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              let existingMembreFamille = [...membreFamille].filter(nom_prenom => nom_prenom.id !== id);
              setMembreFamille(existingMembreFamille);
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
      id_benef:route.params.id_benef,
      initValue:initialValue,
      titre :'Groupement '+route.params.nom_prenom ,
      mode : mode
  
    }
    
  return (
    <View style={globalStyles.container}>

      <Card>
        <Text style={globalStyles.titleText}>
          { 'Groupement: '+route.params.nom_prenom}
        </Text>
        <Text>{ route.params.nom_prenom }</Text>
      
      </Card>

      <Modal visible={saisieMembreFamille} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setSaisieMembreFamille(false)} 
            />
            <MembreFamilleBenefForm passMembreFamille={{dataPass,add:addMembreFamille, update:updateMembreFamille}} />
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

      <FlatList data={membreFamille} renderItem={({ item }) => (
          <View style={styles.container}>
            <Pressable style={styles.box} 
                      onPress={() => {showMasque(item.id),
                                      setValueToUpdate({id:100})}}>
            <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
            </Pressable>

            <Text style={styles.box}>{ item.nom_prenom }</Text>
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