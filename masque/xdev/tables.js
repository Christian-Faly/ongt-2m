import React, { useState, useEffect } from 'react';
import { View, Text,FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { globalStyles } from '../../styles/global';

export default function Tables({route,navigation}) {
  const [flag, setFlag]= useState([])
  const [liste, setListe]= useState([])

  const db = SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  console.log (route.params.sqlCreate)

  useEffect(()=>{
    if (route.params.isCreate=== true)
      db.transaction((tx) => {
        // tx.executeSql("DROP TABLE fokontany",
        tx.executeSql(route.params.sqlCreate,
          null,
          ()=>console.log('OK Create'),
          (error)=>console.log(error)
        )
      });

    db.transaction(tx => {
      tx.executeSql(route.params.sqlSelect,
        null,
        (txObj, resultSet) => {
          setListe(resultSet.rows._array)
          console.log('OK Select '+ resultSet.rows._array.length)
        },
        (txObj, error) => console.log(error)
      );
    });
    
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM flag",
        null,
        (txObj, resultSet) => {
          setFlag(resultSet.rows._array)
          console.log('OK Select '+ resultSet.rows._array.length)
        },
        (txObj, error) => console.log(error)
      );
    });

    
  },[]);

  console.log('2 '+liste.length+' - '+flag.length)
  if (route.params.isInsert=== true) {
    if (liste.length===0 && flag.length>0) {
      db.transaction(tx => {
        // tx.executeSql('DELETE FROM type_offert',
        tx.executeSql(route.params.sqlInsert,
            null,
          (txObj, resultSet) => console.log('OK Insert'),
          (txObj, error) => console.log(error)
        );
      });
    }
  }

  return (
    <View style={globalStyles.container}>
      <Text> {'liste '+liste.length}</Text>

      <FlatList data={liste} renderItem={({ item }) => (
         <Text style={globalStyles.titleText }>{ item[route.params.champ]}</Text>
      )} 
      />
    </View>
  );
}

