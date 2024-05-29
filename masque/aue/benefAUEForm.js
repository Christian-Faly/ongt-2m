import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable} from 'react-native';
import Constants from 'expo-constants';
import { FormStyles} from '../../styles/global';


import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';


export default function BenefAUEForm({ passBenef}) {
  let toutFkt =[]
  passBenef.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  
  const [selectedFokontany, setSelectedFokontany] = useState(passBenef.dataPass.initValue.fokontany);
  let lstFkt =  [...toutFkt].filter(fkt => fkt.key == passBenef.dataPass.initValue.ncommune)
  
  let toutBenef =[]
  passBenef.dataPass.lstListBenef.forEach((item,i) => {
    if ((item.fokontany!=="")&&(item.nom_prenom!==""))
      toutBenef = [...toutBenef,{key:item.fokontany , value:item.nom_prenom}]
  });
  let lstBenef = []
  
  const [selectedListBenef, setSelectedListBenef] = useState(passBenef.dataPass.initValue.nom);
  
  const [selectedGenre, setSelectedGenre] = useState(passBenef.dataPass.initValue.h_f);
  const lstGenre = [
    {key: 'Homme', value: 'Homme'},
    {key: 'Femmme', value: 'Femme'}
  ];
  
  const [selectedSituMatri, setSelectedSituMatri] = useState(passBenef.dataPass.initValue.statut_menage);
  const lstSituMatri = [
    {key: 'Celibataire', value: 'Celibataire'},
    {key: 'Marie', value: 'Marie'},
    {key: 'Veuf(Veuve)', value: 'Veuf(Veuve)'},
    {key: 'Divorce', value: 'Divorce'}]
    
    const [selectedTypeFonction, setselectedTypeFonction] = useState(passBenef.dataPass.initValue.statut_menage);
    const lstTypeFonction = [
        {key: 'Membre de bureau', value: 'Membre de bureau'},
        {key: 'Controlaire', value: 'Controlaire'},
        {key: 'Equipe technique', value: 'Equipe technique'},
        {key: 'Vaomiera', value: 'Vaomiera'},
        {key: 'Autres', value: 'Autres'},
    ];
  
    const [selectedFonction, setselectedFonction] = useState(passBenef.dataPass.initValue.statut_menage);
    const toutFonction = [
      {key: 'Membre de bureau', value: 'President'},
      {key: 'Membre de bureau', value: 'Vice President'},
      {key: 'Membre de bureau', value: 'Secretaire'},
      {key: 'Membre de bureau', value: 'Trésorier'},
      {key: 'Membre de bureau', value: 'Conseiller'},

      {key: 'Equipe technique', value: 'Chef périmètre'},
      {key: 'Equipe technique', value: 'Garde vanne'},
      {key: 'Equipe technique', value: 'Police de réseau'},
      {key: 'Equipe technique', value: 'Chef secteur'},
      {key: 'Equipe technique', value: 'Délégué de prise'},
    
      // {key: 'Vaomiera', value: 'Dina'},
      // {key: 'Vaomiera', value: 'Tontolo iainana'},
      // {key: 'Vaomiera', value: 'Serasera'},
      // {key: 'Vaomiera', value: 'Délégué de villllage'},
      // {key: 'Vaomiera', value: 'Délégué de prise'},

      {key: 'Autres', value: 'Délégué de village'},
      {key: 'Autres', value: 'Simple membre'},
  ];
  
  let  lstFonction = []
  
    const [selectedModeFaireValloir, setSelectedModeFaireValloir] = useState(passBenef.dataPass.initValue.statut_menage);
    const lstModeFaireValloir = [
        {key: 'Propriétaire', value: 'Propriétaire'},
        {key: 'Locataire', value: 'Locataire'},
        {key: 'Métayage', value: 'Métayage'},
        
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
    form.ncommune = passBenef.dataPass.initValue.ncommune
    form.nom = selectedListBenef
    form.h_f = selectedGenre
    form.statut_menage = selectedSituMatri
    form.type_fonction = selectedTypeFonction
    form.fonction = selectedFonction
    form.mode_faire_valoir = selectedFonction
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    if ((form.nom===undefined)||(form.nom==="")){
      console.log("Ajout nv benef",form.beneficiaire)
      
      form["nom"] = form.beneficiaire
      let nvBenef = {}
      nvBenef["ncommune"] = form.ncommune
      nvBenef["fokontany"] = form.fokontany
      nvBenef["nom_prenom"] = form.beneficiaire
      passBenef.addBenef(nvBenef)
    }
    
    delete form.beneficiaire

    if(passBenef.dataPass.mode==='Ajouter'){
      setSelectedFokontany("")
      setSelectedGenre("")
      setSelectedModeFaireValloir("")
      setSelectedSituMatri("")
      setselectedFonction("")
      setselectedTypeFonction("")
    }
    
    delete form.beneficiaire

    console.log('submit this form =>', JSON.stringify(form, false, 2));
    
    if(passBenef.dataPass.mode==='Ajouter'){
    
      // setSelectedListBenef("")
    
      passBenef.add(form)
      setForm(passBenef.dataPass.initValue)
    }
    else{
      passBenef.update(form)
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
      lstBenef =  [...toutFkt].filter(benef => benef.key == fokontany)
    }catch(err){
      console.log(err)
    }
  }

  // function filterFonction(typa){
  //   lstFonction = [...toutFonction].filter((fonction)=>fonction.key = typa)
  // }
  
  return (
   <View style={FormStyles.container}> 
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
        <Text style={FormStyles.paragraph}>Saisie bénéficiaire AUE </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
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
          <Text style={FormStyles.label}>surnom</Text>
          <TextInput  style={styles.input}
                    id="surnom"
                    name="surnom"
                    onChangeText={(value) => handleForm('surnom', value)}
                    value = {form.surnom}
          />
  
          <Text style={FormStyles.label}>Genre</Text>
          <SelectList data = {lstGenre}  setSelected = {setSelectedGenre}
                      defaultOption = {{key:selectedGenre,value:selectedGenre}}
                      value={selectedGenre}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          <View>
            <Text style={FormStyles.label}>Annee de naissance</Text>
            <TextInput
                  style={FormStyles.input}
                  name="annee_naissance"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('annee_naissance', value)}
                  value = {form.annee_naissance}/>
          </View>
        <View>
          <Text style={FormStyles.label}>C.I.N</Text>
           <TextInput
                  style={FormStyles.input}
                  name="cin"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('cin', value)}
                  value = {form.cin}/>
        </View>
        <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Situation matrimoniale</Text>
          <SelectList data = {lstSituMatri}  setSelected = {setSelectedSituMatri}
                      defaultOption = {{key:selectedSituMatri,value:selectedSituMatri}}
                      save = "value"
                      value ={selectedSituMatri}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
        </View>
        <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Mode faire valoir</Text>
          <SelectList data = {lstModeFaireValloir}  setSelected = {setSelectedModeFaireValloir}
                      save = "value"
                      defaultOption = {{key:selectedModeFaireValloir,value:selectedModeFaireValloir}}
                      value={selectedModeFaireValloir}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
        </View>
        <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Fonction</Text>
          <SelectList data = {toutFonction}  setSelected = {setselectedFonction}
                      save = "value"
                      defaultOption = {{key:selectedFonction,value:selectedFonction}}
                      value={selectedFonction}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
        </View>
       
        
        <View>
          <Text style={FormStyles.label}>Surface</Text>
            <TextInput
                  placeholder='valeur en hectare (ha)'
                  style={FormStyles.input}
                  name="surface"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('surface', value)}
                  value = {form.surface}/>
        </View>
        
      
        </Card>
        <Text style={FormStyles.label}></Text>
        <Card style={FormStyles.card}>
          <View >
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
