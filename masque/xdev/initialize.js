import React, { useState, useEffect } from 'react';
import { View, Text,FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import FlatButton from '../../shared/button.js';
import * as SQLite from 'expo-sqlite';
import ListFokontany from './listFokontany';
import Speculation from './lstSpecuMPV';
import ListSpeculationCEP from './listSpecuCEP';

export default function Initialize({ navigation }) {
  const [dataRegion, setDataRegion] = useState([])
  const [dataSpeculation, setDataSpeculation] = useState([])

  const db = SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  )

  const listFkt = ListFokontany()
  const champsFkt = "region,district, commune, fokontany, situation"
  const TableFkt = "fokontany"
  
  const listSpecCEP = ListSpeculationCEP();
  const champsSpeculationCEP = "description,typa"
  const tableSpeculationCEP = "speculationCEP"

  const listSpeculation = Speculation();
  const champsSpeculation = "description"
  const tableSpeculation = "speculation"

  useEffect(()=>{
    // ================== speculation ==================
     db.transaction((tx) => {
      // tx.executeSql("DROP TABLE fokontany",
      tx.executeSql("CREATE TABLE IF NOT EXISTS speculation"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT)",
        null,
        ()=>console.log('OK speculation MPV'),
        (error)=>console.log('erreur'),
      )
    });
  
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM speculation', null,
        (txObj, resultSet) => setDataSpeculation(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });



  },[]);

  function TestTable(nomTable) {
    db.transaction(tx  => {
      tx.executeSql("SELECT * FROM "+nomTable,
        null,
        (txObj, resultSet) => {
          console.log(resultSet.rowsAffected)
          if (resultSet.rows._array.length > 0) {
            console.log('efa misy')
          }
          else{
            console.log('Mbola tsy misy misy')
            // InsertTable(nomTable, ListElement)
          }
        },
        (txObj, error) => console.log(error)
      )
    })
  }

  function InsertTable(nomTable, champElement, ListElement) {
      const sqlInsert = "INSERT INTO "+nomTable+"("+champElement+")"+" VALUES "+ ListElement  
      db.transaction(tx => {
        tx.executeSql(sqlInsert,
          null,
          (txObj, resultSet) => console.log("OK",resultSet.rowsAffected),
          (txObj, error) => console.log('Error:'+error)
        );
      });            
  }

  
  function AjoutColonne(tableName,champDef) {
    
    db.transaction(tx => {
      tx.executeSql("ALTER TABLE "+tableName+" ADD COLUMN "+champDef  ,
        null,
        (txObj, resultSet) => console.log("OK",resultSet.rowsAffected),
        (txObj, error) => console.log('Error:'+error)
      );
    });            
  }

  function ModifierColonne(tableName, columnName, columnValue, condition) {
    const sqlModif = "UPDATE "+tableName+" SET "+columnName +" = '"+columnValue+"' WHERE "+condition
    console.log(sqlModif)
    db.transaction(tx => {
      tx.executeSql( sqlModif ,
        null,
        (txObj, resultSet) => console.log("OK",resultSet.rowsAffected),
        (txObj, error) => console.log('Error:'+error)
      );
    });            
  }

  function SupprimerDonnee(tableName , condition) {
    const sqlSuppr = "DELETE FROM "+tableName+" WHERE "+condition
    console.log(sqlSuppr)
    db.transaction(tx => {
      tx.executeSql( sqlSuppr ,
        null,
        (txObj, resultSet) => console.log("OK",resultSet.rowsAffected),
        (txObj, error) => console.log('Error:'+error)
      );
    });            
  }

  return (
    <View style={globalStyles.container}>
      <View >
        <Text></Text>
        <Text></Text>
        <FlatButton text='INSERER' 
          // onPress={() => InsertTable(TableFkt,champsFkt,listFkt)}
        />
      </View>

      <View >
        <Text></Text>
        <Text></Text>
        <FlatButton text='Tester Table' 
          // onPress={() => TestTable('fok')}
        />
      </View>
      
      <View >
        <Text></Text>
        <Text></Text>
        <FlatButton text='Ajout colonne' 
          // onPress={() => AjoutColonne('speculationCEP','typa TEXT')}
        />
      </View>

      <View >
      <Text></Text>
        <Text></Text>
        <FlatButton text='Modifier colonne' 
          // onPress={() => ModifierColonne('speculationCEP','typa','Elevage',
          //      "description='Apiculture' OR description='Porciculture'")}
        />
        <Text></Text>
        <Text></Text>
        <FlatButton text='Supprimer donnee' 
          // onPress={() => SupprimerDonnee('speculationCEP'," typa IS NULL")}
        />
      </View>

      <FlatList data={dataSpeculation} renderItem={({ item }) => (
          <View>
            <Text style={globalStyles.titleText }>{ item.description+' - '+ item.typa }</Text>
          </View>
      )} />

      <FlatList data={dataRegion} renderItem={({ item }) => (
          <View>
            <Text style={globalStyles.titleText }>{ item.region}</Text>
          </View>
      )} />

    </View>
  );
}

