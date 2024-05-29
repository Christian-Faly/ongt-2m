import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,Pressable } from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

import DropDownPicker from 'react-native-dropdown-picker'
export default function AUPForm({ passAUP}) {
  const [erreur,setErreur] = useState(false)  
  let lstCom =[]
  passAUP.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passAUP.dataPass.initValue.ncommune){
      passAUP.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(passAUP.dataPass.initValue.ncommune);
  
  let toutFkt =[]
  passAUP.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  // console.log(toutFkt)
  let lstFkt = []
  const [selectedFokontany, setSelectedFokontany] = useState(passAUP.dataPass.initValue.fokontany);
  


  Object.entries(passAUP.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passAUP.dataPass.initValue[key])==="number") 
       passAUP.dataPass.initValue[key] = passAUP.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
  const [form, setForm] = React.useState(passAUP.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  function isValidDate(date) {
    var temp = date.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    var d = new Date(temp2);
    return (d.getFullYear() == Number(temp[2]))&&(d.getMonth() + 1 == Number(temp[1]))&&(d.getDate() == Number(temp[0]))
  }

  function transformDate(date_fr) {
    var temp = date_fr.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    return temp2
  }

  const submitForm = () => {
    form.ncommune = selectedCommune.substring(selectedCommune.length-6,selectedCommune.length-1)
    form.fokontany = selectedFokontany
  
    if ((isValidDate(form.date_recepisse_commune)===true)&&
        (isValidDate(form.date_recepisse_district)===true)&&
        (isValidDate(form.date_creation)===true)){
      setErreur(false)
      form.date_recepisse_district = transformDate(form.date_recepisse_district)
      form.date_recepisse_commune = transformDate(form.date_recepisse_commune)
      console.log('submit');
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passAUP.dataPass.mode==='Ajouter'){
        setSelectedFokontany('') 
        setSelectedCommune('')
        passAUP.add(form)
        setForm(passAUP.dataPass.initValue)
        
      }
      else{
        passAUP.update(form)
      }
      passAUP.dataPass.setSaisieAUP(false)
    }else{
      console.log('not submit');
      setErreur(true)
    }
  };


  const toNomber = (st) => {
    if (st==='') 
      ret = 0
    else
      ret = parseInt(st,10)
  
  };
  function filterFkt(commune){
    try{
        lstFkt =  [...toutFkt].filter(fkt => fkt.key == commune.substring(commune.length-6,commune.length-1))
    }catch(err){
      // console.log(err)
 }
}


  return (
   <View style={FormStyles.container}> 
      <Card style={FormStyles.card}>
      <Text style={FormStyles.paragraph}>Saisie AUP </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
      <View>
        <Text style={FormStyles.label}>Nom du AUP</Text>
        <TextInput  style={FormStyles.input}
                    name="nom_AUP"
                    onChangeText={(value) => handleForm('nom_AUP', value)}
                    value = {form.nom_AUP}/>
      </View>
      <Text style={FormStyles.label}>Date de création</Text>
        <TextInput  style={FormStyles.input}
                    name="date_creation"
                    onChangeText={(value) => handleForm('date_creation', value)}
                    placeholder='JJ-MM-YYYY'
                    value = {form.date_creation}
                    keyboardType="numeric"
                    />
         <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Commune</Text>
          <SelectList data = {lstCom}  setSelected = {setSelectedCommune}
                      save='value'
                      defaultOption = {{key:selectedCommune,value:selectedCommune}}
                      onSelect={filterFkt(selectedCommune)}
                      value={selectedCommune}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>

      <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Fokontany</Text>
          <SelectList data = {lstFkt}  setSelected = {setSelectedFokontany}
                      save='value'
                      defaultOption = {{key:selectedFokontany,value:selectedFokontany}}
                      value={selectedFokontany}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
        <Text style={FormStyles.label}>N° de récépissé District</Text>
        <TextInput  style={FormStyles.input}
                    name="num_recepisse_district"
                    onChangeText={(value) => handleForm('num_recepisse_district', value)}
                    value = {form.num_recepisse_district}
                    keyboardType="numeric"
        />
        <Text style={FormStyles.label}>Date de récépissé District</Text>
        <TextInput  style={FormStyles.input}
                    name="date_recepisse_district"
                    onChangeText={(value) => handleForm('date_recepisse_district', value)}
                    placeholder='JJ-MM-YYYY'
                    value = {form.date_recepisse_district}
                    keyboardType="numeric"
        />
        <Text style={FormStyles.label}>N° de récépissé commune</Text>
        <TextInput  style={FormStyles.input}
                    name="num_recepisse_commune"
                    onChangeText={(value) => handleForm('num_recepisse_commune', value)}
                    value = {form.num_recepisse_commune}
                    keyboardType="numeric"
        />
         <Text style={FormStyles.label}>Date de récépissé commune</Text>
        <TextInput  style={FormStyles.input}
                    name="date_recepisse_commune"
                    onChangeText={(value) => handleForm('date_recepisse_commune', value)}
                    placeholder='JJ-MM-YYYY'
                      value = {form.date_recepisse_commune}
                    keyboardType="numeric"
        />
      </Card>  
      <Text style={styles.box}></Text>
      {erreur===true?<Text style={styles.erreur}>{"L'un des dates: "+form.date_recepisse_district+","+ form.date_recepisse_commune+''+" n'est pas validé"}</Text>:null}
     <Card style={FormStyles.card}>  
      <View >
        
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passAUP.dataPass.mode}</Text>
       </Pressable>
   </View>
    </Card>  
    
  </View>
  
  );
}
const styles = StyleSheet.create({
  erreur: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    textShadowRadius: 6,
    color: 'red',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: { width: 2, height: 2 },
    textShadowColor: 'black',
    textShadowRadius: 6,
    fontSize: 40,
    color: '#22AA44',
  },
  card: {
    padding: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2,
    borderRadius:30,
    marginBottom:-18
    
  },
});

