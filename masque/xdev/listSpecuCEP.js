    
const sqlCreateSpecCEP ="CREATE TABLE IF NOT EXISTS speculationCEP"+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, typa TEXT)"
  
const sqlSelectSpecCEP = "SELECT * FROM speculationCEP"

const sqlInsertSpecCEP = 
    "INSERT INTO speculationCEP(description,typa)"+
    " VALUES "+
    "('Riz','Agriculture'),"+
    "('Apiculture','Elevage'),"+
    "('Mais','Agriculture'),"+
    "('Porciculture','Elevage'),"+
    "('Black eyes','Agriculture'),"+
    "('Agro Ecologie','Agriculture'),"+
    "('Pois du cap','Agriculture'),"+
    "('Arachide','Agriculture'),"+
    "('Haricot','Agriculture'),"+
    "('Vigna','Agriculture')"

export {sqlCreateSpecCEP,sqlSelectSpecCEP,sqlInsertSpecCEP}