import React, { useState} from 'react';
import { Button,  View, Text,Pressable,TextInput } from 'react-native';
import { FormStyles } from '../../styles/global';
import Card from '../../shared/card';
import { SelectList } from 'react-native-dropdown-select-list';


export default function DotationRbmCOMForm({ passOffert }) {
  const [form, setForm] = React.useState(passOffert.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  const [selectedNomEspece, setSelectedNomEspece] = useState(passOffert.dataPass.initValue.nom_espece);
  const lstNomEspece = [
  
    {key: 'ACACIA', value: 'ACACIA'},
    {key: 'MORINGA', value: 'MORINGA'},
    {key: 'NEEM', value: 'NEEM'},
    {key: 'EUCALYPTUS', value: 'EUCALYPTUS'},
    {key: 'KABOKA', value: 'KABOKA'},
  ];

  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };
  Object.entries(passOffert.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passOffert.dataPass.initValue[key])==="number") 
    passOffert.dataPass.initValue[key] = passOffert.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
  console.log( 'xx',passOffert.dataPass.initValue)
  const submitForm = () => {
    form.nom_espece = selectedNomEspece
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    if(passOffert.dataPass.mode==='Ajouter'){
      setSelectedNomEspece("")
      passOffert.add(form)
      setForm(passOffert.dataPass.initValue)
    }
    else{
      passOffert.update(form)
    }
  };

  const toNomber = (st) => {
    if (st==='') 
      ret = 0
    else
      ret = parseInt(st,10)
  } 
  return (
    <View style={FormStyles.container}> 
    <Card style={FormStyles.card}>
    <Text style={FormStyles.paragraph}>Saisie dotation bénéficiaire  </Text>
    </Card>
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>
    <View>
      <Text style={FormStyles.label}>Nom d'espèce</Text>
      <SelectList data = {lstNomEspece}  setSelected = {setSelectedNomEspece}
                      defaultOption = {{key:selectedNomEspece,value:selectedNomEspece}}
                      value={selectedNomEspece}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
        
    </View>
    <View>
      <Text style={FormStyles.label}>Nombre des jeunes plants mise en terre</Text>
      <TextInput style={FormStyles.input}
                 name="nb_jeune_plant"
                 onChangeText={(value) => handleForm('nb_jeune_plant', value)}
                 value = {form.nb_jeune_plant}
                 keyboardType="numeric"/>
     </View>
    <Text></Text>
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