import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable} from 'react-native';
import {  FormStyles} from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

export default function MembreCEPForm({ passMembre}) {
  
  let toutFkt =[]
  passMembre.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  let lstFkt =  [...toutFkt].filter(fkt => fkt.key == passMembre.dataPass.initValue.ncommune)
  
  const [selectedFokontany, setSelectedFokontany] = useState(passMembre.dataPass.initValue.fokontany);
  passMembre.dataPass.initValue['beneficiaire'] = ''
  let toutBenef =[]
  passMembre.dataPass.lstListBenef.forEach((item,i) => {
    if ((item.fokontany!=="")&&(item.nom_prenom!==""))
      toutBenef = [...toutBenef,{key:item.fokontany , value:item.nom_prenom}]
  });
  // console.log('toutBenef',toutBenef)
  let lstBenef = []
  
  const [selectedListBenef, setSelectedListBenef] = useState(passMembre.dataPass.initValue.nom_prenom);
  
  const [selectedGenre, setSelectedGenre] = useState(passMembre.dataPass.initValue.h_f);
  
  const lstGenre = [
    {key: 'Homme', value: 'Homme'},
    {key: 'Femme', value: 'Femme'}
  ];
  
  const  [selectedResponsbilite,setSelectedResponsbilite] = useState(passMembre.dataPass.initValue.respon_niveau_grpt)
  
  const lstResponsbilite = [
    {key:'Leader',value:'Leader'},
    {key:'Simple membre',value:'Simple membre'}
  ];

  const [selectedSituMatri, setSelectedSituMatri] = useState(passMembre.dataPass.initValue.statut_menage);
  const lstSituMatri = [
    {key: 'Celibataire', value: 'Celibataire'},
    {key: 'Marie', value: 'Marie'},
    {key: 'Veuf(Veuve)', value: 'Veuf(Veuve)'},
    {key: 'Divorce', value: 'Divorce'}
    
  ];

  Object.entries(passMembre.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passMembre.dataPass.initValue[key])==="number") 
       passMembre.dataPass.initValue[key] = passMembre.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });

  passMembre.dataPass.initValue["beneficiaire"] = ""
  
  const [form, setForm] = React.useState(passMembre.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitForm = () => {
    console.log("form",form)
    form.fokontany = selectedFokontany
    form.ncommune = passMembre.dataPass.initValue.ncommune
    form.nom = selectedListBenef
    form.h_f = selectedGenre
    form.statut_menage = selectedSituMatri
    form.respon_niveau_grpt = selectedResponsbilite
    console.log("form.nom",form.nom)
    if ((form.nom===undefined)||(form.nom==="")){
      console.log("Ajout nv benef",form.beneficiaire)
      
      form["nom"] = form.beneficiaire
      let nvBenef = {}
      nvBenef["ncommune"] = form.ncommune
      nvBenef["fokontany"] = form.fokontany
      nvBenef["nom_prenom"] = form.beneficiaire
      passMembre.addBenef(nvBenef)
    }
    
    delete form.beneficiaire

    console.log('submit this form =>', JSON.stringify(form, false, 2));
    
    if(passMembre.dataPass.mode==='Ajouter'){
      setSelectedFokontany("")
      setSelectedGenre("")
      setSelectedListBenef("")
      setSelectedResponsbilite("")
      setSelectedSituMatri("")
     passMembre.add(form)
      setForm(passMembre.dataPass.initValue)
    }
    else{
     passMembre.update(form)
    }
    passMembre.dataPass.setSaisieMembre(false)
  };

  function filterBenef(fokontany){
    try{
      lstBenef =  [...toutBenef].filter(benef => benef.key == fokontany)
      console.log('listBenef',lstBenef)
    }catch(err){
      console.log(err)
    }
  }
  console.log('sss',passMembre.dataPass.typa) 
  return (
   <View style={FormStyles.container}> 
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
      <Text style={FormStyles.paragraph}>{'Saisie membre CEP'+passMembre.dataPass.titre}</Text>
      </Card>
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
      <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Fokontany  de résidence membre</Text>
          <SelectList data = {lstFkt}  setSelected = {setSelectedFokontany}
                      save='value'
                      defaultOption = {{key:selectedFokontany,value:selectedFokontany}}
                      value={selectedFokontany}
                      onSelect={filterBenef(selectedFokontany)}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
      <Text style={styles.label}>Village de résidence membre</Text>
        <TextInput  style={styles.input}
                    id="village"
                    name="village"
                    onChangeText={(value) => handleForm('village', value)}
                    value = {form.village}/>
        <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Nom et prénom</Text>
          <SelectList data = {lstBenef}  setSelected = {setSelectedListBenef}
                      save='value'
                      defaultOption = {{key:selectedListBenef,value:selectedListBenef}}
                      value={selectedListBenef}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          <TextInput  style={styles.input}
                      id="beneficiaire"
                      name="beneficiaire"
                      onChangeText={(value) => handleForm('beneficiaire', value)}
                      value = {form.beneficiaire}
                      placeholder='Nouveau bénéficiaire'
        />
      </View>
        <Text style={styles.label}>Surnom</Text>
        <TextInput  style={styles.input}
                    id="surnom"
                    name="surnom"
                    onChangeText={(value) => handleForm('surnom', value)}
                    value = {form.surnom}/>
          <Text style={styles.label}>Genre</Text>
          <SelectList data = {lstGenre}  setSelected = {setSelectedGenre}
                      defaultOption = {{key:selectedGenre,value:selectedGenre}}
                      value={selectedGenre}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
        <Text style={styles.label}>Annee de naissance</Text>
          <TextInput  style={styles.input}
                      keyboardType="numeric"
                      id="annee_naissance"
                      placeholder='yyyy'
                      name="annee_naissance"
                      onChangeText={(value) => handleForm('annee_naissance', value)}
                      value = {form.annee_naissance}/>

        <Text style={styles.label}>C.I.N</Text>
         <TextInput  style={styles.input}
                      keyboardType="numeric"
                      id="cin"
                      name="cin"
                      onChangeText={(value) => handleForm('cin', value)}
                      value = {form.cin}/>

          <Text style={styles.label}>Situation matrimoniale</Text>
          <SelectList data = {lstSituMatri}  setSelected = {setSelectedSituMatri}
                      defaultOption = {{key:selectedSituMatri,value:selectedSituMatri}}
                      value={selectedSituMatri}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          {passMembre.dataPass.typa==="Apiculture"
        ? <Text style={FormStyles.label}>Nombre de ruches</Text>
            :(passMembre.dataPass.typa==="Porciculture"
              ?<Text style={FormStyles.label}>Nombre de cheptel</Text>
              :<Text style={FormStyles.label}>Superficie de replication</Text>)
        }
        <TextInput  style={styles.input}
                    keyboardType="numeric"
                    id="surface"
                    name="surface"
                    onChangeText={(value) => handleForm('surface', value)}
                    value = {form.surface}
                    placeholder='valeur en hectare (ha)'
        />
        <View>
          <Text style={styles.label}>Responsabilite au niveau du groupement</Text>
          <SelectList data = {lstResponsbilite}  setSelected = {setSelectedResponsbilite}
                      defaultOption = {{key:selectedResponsbilite,value:selectedResponsbilite}}
                      value={selectedResponsbilite}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          </View>
      </Card>
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
        <View style={styles.buttonContainer}>
         
        <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passMembre.dataPass.mode}</Text>
        </Pressable>
        </View>
      </Card>
      
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    padding: 20,
    marginHorizontal: 20,
    justifyContent: 'center',

  },
  label: {
    fontSize: 12,
    marginTop: 5,
    zIndex: 2, elevation:50,
  },
  input: {
    height: 40,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    // zIndex: 3, elevation:50
  },
  buttonContainer: {
    marginTop: 10,
  }
  ,
  item: {
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 48,
    width: 200,
    borderRadius: 8,
  },
});
