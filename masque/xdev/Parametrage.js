import React, { useState, useEffect } from 'react';
import { View, Text,FlatList,BackHandler } from 'react-native';
import { FormStyles, globalStyles } from '../../styles/global';
import FlatButton from '../../shared/button.js';
import  {sqlCreateOffert,sqlSelectOffert,sqlInsertOffert} from './listOffert'
import * as SQLite from 'expo-sqlite';

export default function Parametrage({navigation}) {
  
  const [comTab, setComTab] = useState([]);
  
  const [regionServer,setRegionServer] = useState([])  
  const [districtServer,setDistrictServer] = useState([])  
  const [communeServer,setCommuneServer] = useState([])  
  const [fokontanyServer,setFokontanyServer] = useState([])  
  
  const [specCEPServer,setspecCEPServer] = useState([])  
  const [specMPVServer,setspecMPVServer] = useState([]) 

  const [typeOffertServer,SetTypeOffertServer] = useState([]) 
  const [listBenefServer,SetListBenefServer] = useState([]) 
  const [critereCommune,SetCritereCommune] = useState([]) 
  

  const db = SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur database')
  )
  
  let sqlOffert  = {
    sqlCreate : sqlCreateOffert,
    sqlInsert : sqlInsertOffert,
    sqlSelect : sqlSelectOffert,
    champ :'designation',
    isCreate : true,
    isInsert : true
  }

  function GetCritereCommune(){
    let critere=' WHERE false'
    for (let i = 0; i<comTab.length; i++)
      critere = critere+' OR ncommune = ' +comTab[i].ncommune 
    return critere
  }


  useEffect(()=>{
    // db.transaction((tx) => {
    //   tx.executeSql("DROP TABLE commune_tablette",
    //   // tx.executeSql("CREATE TABLE commune_tablette (nregion integer, ndistrict integer, ncommune integer)",
    //     null,
    //     ()=>console.log('OK Create FLAG'),
    //     (error)=>console.log(error)
    //   )
    // });

    function CreateLocalite(localite){

        db.transaction((tx) => {
      
          // tx.executeSql("DROP TABLE  pa_"+localite,
          let sql = ''
          if (localite==='fokontany')
            sql = "CREATE TABLE IF NOT EXISTS pa_"+localite+"(nom TEXT, maitre)"
          else
            sql = "CREATE TABLE IF NOT EXISTS pa_"+localite+"(code INTEGER, nom TEXT, maitre)"
          tx.executeSql(sql,
          null,
        ()=>{},
        (error)=>console.log('erreur create region')
        )});
    }
  
    function CreateSpeculation(typa){

      db.transaction((tx) => {
    
        // tx.executeSql("DROP TABLE  pa_"+localite,
        let sql = ''
          sql = "CREATE TABLE IF NOT EXISTS "+typa + 
              "(id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, typa TEXT)"
        tx.executeSql(sql,
        null,
      ()=>{},
      (error)=>console.log('erreur create typa')
      )});
    }

    function CreateTypeOffert(){

      db.transaction((tx) => {
    
        // tx.executeSql("DROP TABLE  pa_"+localite,
        let sql = ''
          sql = "CREATE TABLE IF NOT EXISTS type_offert"+ 
          "(id INTEGER PRIMARY KEY AUTOINCREMENT,"+
          "typa TEXT,"+
          "designation TEXT,"+
          "unite TEXT,"+
          "agriculture TEXT,"+
          "apiculture TEXT,"+
          "porciculture TEXT)"
           tx.executeSql(sql,
        null,
      ()=>{},
      (error)=>console.log('erreur create typa')
      )});
    }
    function CreateListBenef(){

      db.transaction((tx) => {
    
        // tx.executeSql("DROP TABLE  list_benef",
        let sql = "CREATE TABLE IF NOT EXISTS list_benef"+ 
          "(id INTEGER PRIMARY KEY AUTOINCREMENT,"+
          "ncommune TEXT,"+
          "fokontany TEXT,"+
          "village TEXT,"+
          "nom_prenom TEXT)"
           tx.executeSql(sql,
        null,
      ()=>{},
      (error)=>console.log('erreur create typa')
      )});
    }

    db.transaction(tx => {
      tx.executeSql("SELECT * FROM commune_tablette",
        null,
        (txObj, resultSet) => setComTab(resultSet.rows._array),
        (txObj, error) => console.log(2,error)
      );
    });

    CreateLocalite("region")
    CreateLocalite("district")
    CreateLocalite("commune")
    CreateLocalite("fokontany")

    CreateSpeculation("speculation_cep")
    CreateSpeculation("speculation_mpv")
    CreateTypeOffert()
    CreateListBenef()

    GetLocalite('region', setRegionServer)
    GetLocalite('district', setDistrictServer)
    GetLocalite('commune', setCommuneServer)
    GetLocalite('fokontany', setFokontanyServer)
    GetSpeculation('speculation_cep', setspecCEPServer)
    GetSpeculation('speculation_mpv', setspecMPVServer)
    GetTypeOffert()

    if (comTab.length>0){
      let crit = GetCritereCommune()
      GetListBenef(crit)
    }
    
},[]);
 
// console.log('region',regionServer.length)
// console.log('district',districtServer.length)
// console.log('commune',communeServer.length)
// console.log('fokontany',fokontanyServer.length)
// console.log('speculation CEP',specCEPServer.length)
// console.log('speculation MPV',specMPVServer.length)
// console.log('fokontany',fokontanyServer.length)
// console.log('type Offert',typeOffertServer.length) 
// console.log('Commune tablette',comTab.length) 

// console.log('Liste beneficiaire',listBenefServer.length)


function GetLocalite(str_localite, setLocalite){
    const ReponseLocalite= async () => {
        try {
            const response = await fetch("http://102.16.63.78:5000/affiche/ad2m/pa_"+str_localite,{
                method : 'GET',
                headers : {'Content-Type' : "application/json"},
            }); 
            return await response.json();
        }catch (err) {
            console.error(err.message); 
        } 
    } 
    const statut = ReponseLocalite()
    statut.then(function(result) {
        setLocalite(result)
    }, function(err) {
        console.log(err.message)
    });
}

function GetSpeculation(st_typa, setSpeculation){
  const ReponseSpec= async () => {
      // console.log(12,st_typa)
      try {
          // console.log("http://102.16.63.78:5000/affiche/ad2m/mo_"+st_typa)
          const response = await fetch("http://102.16.63.78:5000/affiche/ad2m/mo_"+st_typa,{
              method : 'GET',
              headers : {'Content-Type' : "application/json"},
          }); 
          return await response.json();
      }catch (err) {
          console.error(err.message); 
      } 
  } 
  const statut = ReponseSpec()
  statut.then(function(result) {
      setSpeculation(result)
  }, function(err) {
      console.log(err.message)
  });
}

function GetTypeOffert(){
  const ReponseTypeOffert= async () => {
      try {
          const response = await fetch("http://102.16.63.78:5000/affiche/ad2m/mo_type_offert",{
              method : 'GET',
              headers : {'Content-Type' : "application/json"},
          }); 
          return await response.json();
      }catch (err) {
          console.error(err.message); 
      } 
  } 
  const statut = ReponseTypeOffert()
  statut.then(function(result) {
    SetTypeOffertServer(result)
  }, function(err) {
      console.log(err.message)
  });
}

function GetListBenef(crit){
  // console.log(10)
  let json_select = 
    {
      critere: crit
    }
    // console.log(11)
              
  const ReponseListBenef= async () => {
      try {
          const response = await fetch("http://102.16.63.78:5000/affiche_avec_critere/ad2m/mo_list_benef",{
              method : 'POST',
              headers : {'Content-Type' : "application/json"},
              body : JSON.stringify(json_select)
          }); 
          return await response.json();
      }catch (err) {
          console.error(err.message);
      } 
  } 
  const statut = ReponseListBenef()
  statut.then(function(result) {
    SetListBenefServer(result)
  }, function(err) {
      console.log(err.message)
  });
}

function MettreValues (localite){
  let values = ""
  localite.forEach((item,i) => {
    let val = "("
    let valMaitre = ''
    let valNom = ''
    let valCode = ''
    Object.entries(item).forEach(([key, value]) => {
      if (key==="maitre"){
        valMaitre =  value 
      }  
      if (key==="nom"){
        valNom = ",'"+value+"'"
      }  
      if (key==="code"){
        valCode = "," + value 
      }  
    });
    val = val + valMaitre + valNom + valCode + ')'
    if (values === "")
      values = values + val
    else 
    values = values +','+ val
  });
  return values
}

function MettreValuesSpec (typa){
  let values = ""
  typa.forEach((item,i) => {
    let val = "("
    let valDescription =  '' 
    let valTypa =  '' 
    Object.entries(item).forEach(([key, value]) => {
      if (key==="description"){
        valDescription =  value 
      }if (key==="typa"){
        valTypa =  value 
      }  
    });
    val = val + "'" + valDescription +"', '" + valTypa +"')"
    if (values === "")
      values = values + val
    else 
    values = values +','+ val
  });
  return values
}

function MettreValuesTypeOffert (){
  let values = ""
  typeOffertServer.forEach((item,i) => {
    let val = "("
    let valTypa =  ''
    let valDesignation =  ''
    let valUnite =  ''
    let valAgriculture =  ''
    let valApiculture =  ''
    let valPorciculture =  ''

    Object.entries(item).forEach(([key, value]) => {
      if (key==="typa"){
        valTypa  =  value 
      }      
      if (key==="designation"){
        valDesignation  =  value 
      }
      if (key==="unite"){
        valUnite  =  value 
      }
      if (key==="agriculture"){
          valAgriculture  =  value 
        }
        if (key==="apiculture"){
        valApiculture  =  value 
      }
      if (key==="porciculture"){
        valPorciculture  =  value 
      }
        
    });
    val = val + 
      "'" + valTypa +
      "', '" + valDesignation +
      "', '" + valUnite +
      "', '" + valAgriculture +
      "', '" + valApiculture +
      "', '" + valPorciculture +
      "')"
    if (values === "")
      values = values + val
    else 
    values = values +','+ val
  });
  return values
}

function MettreValuesListBenef (){
  let values = []
  let j = 0
  let k = 0
  values[k] = ""
  listBenefServer.forEach((item,i) => {
    let val = "("
    let valNcommune =  ''
    let valFokontany =  ''
    let valVillage =  ''
    let valNomPrenom =  ''
    Object.entries(item).forEach(([key, value]) => {
      if (key==="ncommune"){
        valNcommune  =  value 
      }      
      if (key==="fokontany"){
         valFokontany  =  value 
      }
      if (key==="village"){
         valVillage  =  value 
        }
        if (key==="nom_prenom"){
         valNomPrenom  =  value 
      }
        
    });
    val = val + 
      "'" + valNcommune +
      "', '" + valFokontany +
      "', '" + valVillage +
      "', '" + valNomPrenom +
      "')"
    if (values[k] === "")
      values[k] = values[k] + val
    else 
      values[k]  = values[k]  +','+ val
    // console.log(j,k,values[k] )
    j=j+1
    if (j>1000){
      k++
      j=0
      values[k] = ""
    }
  });
  return values
}

function InsertOnLocality(localite, values ){
    try {
      db.transaction(tx => {
        tx.executeSql("DELETE FROM pa_"+localite,  
        null,
          (txObj, resultSet) =>{
            // console.log(resultSet)
          },
          (txObj, error) => console.log(error)
        );
      });
      db.transaction(tx => {
        let sql = ''
        if (localite==='fokontany')
          sql = "INSERT INTO pa_"+localite+"(maitre, nom) VALUES "+values
        else
        sql = "INSERT INTO pa_"+localite+"(maitre, nom, code) VALUES "+values
        tx.executeSql(sql,  
        null,
          (txObj, resultSet) =>{
            console.log(resultSet)
          },
          (txObj, error) => console.log(error)
        );
      });
    }catch(error){

    }
  }

  function InsertOnSpec(typa, values ){
    try {
      db.transaction(tx => {
        tx.executeSql("DELETE FROM "+typa,  
        null,
          (txObj, resultSet) =>{
            // console.log(resultSet)
          },
          (txObj, error) => console.log(error)
        );
      });
      db.transaction(tx => {
        let sql = ''
        sql = "INSERT INTO "+typa+"(description, typa) VALUES "+values
        tx.executeSql(sql,  
        null,
          (txObj, resultSet) =>{
            console.log(resultSet)
          },
          (txObj, error) => console.log(error)
        );
      });
    }catch(error){

    }
  }

  function InsertOnTypeOffert( values ){
    try {
      db.transaction(tx => {
        tx.executeSql("DELETE FROM type_offert",  
        null,
          (txObj, resultSet) =>{
            // console.log(resultSet)
          },
          (txObj, error) => console.log(error)
        );
      });
      db.transaction(tx => {
        let sql = ''
        sql = "INSERT INTO type_offert(typa,designation,unite,agriculture,apiculture,porciculture) VALUES "+values
        tx.executeSql(sql,  
        null,
          (txObj, resultSet) =>{
            console.log(resultSet)
          },
          (txObj, error) => console.log(error)
        );
      });
    }catch(error){

    }
  }

  function InsertOnListBenef( values ){
    try {
      
      db.transaction(tx => {
        let sql = ''
        sql = "INSERT INTO list_benef(ncommune,fokontany,village,nom_prenom) VALUES "+values
        tx.executeSql(sql,  
        null,
          (txObj, resultSet) =>{
            console.log(resultSet)
          },
          (txObj, error) => console.log(error)
        );
      });
    }catch(error){
    }
  }

function InsertAllLocality(localite,setLocaliteServer,localiteServer){
  // GetLocalite(localite, setLocaliteServer)
  const values = MettreValues(localiteServer)
  InsertOnLocality(localite, values)
}

function InsertAllSpec(typa,setspecServer,SpecServer){
  // GetSpeculation(typa, setspecServer)
  const values = MettreValuesSpec(SpecServer)
  InsertOnSpec(typa, values)
}
function InsertAllTypeOffert(){
  // GetTypeOffert()
  const values = MettreValuesTypeOffert()
  InsertOnTypeOffert(values)
}
function InsertAllListBenef(){
  // console.log(1)
  // GetListBenef(comTab[0].ncommune)
  // console.log(2,listBe00nefServer)
  const values = MettreValuesListBenef()
  console.log(3,values)
  db.transaction(tx => {
    tx.executeSql("DELETE FROM list_benef",  
    null,
      (txObj, resultSet) =>{
        // console.log(resultSet)
      },
      (txObj, error) => console.log(error)
    );
  });
  for (let i = 0 ; i<values.length;i++)
    InsertOnListBenef(values[i])
    // console.log(3)
  }

return (
  <View style={globalStyles.container}>
      <View >
        <Text></Text>
        <FlatButton text='Région' style = {{color:'white'}}
          onPress={() => InsertAllLocality('region',setRegionServer,regionServer)}
        />
      </View>
      <View >
        <Text></Text>
        <FlatButton text='District' style = {{color:'white'}}
          onPress={() => InsertAllLocality('district',setDistrictServer,districtServer)}
        />
      </View>
      <View >
        <Text></Text>
        <FlatButton text='Commune' style = {{color:'white'}}
          onPress={() => InsertAllLocality('commune',setCommuneServer,communeServer)}
        />
      </View>
      <View >
        <Text></Text>
        <FlatButton text='Fokontany' style = {{color:'white'}}
          onPress={() => InsertAllLocality('fokontany',setFokontanyServer,fokontanyServer)}
        />
      </View>
      <View >
        <Text></Text>
        <FlatButton text='Spéculation CEP' style = {{color:'white'}}
          onPress={() => InsertAllSpec('speculation_cep',setspecCEPServer,specCEPServer)}
        />
      </View>
      <View >
        <Text></Text>
        <FlatButton text='Spéculation MPV' style = {{color:'white'}}
          onPress={() => InsertAllSpec('speculation_mpv',setspecMPVServer,specMPVServer)}
        />
      </View>
      <View >
        <Text></Text>
        <FlatButton text='Type dotation' style = {{color:'white'}}
          onPress={() => InsertAllTypeOffert()}
        />
      </View>

      <View >
      <Text></Text>
      <Text></Text>
      <Text></Text>
        <FlatButton text={comTab.length>0?'Liste beneficiaire':'Veuillez parametrer les communes du tablette'} style = {{color:'white'}}
          onPress={() => {if (comTab.length > 0) InsertAllListBenef()}}
        />
      </View>

      {/* <View >
      <Text></Text>
        <Text></Text>
        <FlatButton text='A offrir' style = {FormStyles.FlatButton}
          onPress={() => navigation.navigate('Tables', sqlOffert)}
        />
        <Text></Text>
        <FlatButton text='Autres' 
          // onPress={() => SupprimerDonnee('speculationCEP'," typa IS NULL")}
        />
      </View> */}
    </View>
    
  );
}

