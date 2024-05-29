import React, {useState,useEffect} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { FormStyles, globalStyles } from '../styles/global';
import FlatButton from '../shared/button.js';
import * as SQLite from 'expo-sqlite';
import { Button } from 'react-native-paper';
import AppLoader from './AppLoader';

export default function ConnexionServer({passServeur}) {
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState('Cliquez-ici pour transférer cet element')
  let activity = passServeur.activity
  let valeurID = passServeur.valeurID
  let setExporter =passServeur.setExporter
  let rand = 1000000*Math.floor(Math.random() * 9000 + 1000);
  
  const db =SQLite.openDatabase('ongt21.db',
    null,
    ()=>console.log('base de donnee connected'),
    (error)=>console.log('erreur')
  ) 
  
  const [pere, setPere] = useState([])
  const [tabla, setTabla] = useState([])
  const [tabla2, setTabla2] = useState([])
  const [fils, setFils] = useState([])

  // console.log('55')
  // activity='CEP'
  // activity='MPV'
  // activity='AUE'
  // activity='AUP'
  // activity='COGE'
  // activity='FA'
  // activity='ENV'
  // activity='RBM'
  // activity='RBMCOM'
  
  let nomTable = {}
  let champs = {}
  let cleEtrange ={} 
  let destination ={}
  let majCle ={}

//====================CEP=========================================
  let champ_date_mep = []
  let exist_tabla = false
  let exist_tabla2 = false
  let exist_fils = false
    
  if (activity==='CEP'){
    exist_tabla = true
    exist_tabla2 = true
    exist_fils = true
    champ_date_mep[0] = 'date_mise_place'
  
    nomTable['pere'] = "cep"
    nomTable['tabla'] = "membre_cep"
    nomTable['tabla2'] = "offert_cep"
    nomTable['fils'] = "offert_membre_cep"
    
    cleEtrange['tabla'] = "id_cep"
    cleEtrange['tabla2'] = "id_cep"
    cleEtrange['fils'] = "id_membre"

    champs['pere'] = "ref, ncommune, typologie_sol, nom_perimetre AS perimetre,nom AS groupement ," +
      " speculation_special AS speculation, date_mep AS date_mise_place, campagne, surface, rendement"
    champs['tabla'] = "nom AS nom_prenom, surnom , fokontany, village , h_f AS genre, annee_naissance, surface,"+
      "cin, statut_menage AS situation_matrimoniale , respon_niveau_grpt"
    champs['tabla2'] = "categorie, designation, quantite"
    champs['fils'] = "categorie, designation, quantite"

    destination['pere'] = 'mo_cep'
    destination['tabla'] = 'mo_membre_cep'
    destination['tabla2'] = 'mo_offert_cep'
    destination['fils'] = 'mo_offert_membre_cep'
  }
//======================MPV==============================================

if (activity==='MPV'){
  exist_tabla = true
  exist_tabla2 = true
  exist_fils = true
    
  champ_date_mep[0] = 'date_mise_place'
  nomTable['pere'] = "mpv"
  nomTable['tabla'] = "membre_mpv"
  nomTable['tabla2'] = "offert_mpv"
  nomTable['fils'] = "offert_membre_mpv"
  
  cleEtrange['tabla'] = "id_mpv"
  cleEtrange['tabla2'] = "id_mpv"
  cleEtrange['fils'] = "id_membre"

  champs['pere'] = "ref,ncommune,fokontany,nom AS groupement,date_mep AS date_mise_place"

  champs['tabla'] = "nom AS nom_prenom ,surnom,fokontany,village,h_f AS genre,annee_naissance,cin,type_mp,code_menage"
  champs['tabla2'] = "categorie, designation, quantite"
    
  champs['fils'] = "categorie, designation, quantite"

  destination['pere'] = 'mo_mpv'
  destination['tabla'] = 'mo_membre_mpv'
  destination['tabla2'] = 'mo_offert_mpv'
  destination['fils'] = 'mo_offert_membre_mpv'
}

//======================AUE==============================================
if (activity==='AUE'){
  exist_tabla = true
  exist_fils = true
  nomTable['pere'] = "aue"
  nomTable['tabla'] = "benef_aue"
  nomTable['tabla2'] = "offert_aue"
  nomTable['fils'] = "offert_benef_aue"
  
  cleEtrange['tabla'] = "id_aue"
  cleEtrange['tabla2'] = "id_aue"
  cleEtrange['fils'] = "id_benef"

  champs['pere'] = "nom,date_creation, nom_president, sexe_president, nom_leader, contact, "+
                   "num_recepisse_commune, date_recepisse_district, num_recepisse_district"

  champs['tabla'] = "nom, surnom, fokontany, village, h_f,annee_naissance, surface,cin,"+
                    "statut_menage, surface"

  champs['tabla2'] = "categorie, designation, quantite"
  champs['fils'] = "categorie, designation, quantite"

  destination['pere'] = 'mo_aue'
  destination['tabla'] = 'mo_benef_aue'
  destination['tabla2'] = 'mo_offert_aue'
  destination['fils'] = 'mo_offert_benef_aue'
}

//======================AUP==============================================

if (activity==='AUP'){
  exist_tabla = true
  exist_fils = true


  nomTable['pere'] = "aup"
  nomTable['tabla'] = "benef_aup"
  nomTable['tabla2'] = "offert_aup"
  nomTable['fils'] = "offert_benef_aup"
  
  cleEtrange['tabla'] = "id_aup"
  cleEtrange['tabla2'] = "id_aup"
  cleEtrange['fils'] = "id_benef"

  champs['pere'] = "nom,date_creation,type_organisation,nom_president,sexe_president,nom_leader,"+
                   "contact,num_recepisse_commune,date_recepisse_district,num_recepisse_district"

  champs['tabla'] = "nom,surnom,fokontany,village,h_f,annee_naissance,statut_menage,cin"
  champs['tabla2'] = "categorie, designation, quantite"

  champs['fils'] = "categorie, designation, quantite"

  destination['pere'] = 'mo_aup'
  destination['tabla'] = 'mo_benef_aup'
  destination['tabla2'] = 'mo_offert_aup'
  destination['fils'] = 'mo_offert_benef_aup'
}

//======================COGE=============================================
if (activity==='COGE'){

  exist_tabla = true

  nomTable['pere'] = "coge"
  nomTable['tabla'] = "benef_coge"
  nomTable['fils'] = "offert_benef_coge"
  
  cleEtrange['tabla'] = "id_coge"
  cleEtrange['fils'] = "id_benef"

  champs['pere'] = "nom,date_creation,nom_president,sexe_president,nom_leader,contact,"+
                   "num_recepisse_commune,date_recepisse_district,num_recepisse_district"

  champs['tabla'] = "nom,surnom,fokontany,village,h_f,annee_naissance,surface,cin,"+
                    "statut_menage ,surface"

  champs['fils'] = "categorie, designation, quantite"

  destination['pere'] = 'mo_coge'
  destination['tabla'] = 'mo_benef_coge'
  destination['fils'] = 'mo_offert_benef_coge'
}

//======================F.A==============================================
if (activity==='FA'){
  exist_tabla = true
  exist_fils = true


  nomTable['pere'] = "foyer_amel"
  nomTable['tabla'] = "benef_f_amel"
  nomTable['fils'] = "offert_benef_fa"
  
  cleEtrange['tabla'] = "id_fa"
  cleEtrange['fils'] = "id_benef"

  champs['pere'] = "ncommune,fokontany,village,nom,localite_anim,date_formation"

  champs['tabla'] = "nom_prenom,cin,nb_foyer_diffuse"

  champs['fils'] = "categorie, designation, quantite"

  destination['pere'] = 'mo_foyer_amel'
  destination['tabla'] = 'mo_benef_f_amel'
  destination['fils'] = 'mo_offert_benef_fa'
}

//======================P.ENV============================================
if (activity==='ENV'){

  nomTable['pere'] = "env"
  

  champs['pere'] = "nom_perimetre,partie_ouvrage,nom_espece_utilisee,riv_canal_protegee,"+
                   "longuer,point_metriq_depart,point_metriq_fin,date_mis_terre,date_suivie"

  destination['pere'] = 'mo_env'
}

//======================RBM==============================================

if (activity==='RBM'){
  exist_tabla = true
  exist_fils = true
  
  champ_date_mep[0] = 'date_mep'
  
  nomTable['pere'] = "rbm"
  nomTable['tabla'] = "benef_rbm"
  nomTable['tabla2'] = "offert_rbm"
  nomTable['fils'] = "offert_benef_rbm"
  
  cleEtrange['tabla'] = "id_rbm"
  cleEtrange['tabla2'] = "id_rbm"
  cleEtrange['fils'] = "id_benef"

  champs['pere'] = " ref,ncommune,fokontany,date_mep,pepineriste"

  champs['tabla'] = " nom,surnom,fokontany,village,h_f,annee_naissance,cin"
  champs['tabla2'] = "categorie, designation, quantite"
  champs['fils'] = "categorie, designation, quantite"

  destination['pere'] = 'mo_rbm'
  destination['tabla'] = 'mo_benef_rbm'
  destination['tabla2'] = 'mo_offert_rbm'
  destination['fils'] = 'mo_offert_benef_rbm'
}

//======================RBMCOM===========================================
if (activity==='RBMCOM'){
  
  exist_tabla = true
  
  champ_date_mep[0] = 'date_mis_terre'
  champ_date_mep[1] = 'date_suivie_reb'
  
  nomTable['pere'] = "rbm_com"
  nomTable['tabla'] = "dotation_rbm_com"
  
  cleEtrange['tabla'] = "id_rbm_com"

  champs['pere'] = " ncommune,fokontany,date_mis_terre,latitude,longitude,beneficiaire,date_suivie_reb"

  champs['tabla'] = "nom_espece ,nb_jeune_plant" 

  destination['pere'] = 'mo_rbm_com'
  destination['tabla'] = 'mo_dotation_rbm_com'
}

majCle['tabla'] = [{
                        sql : ' UPDATE '+ destination.tabla + 
                              ' SET ' + cleEtrange.tabla + ' = ' + destination.pere + '.id FROM ' + destination.pere +
                              ' WHERE '+ destination.pere + '.id_rand = ' + destination.tabla + '.cle_etrange_rand '
                      }]
majCle['tabla2'] = [{
                        sql : ' UPDATE '+ destination.tabla2 + 
                              ' SET ' + cleEtrange.tabla2 + ' = ' + destination.pere + '.id FROM ' + destination.pere +
                              ' WHERE '+ destination.pere + '.id_rand = ' + destination.tabla2 + '.cle_etrange_rand '
                      }]

majCle['fils'] = [{
                        sql :' UPDATE ' + destination.fils +
                            ' SET '  +  cleEtrange.fils + ' = ' + destination.tabla + '.id FROM ' + destination.tabla + 
                            ' WHERE ' + destination.tabla + '.id_rand =' + destination.fils + '.cle_etrange_rand '
                      }]
  

  function SelectPere() {
    db.transaction(tx => { 
      let sql =  " SELECT " +champs.pere + ", id +"+ rand+ " AS id_rand " +
                  " FROM " + nomTable.pere //+ 
                  " WHERE id=" +valeurID 
      // console.log(sql)
      tx.executeSql(sql,
        null,
        (txObj, resultSet) => setPere(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }

  function SelectTable(tab,setTab) {
    db.transaction(tx => { 
      const sql =  " SELECT "+champs[tab] + ", id +"+ rand+ " AS id_rand, " +
         cleEtrange[tab]+" + "+ rand + " AS cle_etrange_rand " +  
        " FROM " + nomTable[tab] + " WHERE " +cleEtrange[tab] + "=" +valeurID 
      //console.log(8,sql)
      tx.executeSql(sql,
        null,
        (txObj, resultSet) => setTab(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }
  
  function SelectFils() {
      db.transaction(tx => { 
        // console.log(rand)
        let sql =  " SELECT " +champs.fils + "," +
        cleEtrange.fils + " + " + rand + " AS cle_etrange_rand "+  
          " FROM " + nomTable.fils +
          " LEFT JOIN " + nomTable.tabla +" ON "+ nomTable.tabla +".id  = " + cleEtrange.fils +
          " WHERE "+ cleEtrange.tabla + " = " +valeurID 
        // console.log(sql)
        tx.executeSql(sql,
          null,
          (txObj, resultSet) => setFils(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
    });
  }
//============================suppression========================================

  function DeletePere() {
    db.transaction(tx => { 
      let sql =  " DELETE FROM " + nomTable.pere + " WHERE id  = " + valeurID
      tx.executeSql(sql,
        null,
        (txObj, resultSet) => setPere(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }
  function DeleteTable(tab,setTab) {
    db.transaction(tx => { 
     let sql =  " DELETE FROM " + nomTable[tab] + " WHERE " + cleEtrange[tab] + " = " + valeurID
      tx.executeSql(sql,
        null,
        (txObj, resultSet) => setTab(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });
  }

  function DeleteFils() {
      db.transaction(tx => { 
        let sql =  " DELETE  FROM " + nomTable.fils + " WHERE "+ cleEtrange.fils + 
                   " IN (select id from " + nomTable.tabla + " WHERE " + cleEtrange.tabla + "=" + valeurID + ")" 
        tx.executeSql(sql,
          null,
          (txObj, resultSet) => setFils(resultSet.rows._array),
          (txObj, error) => console.log(error)
        );
    });
  }

  function InsertDonnee(jsonAjout,nom_table){
    const InsertTrouvee = async () => {
      const response = await fetch("http://102.16.63.78:5000/ajout/ad2m/"+nom_table,{
        method : 'POST',
        headers : {'Content-Type' : "application/json"},
        body : JSON.stringify(jsonAjout[0])
      }); 
      return await response.json();
    }
    const statut = InsertTrouvee()
    statut.then(function(result) {
      // console.log(12,result)
    }, function(err) {
      // console.log(err.message)
    });
    // console.log(donneeTable)
  
    }

    function UpdateDonnee(jsonUpdate){
      const UpdateTrouvee = async () => {
        const response = await fetch("http://102.16.63.78:5000/requete/ad2m",{
          method : 'POST',
          headers : {'Content-Type' : "application/json"},
          body : JSON.stringify(jsonUpdate)
        }); 
        return await response.json();
      }
      const statut = UpdateTrouvee()
      statut.then(function(result) {
        // console.log(13,result)
      }, function(err) {
        // console.log(err.message)
      });
      // console.log(donneeTable)
    
      }
  
    function SetNullRand(nom_table,champ){
      let setNull = [{
        sql :' UPDATE ' + nom_table +
            ' SET '+champ+' = null '+
            ' WHERE '+champ+' is not null  '
      }]

        const UpdateNull = async () => {
          const response = await fetch("http://102.16.63.78:5000/requete/ad2m",{
            method : 'POST',
            headers : {'Content-Type' : "application/json"},
            body : JSON.stringify(setNull)
          }); 
          return await response.json();
        }
        const statut = UpdateNull()
        statut.then(function(result) {
          // console.log(14,result)
        }, function(err) {
          // console.log(err.message)
        });
        // console.log(donneeTable)
      
        }
    
    useEffect(()=>{

      SelectPere()
      if (exist_tabla === true)
        SelectTable('tabla',setTabla)
      if (exist_tabla2 === true)
        SelectTable('tabla2',setTabla2)
      if (exist_fils === true)
        SelectFils()
  
  
    const test = async () => {
      const response = await fetch("http://102.16.63.78:5000/affiche/ad2m/pa_region",{
        method : 'GET',
        headers : {'Content-Type' : "application/json"},
      }); 
      return await response.json();
    }
    const statut = test()
    statut.then(function(result) {
       setIsConnected(true)
       console.log('connexion OK')
   
    }, function(err) {
      setIsConnected(false)
      setMessage("Aucune connexion ")
      console.log('erreur connexion')
    });
  
      },[])

    function transforDate(daty){
      return daty.substring(6,12)+'-'+daty.substring(3,6)+'-'+daty.substring(0,2)
  }
  
  //console.log('6',pere)
  // console.log('7',tabla)
  
  let champ = ''
  if (pere.length>0){
    for (let i = 0; i < champ_date_mep.length; i++){
      champ = champ_date_mep[i]
      transforDate(pere[0][champ]) 
    }
  }

  // function testConnexion(){
  //   const test = async () => {
  //     const response = await fetch("http://102.16.63.78:5000/affiche/ad2m/pa_region",{
  //       method : 'GET',
  //       headers : {'Content-Type' : "application/json"},
  //     }); 
  //     return await response.json();
  //   }
  //   const statut = test()
  //   statut.then(function(result) {
  //      setIsConnected(true)
  //      setMessage("Transfert réussi ")
  //      console.log('connexion OK')
   
  //   }, function(err) {
  //     setIsConnected(false)
  //     setMessage("Aucune connexion ")
  //     console.log('erreur connexion')
  //   });
  // }
    return (
    <View style={globalStyles.container}>
      {/* <Text style = {{color:'white'}}>Voulez vous vraiement transférer vers serveur</Text> */}
      {/* <AppLoader /> */}
      <FlatButton text={message}
        onPress={() => {
          console.log("isConnected", isConnected)
          if (isConnected ===true){
            InsertDonnee(pere,destination.pere)
            if ((exist_tabla === true)&&(tabla2.length>0)){
              InsertDonnee(tabla,destination.tabla)
            }
            if ((exist_tabla2 === true)&&(tabla2.length>0)){
              InsertDonnee(tabla2,destination.tabla2)
            }
            if ((exist_fils === true)&&(fils.length>0)){
              InsertDonnee(fils,destination.fils)
            }
            setTimeout(() => {
              if (exist_tabla === true){
                UpdateDonnee(majCle.tabla)
              }
              if (exist_tabla2 === true){
                UpdateDonnee(majCle.tabla2)
              }
              if (exist_fils === true){
                UpdateDonnee(majCle.fils)
              }
            }, 5000);
              setTimeout(() => {
              SetNullRand(destination.pere,'id_rand')
              if (exist_tabla === true){
                SetNullRand(destination.tabla,'id_rand')
                SetNullRand(destination.tabla,'cle_etrange_rand')
              }
              if (exist_tabla2 === true){
                SetNullRand(destination.tabla2,'id_rand')
                SetNullRand(destination.tabla2,'cle_etrange_rand')
              }
              if (exist_fils === true){
                SetNullRand(destination.fils,'cle_etrange_rand')
              }
            }, 10000);
            
            setTimeout(() => {
              if (exist_fils === true){
                DeleteFils()
              }
              if (exist_tabla === true){
                DeleteTable('tabla',setTabla)
              }
              if (exist_tabla2 === true){
                DeleteTable('tabla2',setTabla2)
              }
              console.log('delete pere')
              DeletePere()
            }, 15000);
            setTimeout(() => {
              setExporter(false)
            },  20000);
              setMessage("Transfert réussi ")
            }
            else{
              
              setTimeout(() => {
                setExporter(false)
              },  20000);  
              console.log('Aucune connexion')
            }
        }}
      />
       
      <Button/>
    </View>
  );
  }
