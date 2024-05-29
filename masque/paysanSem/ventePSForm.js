import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable} from 'react-native';
import Constants from 'expo-constants';
import { FormStyles} from '../../styles/global';


import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

// BenefAUE == VentePP
export default function VentePPForm({ pass}) {
  const [selectedPeriode, setSelectedPeriode] = useState(pass.dataPass.initValue.periode);
  const lstPeriode = [
    {key: 'Janvier', value: 'Janvier'},
    {key: 'Février', value: 'Février'},
    {key: 'Mars', value: 'Mars'},
    {key: 'Avril', value: 'Avril'},
    {key: 'Mai', value: 'Mai'},
    {key: 'Juin', value: 'Juin'},
    {key: 'Juillet', value: 'Juillet'},
    {key: 'Août', value: 'Août'},
    {key: 'Septembre', value: 'Septembre'},
    {key: 'Octobre', value: 'Octobre'},
    {key: 'Novembre', value: 'Novembre'},
    {key: 'décembre', value: 'Décembre'},
  ];
  
  Object.entries(pass.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(pass.dataPass.initValue[key])==="number") 
    pass.dataPass.initValue[key] = pass.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
  
  const [form, setForm] = React.useState(pass.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitForm = () => {
    form.periode = selectedPeriode
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    if(pass.dataPass.mode==='Ajouter'){
      pass.add(form)
      setSelectedPeriode()
      setForm(pass.dataPass.initValue)
    }
    else{
      pass.update(form)
    }
  };

  
  return (
   <View style={FormStyles.container}> 
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
        <Text style={FormStyles.paragraph}>Saisie Vente PPS </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
        <Card style={FormStyles.card}>
        <View>
            <Text style={FormStyles.label}>Année</Text>
            <TextInput
                  style={FormStyles.input}
                  name="annee"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('annee', value)}
                  value = {form.annee}/>
          </View>
        <Text style={FormStyles.label}>Période</Text>
          <SelectList data = {lstPeriode}  setSelected = {setSelectedPeriode}
                      defaultOption = {{key:selectedPeriode,value:selectedPeriode}}
                      value={selectedPeriode}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          <Text style={FormStyles.label}>Essence vendue</Text>
          <TextInput  style={styles.input}
                    id="essence_vendue"
                    name="essence_vendue"
                    onChangeText={(value) => handleForm('essence_vendue', value)}
                    value = {form.essence_vendue}
          />
          <View>
            <Text style={FormStyles.label}>Quantité</Text>
            <TextInput
                  style={FormStyles.input}
                  name="quantite"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('quantite', value)}
                  value = {form.quantite}/>
          </View>
          <View>
            <Text style={FormStyles.label}>Prix unitaire</Text>
           <  TextInput
                  style={FormStyles.input}
                  name="pu"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('pu', value)}
                  value = {form.pu}/>
        </View>
        <View>
          <Text style={FormStyles.label}>Destinataire</Text>
            <TextInput
                  style={FormStyles.input}
                  name="destinataire"
                  onChangeText={(value) => handleForm('destinataire', value)}
                  value = {form.destinataire}/>
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
