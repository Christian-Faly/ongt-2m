import React, { useState} from 'react';
import { Button,  View, Text,Pressable,TextInput } from 'react-native';
import { FormStyles ,styles} from '../../styles/global';
import Card from '../../shared/card';
import { SelectList } from 'react-native-dropdown-select-list';

export default function MembreFamilleBenefForm({ passMembreFamille }) {

  const [form, setForm] = React.useState(passMembreFamille.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);

  const [selectedLienFamille, setSelectedLienFamille] = useState(passMembreFamille.dataPass.initValue.lien_parente);
  const lstLienFamille = [
    {key: 'Epouse', value: 'Epouse'},
    {key: 'Fils', value: 'Fils'},
    {key: 'Autres', value: 'Autres'}
  ];
  const [selectedGenre, setSelectedGenre] = useState(passMembreFamille.dataPass.initValue.h_f);
  const lstGenre = [
    {key: 'Homme', value: 'Homme'},
    {key: 'Femme', value: 'Femme'}
  ];
 
  Object.entries(passMembreFamille.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passMembreFamille.dataPass.initValue[key])==="number") 
    passMembreFamille.dataPass.initValue[key] = passMembreFamille.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
 

  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitForm = () => {
    form.lien_parente = selectedLienFamille
    form.h_f = selectedGenre
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    if(passMembreFamille.dataPass.mode==='Ajouter'){
      passMembreFamille.add(form)
      setForm(passMembreFamille.dataPass.initValue)
    }
    else{
      passMembreFamille.update(form)
    }
  };

  const toNomber = (st) => {
    if (st==='') 
      ret = 0
    else
      ret = parseInt(st,10)
  
  };

  
  return (
 
    <View style={FormStyles.container}>
      <Card style={FormStyles.card}>
        <Text style={FormStyles.paragraph}>{'Saisie membre de la famille bénéficiaire '} </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
        <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Lien de parenté avec le bénéficiair</Text>
          <SelectList data = {lstLienFamille}  setSelected = {setSelectedLienFamille}
                      defaultOption = {{key:selectedLienFamille,value:selectedLienFamille}}
                      value={selectedLienFamille}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
      <View>
      <Text style={FormStyles.label}>Nom et prénom</Text>
      <TextInput style={FormStyles.input}
                 name="nom_prenom"
                 onChangeText={(value) => handleForm('nom_prenom', value)}
                 value = {form.nom_prenom}/>
      </View>
      <View>
        <Text style={FormStyles.label}>Surnom</Text>
        <TextInput style={FormStyles.input}
                  name="surnom"
                  onChangeText={(value) => handleForm('surnom', value)}
                  value = {form.surnom}/>
      </View>
      <View>
        <Text style={FormStyles.label}>Genre</Text>
        <SelectList data = {lstGenre}  setSelected = {setSelectedGenre}
                    defaultOption = {{key:selectedGenre,value:selectedGenre}}
                    value={selectedGenre}
                    placeholder='-------------'
                    SelectedTextStyle={FormStyles.SelectedTextStyle}
                    inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
      <View>
        <Text style={FormStyles.label}>Année de naissance</Text>
        <TextInput style={FormStyles.input}
                   name="annee_naissance"
                   keyboardType="numeric"
                   onChangeText={(value) => handleForm('annee_naissance', value)}
                   value = {form.annee_naissance}/>
      </View>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
        <View>
          <Pressable style={FormStyles.buttonContainer}
                     onPress={submitForm} >
                      <Text style={FormStyles.text}>{passMembreFamille.dataPass.mode}</Text>
          </Pressable>
      </View>
      </Card>
   </View>
  );
}