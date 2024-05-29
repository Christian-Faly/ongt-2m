import React, { useState, useEffect } from 'react';
import { View, Text, Pressable,StyleSheet,Dimensions,Modal,
  TouchableWithoutFeedback,Keyboard, MaterialIcons } from 'react-native';
import { globalStyles } from '../../styles/global';
import * as SQLite from 'expo-sqlite';
import ComTabForm from './ComTabForm';

export default function ParamaComTab({navigation}) {
  const [saisieComTab, setSaisieComTab] = useState(false);

  const db = SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur database')
  )
  
  useEffect(()=>{
    
},[]);



return (
  <View style={globalStyles.container}>
    <Pressable onPress={() => {showMasque()}}
                        style={styles.box} >
              <Text style={{color:'#0000FF', fontWeight: 'bold'}}>Modifier</Text>
    </Pressable>

      <Modal visible={saisieComTab} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <ComTabForm pass = {{dataPass,update:updateComTab}}/>
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