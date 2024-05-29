import React, { useState, useEffect } from 'react';

export const CreerTableCEP = (db) =>{
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE cep IF NOT EXISTS "+
          "ID INTEGER PRIMARY KEY AUTOINCREMENT, ref TEXT, commune TEXT, typologie_sol TEXT, "+
            "nom_perimetre TEXT, nom TEXT, type_speculation TEXT, speculation_special TEXT, "+
            "speculation_scv TEXT, campagne TEXT"
        )
    },[]);
    
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE beneficiaire_cep IF NOT EXISTS "+
            "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_groupement INTEGER"+
            "village TEXT, nom_prenom TEXT, surnom TEXT, h_f TEXT, annee_naissance INTEGER cin TEXT,"+
            "statut_menage TEXT, code_menage TEXT, respon_niveau_grpt, respon_niveau__comt TEXT)"
        )
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE offert_membre_cep IF NOT EXISTS "+
            "id INTEGER PRIMARY KEY AUTOINCREMENT,id_cep INTEGER"+
            "designation TEXT, quantite REAL"
        )
    },[]);
    db.transaction((tx) => {
            tx.executeSql("CREATE TABLE offert_cep IF NOT EXISTS "+
                "id INTEGER PRIMARY KEY AUTOINCREMENT,id_cep INTEGER"+
                "designation TEXT, quantite REAL"
            )
    },[]);
}


export const CreerTableAUE = (db) =>{
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE aue IF NOT EXISTS "+
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, ref TEXT, commune TEXT, typologie_sol TEXT, "+
        "nom_perimetre TEXT, nom_groupement TEXT, type_speculation TEXT, speculation_special TEXT, "+
        "speculation_scv TEXT, campagne TEXT)")
    },[]);
      
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE beneficiaire_aue IF NOT EXISTS "+
            "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_mpv INTEGER"+
            "village TEXT, nom_prenom TEXT, surnom TEXT, h_f TEXT, annee_naissance INTEGER cin TEXT,"+
            "statut_menage TEXT, code_menage TEXT, respon_niveau_grpt, respon_niveau_comt TEXT)"
        )
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE offert_membre_aue IF NOT EXISTS "+
            "id INTEGER PRIMARY KEY AUTOINCREMENT,id_membre INTEGER"+
            "designation TEXT, quantite REAL"
        )
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE offert_aue IF NOT EXISTS "+
                "id INTEGER PRIMARY KEY AUTOINCREMENT,id_aue INTEGER"+
                "designation TEXT, quantite REAL"
        )
    },[]);
}

export const CreerTableCOGE = (db) =>{
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE coge IF NOT EXISTS "+
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, ref TEXT, commune TEXT, typologie_sol TEXT, "+
        "type_infrastructure TEXT, nom_infrastructure TEXT, nom_coge TEXT, type_speculation TEXT, speculation_special TEXT, "+
        "campagne TEXT)")
      },[]);
        
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE beneficiaire_coge IF NOT EXISTS "+
            "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_mpv INTEGER"+
            "village TEXT, nom_prenom TEXT, surnom TEXT, h_f TEXT, annee_naissance INTEGER cin TEXT,"+
            "statut_menage TEXT, code_menage TEXT, respon_niveau_comt TEXT)"
        )
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE offert_membre_coge IF NOT EXISTS "+
            "id INTEGER PRIMARY KEY AUTOINCREMENT,id_membre INTEGER"+
            "designation TEXT, quantite REAL"
        )
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE offert_coge IF NOT EXISTS "+
                "id INTEGER PRIMARY KEY AUTOINCREMENT,id_coge INTEGER"+
                "designation TEXT, quantite REAL"
        )
    },[]);
}

e