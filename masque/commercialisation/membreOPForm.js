import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable} from 'react-native';
import Constants from 'expo-constants';
import { FormStyles} from '../../styles/global';


import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

// BenefAUE == ExploitationPP
export default function ExploitationPPForm({ pass}) {
    
  const [erreur, setErreur] = useState(false);
  const [selectedSexe, setSelectedSexe] = useState(pass.dataPass.initValue.sexe);
  const lstSexe = [
    {key: 'Homme', value: 'Homme'},
    {key: 'Femme', value: 'Femme'},
   ];
  
   const [selectedLettre, setSelectedLettre] = useState(pass.dataPass.initValue.lettree_on);
   const lstLettre = [
     {key: 'Oui', value: 'Oui'},
     {key: 'Non', value: 'Non'},
  ];
  
  const [selectedNiveauEtude, setSelectedNiveauEtude] = useState(pass.dataPass.initValue.niveau_etude);
  const lstNiveauEtude = [
    {key: 'Primaire', value: 'Primaire'},
    {key: 'Secondaire', value: 'Secondaire'},
    {key: 'Lycée', value: 'Lycée'},
    {key: 'Université', value: 'Université'},
 ];
  
 const [selectedFonction, setSelectedFonction] = useState(pass.dataPass.initValue.fonction);
 const lstFonction = [
   {key: 'Président', value: 'Président'},
   {key: 'Vice-président', value: 'Vice-président'},
   {key: 'Trésorier', value: 'Trésorier'},
   {key: 'Conseiller', value: 'Conseiller'},
   {key: 'Secrétaire', value: 'Secrétaire'},
   {key: 'Commissaire au compte', value: 'Commissaire au compte'},
   {key: 'Simple membre', value: 'Simple membre'},
];

const [form, setForm] = React.useState(pass.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitForm = () => {
    if (form.date_entree>''){
      if (isValidDate(form.date_entree)===true)
        form.date_entree = transformDate(form.date_entree)
       else
        setErreur(true) 
    }else
      delete form.date_entree

    if (form.date_sortie>''){
      if (isValidDate(form.date_sortie)===true)
        form.date_sortie = transformDate(form.date_sortie)
      else
        setErreur(true)
      
    }else
      delete form.date_sortie

    if (erreur === false){
      setErreur(false)
      form.sexe = selectedSexe
      form.lettree_on = selectedLettre
      form.niveau_etude = selectedNiveauEtude
      form.fonction = selectedFonction
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(pass.dataPass.mode==='Ajouter'){
        pass.add(form)
        setSelectedSexe('')
        setSelectedLettre('')
        setSelectedNiveauEtude('')
        setSelectedFonction('')
        setForm(pass.dataPass.initValue)
      }
      else{
        pass.update(form)
      }
    }else{
      console.log('not submit');
      setErreur(true)
    }
  };

  function transformDate(date_fr) {
    var temp = date_fr.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    return temp2
  }
  function isValidDate(daty) {
    var temp = daty.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    var d = new Date(temp2);
    console.log(daty)
    console.log(d.getFullYear() , Number(temp[2]),
                d.getMonth() + 1 , Number(temp[1]),
                d.getDate() , Number(temp[0]))
    return (d.getFullYear() == Number(temp[2]))&&(d.getMonth() + 1 == Number(temp[1]))&&(d.getDate() == Number(temp[0]))
  }

  //, superficie_exploitee,periode, essence_produite, quantitee
  return (
   <View style={FormStyles.container}> 
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
        <Text style={FormStyles.paragraph}>Saisie membre OP Commerciale </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
        <Card style={FormStyles.card}>
        
          <Text style={FormStyles.label}>Nom et prénom</Text>
          <TextInput  style={styles.input}
                  
                    id="nom_prenom"
                    name="nom_prenom"
                    onChangeText={(value) => handleForm('nom_prenom', value)}
                    value = {form.nom_prenom}/>
  
          <Text style={FormStyles.label}>Date de naissance</Text>
          <TextInput  style={styles.input}
                    id="annee_naissance"
                    name="annee_naissance"
                    keyboardType="numeric"
                    onChangeText={(value) => handleForm('annee_naissance', value)}
                    value = {form.annee_naissance}/> 

          <Text style={FormStyles.label}>CIN</Text>
          <TextInput  style={styles.input}
                    id="cin"
                    name="cin"
                    keyboardType="numeric"
                    onChangeText={(value) => handleForm('cin', value)}
                    value = {form.cin}/> 

          
          <Text style={FormStyles.label}>Sexe</Text>
          <SelectList data = {lstSexe}  setSelected = {setSelectedSexe}
                      defaultOption = {{key:selectedSexe,value:selectedSexe}}
                      value={selectedSexe}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          
          <Text style={FormStyles.label}>Lettré (oui, non)</Text>
          <SelectList data = {lstLettre}  setSelected = {setSelectedLettre}
                      defaultOption = {{key:selectedLettre,value:selectedLettre}}
                      value={selectedLettre}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          
          <Text style={FormStyles.label}>Niveau d étude</Text>
          <SelectList data = {lstNiveauEtude}  setSelected = {setSelectedNiveauEtude}
                      defaultOption = {{key:selectedNiveauEtude,value:selectedNiveauEtude}}
                      value={selectedNiveauEtude}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          
          <Text style={FormStyles.label}>Fonction</Text>
          <SelectList data = {lstFonction}  setSelected = {setSelectedFonction}
                      defaultOption = {{key:selectedFonction,value:selectedFonction}}
                      value={selectedFonction}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          
          
          <View>
            <Text style={FormStyles.label}>date entrée</Text>
            <TextInput
                  style={FormStyles.input}
                  name="date_entree"
                  keyboardType="numeric"
                  placeholder='JJ-MM-YYYY'
                  onChangeText={(value) => handleForm('date_entree', value)}
                  value = {form.date_entree}/>
          </View>
        <View>
          <Text style={FormStyles.label}>Date sortie</Text>
           <TextInput
                  style={FormStyles.input}
                  name="date_sortie"
                  keyboardType="numeric"
                  placeholder='JJ-MM-YYYY'
                  onChangeText={(value) => handleForm('date_sortie', value)}
                  value = {form.date_sortie}/>
        </View>
        </Card>
        <Text style={FormStyles.label}></Text>
        <Card style={FormStyles.card}>
          <View >
          <Pressable style={FormStyles.buttonContainer}
                          onPress={submitForm} >
                          <Text style={FormStyles.text}>{pass.dataPass.mode}</Text>
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
