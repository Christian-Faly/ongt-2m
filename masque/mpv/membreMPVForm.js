import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable} from 'react-native';
import Constants from 'expo-constants';
import { FormStyles } from '../../styles/global';

import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

export default function MembreMPVForm({ passMembre}) {
  
  let toutFkt =[]
  passMembre.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  let lstFkt =  [...toutFkt].filter(fkt => fkt.key == passMembre.dataPass.initValue.ncommune)
  // let lstFkt = []
  const [selectedFokontany, setSelectedFokontany] = useState(passMembre.dataPass.initValue.fokontany);

  let toutBenef =[]
  passMembre.dataPass.lstListBenef.forEach((item,i) => {
    if ((item.fokontany!=="")&&(item.nom_prenom!==""))
      toutBenef = [...toutBenef,{key:item.fokontany , value:item.nom_prenom}]
  });
  let lstBenef = []
  const [selectedListBenef, setSelectedListBenef] = useState(passMembre.dataPass.initValue.nom_prenom);

   const [selectedChef_menage, setSelectedChef_menage] = useState(passMembre.dataPass.initValue.chef_menage);
  const lstChef_menage = [
    {key: 'Oui', value: 'Oui'},
    {key: 'Non', value: 'Non'},
  ];

  const [selectedGenre, setSelectedGenre] = useState(passMembre.dataPass.initValue.h_f);
  const lstGenre = [
    {key: 'Homme', value: 'Homme'},
    {key: 'Femmme', value: 'Femme'}
  ];
  
  const [selectedTypeMP, setSelectedTypeMP] = useState(passMembre.dataPass.initValue.type_mp);
  const lstTypeMP = [
    {key: 'Agriculture', value: 'Agriculture'},
    {key: 'Elevage', value: 'Elevage'}
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
    console.log(form)
    form.fokontany = selectedFokontany
    form.ncommune = passMembre.dataPass.initValue.ncommune
    form.h_f = selectedGenre
    form.type_mp = selectedTypeMP
    form.ncommune = form.ncommune.substring(form.ncommune.length-6,form.ncommune.length-1)
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
      // setSelectedCommune('')
      setSelectedFokontany('')
      setSelectedGenre('')
      setSelectedChef_menage('')
      setSelectedTypeMP('')
      
      passMembre.add(form)
      setForm(passMembre.dataPass.initValue)
    }
    else{
      passMembre.update(form)
    }
  };

  const toNomber = (st) => {
    if (st==='') 
      ret = 0
    else
      ret = parseInt(st,10)
  } 
  function filterBenef(fokontany){
    try{
      lstBenef =  [...toutBenef].filter(benef => benef.key == fokontany)
    }catch(err){
      console.log(err)
    }
  }
  return (
   <View style={FormStyles.container}> 
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
      <Text style={FormStyles.paragraph}>{'Saisie membre '+ passMembre.dataPass.titre }</Text>
      </Card>
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
      <Text style={FormStyles.label}>Fokontany</Text>
          <SelectList data = {lstFkt}  setSelected = {setSelectedFokontany}
                      save='value'
                      defaultOption = {{key:selectedFokontany,value:selectedFokontany}}
                      value={selectedFokontany}
                      onSelect={filterBenef(selectedFokontany)}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>  
      <Text style={styles.label}>Village</Text>
      <TextInput
          style={styles.input}
          id="village"
          name="village"
          onChangeText={(value) => handleForm('village', value)}
          value = {form.village}
        />
      
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
        
        <Text style={styles.label}>surnom</Text>
        <TextInput style={styles.input}
                   id="surnom"
                   name="surnom"
                   onChangeText={(value) => handleForm('surnom', value)}
                   value = {form.surnom}/>

          <View style={{elevation:50,zIndex: 4, position: 'relative'}}>
              <Text style={FormStyles.label}>Chef de menage</Text>
              <SelectList data = {lstChef_menage}  setSelected = {setSelectedChef_menage}
                          defaultOption = {{key:selectedChef_menage,value:selectedChef_menage}}
                          value={selectedChef_menage}
                          placeholder='-------------'
                          SelectedTextStyle={FormStyles.SelectedTextStyle}
                          inputSearchStyle={FormStyles.inputSearchStyle}/>
         </View>  
         <Text></Text>
         <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={styles.label}>Genre</Text>
          <SelectList data = {lstGenre}  setSelected = {setSelectedGenre}
                      defaultOption = {{key:selectedGenre,value:selectedGenre}}
                      value={selectedGenre}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>    
        </View>
        
        <Text style={styles.label}></Text>
        <Text style={styles.label}>Annee de naissance</Text>
        <TextInput  style={styles.input}
                      keyboardType="numeric"
                      id="annee_naissance"
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

       <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={styles.label}>Type MP</Text>
          <Text></Text>
          <SelectList data = {lstTypeMP}  setSelected = {setSelectedTypeMP}
                      defaultOption = {{key:selectedTypeMP,value:selectedTypeMP}}
                      value={selectedTypeMP}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
       </View>

      </Card>
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
        <View >
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
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
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
