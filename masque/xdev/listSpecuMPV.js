const sqlCreateSpecMPV = "CREATE TABLE IF NOT EXISTS speculationMPV"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, typa TEXT)"
  
const sqlSelectSpecMPV = "SELECT * FROM speculationMPV"
const sqlInsertSpecMPV = 
  "INSERT INTO speculationMPV"+
  "(description,typa)"+
  " VALUES "+
  "('Caprin et Ovin','Elevage'),"+
  "('Canard','Elevage'),"+
  "('Peche','Peche'),"+
  "('Poulet gasy','Elevage'),"+
  "('Cuma','Agriculture'),"+
  "('Gargote','Non Agricole')"

  export {sqlCreateSpecMPV,sqlSelectSpecMPV,sqlInsertSpecMPV} 