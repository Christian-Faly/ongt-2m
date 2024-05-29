import React, { useState} from 'react';
import { Button,  View, Text ,Pressable,TextInput} from 'react-native';
import { FormStyles } from '../../styles/global';
import Card from '../../shared/card';
import { SelectList } from 'react-native-dropdown-select-list';


export default function OffertFederationForm({ passOffert }) {
   
  const [form, setForm] = React.useState(passOffert.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitForm = () => {
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    if(passOffert.dataPass.mode==='Ajouter'){
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
    <Text style={FormStyles.paragraph}>Saise dotation Federation/Union </Text>
    </Card>
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>
    <Text></Text>
    <View>
      <Text style={FormStyles.label}>Designation</Text>
      <TextInput style={FormStyles.input}
                 name="designation"
                 onChangeText={(value) => handleForm('designation', value)}
                 value = {form.designation}/>
    </View> 
    <View>
      <Text style={FormStyles.label}>Quantite</Text>
      <TextInput style={FormStyles.input}
                 name="quantite"
                 keyboardType="numeric"
                 onChangeText={(value) => handleForm('quantite', value)}
                 value = {form.quantite}/>
    </View> 
    <Text></Text>
    <Text></Text>
    <Text></Text>
    </Card>  
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>  
      <View >
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passOffert.dataPass.mode}</Text>
       </Pressable>
  
      </View>
    </Card>  
 
    </View>
  );
}