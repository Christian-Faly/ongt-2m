export const CreerTableMPV = (db) =>{
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE mpv IF NOT EXISTS "+
          "(ID INTEGER PRIMARY KEY AUTOINCREMENT, ref TEXT, commune TEXT, groupement TEXT "+
          "speculation TEXT, type_speculation TEXT, date_mise_place TEXT)")
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE membre_mpv IF NOT EXISTS "+
            "(id INTEGER PRIMARY KEY AUTOINCREMENT,id_mpv INTEGER"+
            "village TEXT, nom_prenom TEXT, surnom TEXT, h_f TEXT, annee_naissance INTEGER cin TEXT,"+
            "statut_menage TEXT, code_menage TEXT, respon_niveau_grpt, respon_niveau__comt TEXT)"
        )
    },[]);

    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE offert_mpv IF NOT EXISTS "+
                "id INTEGER PRIMARY KEY AUTOINCREMENT,id_membre INTEGER"+
                "designation TEXT, quantite REAL"
        )
    },[]);
}
