
const sqlCreateOffert = "CREATE TABLE IF NOT EXISTS type_offert"+
"(id INTEGER PRIMARY KEY AUTOINCREMENT,"+
"typa TEXT,"+
"designation TEXT,"+
"unite TEXT,"+
"agriculture TEXT,"+
"apiculture TEXT,"+
"porciculture TEXT)"

const sqlInsertOffert = 
    "INSERT INTO type_offert "+
    "(typa,designation,unite,agriculture,apiculture,porciculture)"+
    " VALUES "+
    "('Materiel Agricole','charrue','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','herse','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','sarcleuse','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','rayonneur','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','pulvérisateur','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','arrosoirs','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','rateaux','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','brouette','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','Angady','Nb','Oui','Non','Non'),"+
    "('Materiel Agricole','Pelle','Nb','Oui','Non','Non'),"+
    "('Semences','Semences','kg','Oui','Non','Non'),"+
    "('Engrais','Engrais','kg','Oui','Non','Non'),"+
    "('Engrais','Urée','kg','Oui','Non','Non'),"+
    "('Engrais','NPK','kg','Oui','Non','Non'),"+
    "('Engrais','Organique','kg','Oui','Non','Non'),"+
    "('Engrais','Compost','kg','Oui','Non','Non'),"+
    "('Engrais','DAP','kg','Oui','Non','Non'),"+
    "('Engrais','Guanomad','kg','Oui','Non','Non'),"+
    "('Insecticide','Insecticide ','L','Oui','Non','Non'),"+
    "('Insecticide','insecticide terricole ','kg','Oui','Non','Non'),"+
    "('Insecticide','Herbicide','L','Oui','Non','Non'),"+
    "('Insecticide','Fongicide','kg','Oui','Non','Non'),"+
    "('Equipément','ruches complètes','Nb','Non','Oui','Non'),"+
    "('Equipément','Cire gauffré','Nb','Non','Oui','Non'),"+
    "('Equipément','Fil inox','Nb','Non','Oui','Non'),"+
    "('Equipément','Enfumoir','Nb','Non','Oui','Non'),"+
    "('Equipément','Grille à reine','Nb','Non','Oui','Non'),"+
    "('Equipément','Case à reine','Nb','Non','Oui','Non'),"+
    "('Equipément','Attire essaim','Nb','Non','Oui','Non'),"+
    "('Equipément','Broche à abeilles','Nb','Non','Oui','Non'),"+
    "('Equipément','Lève cadre','Nb','Non','Oui','Non'),"+
    "('Cheptel','porcelets','tête','Non','Non','Oui'),"+
    "('Cheptel','géniteurs','tête','Non','Non','Oui'),"+
    "('Cheptel','porcelets produits','tête','Non','Non','Oui')"
    
const sqlSelectOffert = "SELECT * FROM type_offert"

export {sqlCreateOffert, sqlInsertOffert, sqlSelectOffert}