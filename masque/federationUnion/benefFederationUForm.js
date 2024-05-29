import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable} from 'react-native';
import Constants from 'expo-constants';
import { FormStyles} from '../../styles/global';


import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';


export default function BenefFederationUForm({ passBenef}) {
  let toutFkt =[]
  passBenef.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  
  const [selectedFokontany, setSelectedFokontany] = useState(passBenef.dataPass.initValue.fokontany);
  let lstFkt =  [...toutFkt].filter(fkt => fkt.key == passBenef.dataPass.initValue.ncommune)
  
  let toutBenef =[]
  passBenef.dataPass.lstListBenef.forEach((item,i) => {
    toutBenef = [...toutBenef,{key:item.fokontany , value:item.nom}]
  });
  let lstBenef = []
  
  const [selectedListBenef, setSelectedListBenef] = useState(passBenef.dataPass.initValue.nom);
  
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
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    if(passBenef.dataPass.mode==='Ajouter'){
      setSelectedFokontany("")
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
  return (
   <View style={FormStyles.container}> 
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
        <Text style={FormStyles.paragraph}>Saisie bénéficiaire FederationU </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
        <Card style={FormStyles.card}>
        <Text style={styles.label}>Nom AUE </Text>
        <View>
        <TextInput  style={styles.input}
                    id="nom_aue"
                    name="nom_aue"
                    onChangeText={(value) => handleForm('nom_aue', value)}
                    value = {form.nom_aue}/>
        </View>
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
       <View>
          <Text style={FormStyles.label}>Surface total</Text>
            <TextInput
                  placeholder='valeur en hectare (ha)'
                  style={FormStyles.input}
                  name="surface_total"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('surface_total', value)}
                  value = {form.surface_total}/>
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
