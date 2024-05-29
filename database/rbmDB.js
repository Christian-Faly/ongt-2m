export const CreerTableReboisement = (db) =>{
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE reboisement IF NOT EXISTS "+
        "(ID INTEGER PRIMARY KEY AUTOINCREMENT, ref TEXT, commune TEXT,"+
        " pepineriste TEXT, annee INTEGER)")
    },[]);
          
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE beneficiaire_rbm IF NOT EXISTS "+
            "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_reboisement INTEGER"+
            "village TEXT, nom_prenom TEXT, surnom TEXT, h_f TEXT, annee_naissance INTEGER cin TEXT,"+
            "statut_menage TEXT, code_menage TEXT, respon_niveau_comt TEXT)"
        )
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE offert_membre_rbm IF NOT EXISTS "+
            "id INTEGER PRIMARY KEY AUTOINCREMENT,id_membre INTEGER"+
            "designation TEXT, quantite REAL"
        )
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE offert_ IF NOT EXISTS "+
                "id INTEGER PRIMARY KEY AUTOINCREMENT,id_coge INTEGER"+
                "designation TEXT, quantite REAL"
        )
    },[]);
}
