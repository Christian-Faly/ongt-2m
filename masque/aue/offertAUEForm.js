import React, { useState} from 'react';
import { Button,  View, Text,Pressable ,TextInput} from 'react-native';
import { FormStyles ,styles} from '../../styles/global';
import Card from '../../shared/card';
import { SelectList } from 'react-native-dropdown-select-list';

export default function OffertAUEForm({ passOffert }) {

  // Object.entries(passOffert.dataPass.initValue).forEach(([key, value]) => {
  //     if (typeof(passOffert.dataPass.initValue[key])==="number") 
  //     passOffert.dataPass.initValue[key] = passOffert.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  //   });
   
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

  function filterOffert(cate){
    lstOffert =  [...toutOffert].filter(offert => offert.categorie == cate)
  }  
 
  return (
 
    <View style={FormStyles.container}> 
    <Card style={FormStyles.card}>
    <Text style={FormStyles.paragraph}>{'Saisie dotation membre AUE'} </Text>
    </Card>
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>
       <Text></Text>
      <View style={{elevation:50,zIndex: 4, position: 'relative'}}>
        <Text style={FormStyles.label}>Designation</Text>
        <TextInput
                        style={FormStyles.input}
                        name="designation"
                        onChangeText={(value) => handleForm('designation', value)}
                        value = {form.designation}
          />
      
      </View>
      <Text></Text>
      <View>
      <View>
        <Text style={FormStyles.label}>Quantite</Text>
           <TextInput
                        style={FormStyles.input}
                        name="quantite"
                        keyboardType="numeric"
                        onChangeText={(value) => handleForm('quantite', value)}
                        value = {form.quantite}
          />
      </View> 
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