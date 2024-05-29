import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,Pressable } from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

import DropDownPicker from 'react-native-dropdown-picker'
export default function AUEForm({ passAUE}) {
  const [erreur,setErreur] = useState(false)  
  let lstCom =[]
  passAUE.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passAUE.dataPass.initValue.ncommune){
      passAUE.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(passAUE.dataPass.initValue.ncommune);
  
  let toutFkt =[]
  passAUE.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  // console.log(toutFkt)
  let lstFkt = []
  const [selectedFokontany, setSelectedFokontany] = useState(passAUE.dataPass.initValue.fokontany);


  Object.entries(passAUE.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passAUE.dataPass.initValue[key])==="number") 
       passAUE.dataPass.initValue[key] = passAUE.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
  const [form, setForm] = React.useState(passAUE.dataPass.initValue);
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
  
    if ((isValidDate(form.date_creation)===true)&&(isValidDate(form.date_recepisse_district)===true)){
      setErreur(false)
      form.date_creation = transformDate(form.date_creation)
      form.date_recepisse_district = transformDate(form.date_recepisse_district)
      console.log('submit');
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passAUE.dataPass.mode==='Ajouter'){
        setSelectedFokontany('') 
        setSelectedCommune('')
        passAUE.add(form)
        setForm(passAUE.dataPass.initValue)
        
      }
      else{
        passAUE.update(form)
      }
      passAUE.dataPass.setSaisieAUE(false)
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
      <Text style={FormStyles.paragraph}>Saisie AUE </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
      <View>
        <Text style={FormStyles.label}>Nom du AUE</Text>
        <TextInput  style={FormStyles.input}
                    name="nom_aue"
                    onChangeText={(value) => handleForm('nom_aue', value)}
                    value = {form.nom_aue}/>
      </View>
      <Text style={FormStyles.label}>Nom du périmètre</Text>
        <TextInput  style={FormStyles.input}
                    name="nom_perimetre"
                    onChangeText={(value) => handleForm('nom_perimetre', value)}
                    value = {form.nom_perimetre}
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
     
      <View>
        <Text style={FormStyles.label}>Date de création AUE</Text>
          <TextInput style={FormStyles.input}
                     name="date_creation"
                     onChangeText={(value) => handleForm('date_creation', value)}
                     placeholder='JJ-MM-YYYY'
                    value = {form.date_creation}
                     keyboardType="numeric"/>
      </View>      
     
        <Text style={FormStyles.label}>Date de recepisse</Text>
        <TextInput  style={FormStyles.input}
                    name="date_recepisse_district"
                    onChangeText={(value) => handleForm('date_recepisse_district', value)}
                    placeholder='JJ-MM-YYYY'
                        value = {form.date_recepisse_district}
                    keyboardType="numeric"
        />
        <View>
        <Text style={FormStyles.label}>Nombre des membres</Text>
        <TextInput  style={FormStyles.input}
                    name="nb_membre"
                    onChangeText={(value) => handleForm('nb_membre', value)}
                    value = {form.nb_membre}
                    keyboardType="numeric"
        />
      </View>
      
      </Card>  
      <Text style={styles.box}></Text>
      {erreur===true?<Text style={styles.erreur}>{"L'un des dates: "+form.date_creation+","+ form.date_recepisse_district+''+" n'est pas validé"}</Text>:null}
     <Card style={FormStyles.card}>  
      <View >
        
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passAUE.dataPass.mode}</Text>
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

