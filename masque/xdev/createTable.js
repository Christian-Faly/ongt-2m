import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

export default function CreateTable(nomTable, listElement) {

  const db =SQLite.openDatabase('ongt21.db',
      null,
      ()=>console.log('base de donnee connected'),
      (error)=>console.log('erreur')
  )

  
  function InsertTable() {

    // db.transaction(tx  => {
    //   tx.executeSql("SELECT * FROM "+nomTable,
    //     null,
    //     (txObj, resultSet) => {
    //       if (resultSet.rowsAffected > 0) {
    //         db.transaction(tx => {
    //           tx.executeSql("INSERT INTO commune(region,district, commune, fokontany"+ ListElement,
    //           null,
    //           (txObj, resultSet) => setCEP(resultSet.rows._array),
    //           (txObj, error) => console.log(error)
    //           );
    //         });            
    //       }
    //     },
    //     (txObj, error) => console.log(error)
    //   )
    // })
  }


  useEffect(()=>{

    tx.executeSql("CREATE TABLE IF NOT EXISTS fokontany"+
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, region TEXT, district TEXT, commune TEXT, fokontany TEXT)",
          null,
          ()=>console.log('OK'),
          (error)=>console.log('erreur')
      )

  },[]);

}




