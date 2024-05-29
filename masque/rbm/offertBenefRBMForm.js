import React, { useState} from 'react';
import { Button,  View, Text,Pressable,TextInput } from 'react-native';
import { FormStyles } from '../../styles/global';
import Card from '../../shared/card';
import { SelectList } from 'react-native-dropdown-select-list';

export default function OffertBenefRBMForm({ passOffert }) {
  const [selectedCategorie, setSelectedCategorie] = useState(passOffert.dataPass.initValue.categorie);
  const lstCate = [
    {key: 'Arbre fruitier', value: 'arbre fruitier'},
    {key: 'Arbres à usages multiples', value: 'Arbres à usages multiples'},
    ]
  
  const [form, setForm] = React.useState(passOffert.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true); 
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };
  const submitForm = () => {
    form.categorie = selectedCategorie
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    passOffert.add(form);
    setForm(passOffert.dataPass.initValue)
    setSelectedCategorie("")
  };
  return (
 
    <View style={FormStyles.container}> 
    <Card style={FormStyles.card}>
    <Text style={FormStyles.paragraph}>Saisie dotation bénéficiaire RBM </Text>
    </Card>
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>
    <Text style={FormStyles.label}>Type</Text>
        <SelectList   data = {lstCate}  setSelected = {setSelectedCategorie}
                      defaultOption = {{key:selectedCategorie,value:selectedCategorie}}
                      value={selectedCategorie}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
    
    <View>
      <Text style={FormStyles.label}>Designation</Text>
      <TextInput  style={FormStyles.input}
                  name="designtion"
                  onChangeText={(value) => handleForm('designation', value)}
                  value = {form.designation}/>
   </View> 
   <View>
      <Text style={FormStyles.label}>Nombre</Text>
      <TextInput  style={FormStyles.input}
                  name="quantite"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('quantite', value)}
                  value = {form.quantite}/>
   </View> 
   </Card>
   <Text style={FormStyles.label}></Text>
   <Card style={FormStyles.card}>
   <View>
      <Pressable style={FormStyles.buttonContainer}
                 onPress={submitForm} >
                  <Text style={FormStyles.text}>{passOffert.dataPass.mode}</Text>
       </Pressable>
   </View>
   </Card>
</View>
  );
}