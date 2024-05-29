import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable} from 'react-native';
import Constants from 'expo-constants';
import { FormStyles } from '../../styles/global';

import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

export default function BenefRBMForm({ passBenef}) {
  let toutFkt =[]
  passBenef.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  let lstFkt =  [...toutFkt].filter(fkt => fkt.key == passBenef.dataPass.initValue.ncommune)
  
  const [selectedFokontany, setSelectedFokontany] = useState(passBenef.dataPass.initValue.fokontany);

  let toutBenef =[]
  passBenef.dataPass.lstListBenef.forEach((item,i) => {
    if ((item.fokontany!=="")&&(item.nom_prenom!==""))
      toutBenef = [...toutBenef,{fokontany:item.fokontany , key:item.nom_prenom, value:item.nom_prenom}]
  });

  let lstBenef = []

  const [selectedListBenef, setSelectedListBenef] = useState(passBenef.dataPass.initValue.nom);
  
  const [selectedGenre, setSelectedGenre] = useState(passBenef.dataPass.initValue.h_f);
  const lstGenre = [
    {key: 'Homme', value: 'Homme'},
    {key: 'Femmme', value: 'Femme'},
  ];
  Object.entries(passBenef.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passBenef.dataPass.initValue[key])==="number") 
    passBenef.dataPass.initValue[key] = passBenef.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
  
  const [form, setForm] = React.useState(passBenef.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitForm = () => {
    form.fokontany = selectedFokontany
    form.h_f = selectedGenre
    form.ncommune = passBenef.dataPass.initValue.ncommune
    if ((form.nom===undefined)||(form.nom==="")){
      console.log("Ajout nv benef",form.beneficiaire)
      form["nom"] = form.beneficiaire
      let nvBenef = {}
      nvBenef["ncommune"] = form.ncommune
      nvBenef["fokontany"] = form.fokontany
      nvBenef["nom_prenom"] = form.beneficiaire
      passBenef.addBeneficiaire(nvBenef)
    }

    delete form.beneficiaire

    if(passBenef.dataPass.mode==='Ajouter'){
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      setSelectedFokontany("")
      setSelectedGenre("")
      setSelectedListBenef("")
      passBenef.add(form)
      setForm(passBenef.dataPass.initValue)
    }
    else{
      passBenef.update(form)
    }
  };

  function filterBenef(fokontany){
    try{
      console.log(toutBenef)
      lstBenef =  [...toutBenef].filter(benef => benef.fokontany == fokontany)
    }catch(err){
      console.log(err)
    }
  }
  return (
   <View style={FormStyles.container}>
    <Text style={styles.label}></Text>
    <Card style={FormStyles.card}>
      <Text style={FormStyles.paragraph}>Saisie bénéficiaire RBM </Text>
    </Card>
    <Text style={styles.label}></Text>
    <Card style={FormStyles.card}>
    <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Fokontany</Text>
          <SelectList data = {lstFkt}  setSelected = {setSelectedFokontany}
                      save='value'
                      defaultOption = {{key:selectedFokontany,value:selectedFokontany}}
                      value={selectedFokontany}
                      onSelect={filterBenef(selectedFokontany)}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
      <Text style={styles.label}>Village</Text>
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
      <Text style={styles.label}>surnom</Text>
      <TextInput  style={styles.input}
                  id="surnom"
                  name="surnom"
                  onChangeText={(value) => handleForm('surnom', value)}
                  value = {form.surnom}/>
      <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
        <Text style={styles.label}>Genre</Text>
        <SelectList data = {lstGenre}  setSelected = {setSelectedGenre}
                    defaultOption = {{key:selectedGenre,value:selectedGenre}}
                    value={selectedGenre}
                    placeholder='-------------'
                    SelectedTextStyle={FormStyles.SelectedTextStyle}
                    inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
      <View>
        <Text style={FormStyles.label}>Annee de naissance</Text>
        <TextInput placeholder='9999'
                   style={FormStyles.input}
                   name="annee_naissance"
                   keyboardType="numeric"
                   onChangeText={(value) => handleForm('annee_naissance', value)}
                   value = {form.annee_naissance}/>
      </View>
      <View>
        <Text style={FormStyles.label}>C.I.N</Text>
        <TextInput style={FormStyles.input}
                   name="cin"
                   keyboardType="numeric"
                   onChangeText={(value) => handleForm('cin', value)}
                   value = {form.cin}/>
     </View>
     </Card>
     <Text style={styles.label}></Text>
     <Card style={FormStyles.card}>
     <View>
      <Pressable style={FormStyles.buttonContainer}
                 onPress={submitForm} >
                          <Text style={FormStyles.text}>{passBenef.dataPass.mode}</Text>
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
