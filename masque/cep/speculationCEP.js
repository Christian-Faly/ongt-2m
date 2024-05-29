import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
    TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import { globalStyles } from '../../styles/global';
import * as SQLite from 'expo-sqlite';
import { MaterialIcons,MaterialCommunityIcons ,Entypo} from '@expo/vector-icons';

export default function SpeculationCEP({ navigation }) {
    const [dataSpeculationCEP, setDataSpeculationCEP] = useState([])

    const db = SQLite.openDatabase('ongt21.db',
        null,
        ()=>console.log('base de donnee connected'),
        (error)=>console.log('erreur')
    )
    
    useEffect(()=>{

        db.transaction(tx => {
            tx.executeSql('SELECT * FROM speculation_cep ORDER BY typa', null,
                (txObj, resultSet) => setDataSpeculationCEP(resultSet.rows._array),
                (txObj, error) => console.log(error)
            );
        });
        
    },[]);
    return (
        <View style={globalStyles.container}>
    
        {/* <Modal visible={saisieMembre} animationType='slide'>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <MaterialIcons 
                name='close'
                size={24} 
                style={{...styles.modalToggle, ...styles.modalClose}} 
                onPress={() => setSaisieMembre(false)} 
              />
              <MembreCEPForm passMembre={{id:navigation.getParam('id'),add:addMembre}}/>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
  
        <Entypo 
          name='add-to-list' 
          color='blue'
          size={40} 
          style={styles.modalToggle}
          onPress={() => setSaisieMembre(true)} 
        />
    */}
        <FlatList data={dataSpeculationCEP} renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Champs Ecole Paysan (CEP)', item)}
            
            // onPress={() => navigation.navigate('CEP', item)}
          >
            <View style={styles.row}>
              <Text style={globalStyles.Button}>{item.description }</Text>
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
    }
  });