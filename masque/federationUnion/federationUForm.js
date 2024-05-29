import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,Pressable } from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

import DropDownPicker from 'react-native-dropdown-picker'
export default function FederationUForm({ passFederationU}) {
  const [erreur,setErreur] = useState(false)  
  
  const lstF_ou_U = [
    {key: 'Fédération', value: 'Fédération'},
    {key: 'Union', value: 'Union'},
  ];
  const [selectedF_ou_U, setSelectedF_ou_U] = useState(passFederationU.dataPass.initValue.f_ou_u);
  
  if (passFederationU.dataPass.initValue.date_creation!=="")
    passCEP.dataPass.initValue.date_creation = transformDate(passCEP.dataPass.initValue.date_creation)
  
  let lstCom =[]
  passFederationU.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passFederationU.dataPass.initValue.ncommune){
      passFederationU.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(passFederationU.dataPass.initValue.ncommune);
  
  let toutFkt =[]
  passFederationU.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  // console.log(toutFkt)
  let lstFkt = []
  const [selectedFokontany, setSelectedFokontany] = useState(passFederationU.dataPass.initValue.fokontany);

  Object.entries(passFederationU.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passFederationU.dataPass.initValue[key])==="number") 
       passFederationU.dataPass.initValue[key] = passFederationU.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
  const [form, setForm] = React.useState(passFederationU.dataPass.initValue);
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
    form.f_ou_u = selectedF_ou_U
  
    if ((isValidDate(form.date_creation)===true)&&(isValidDate(form.date_recepisse_district)===true)){
      setErreur(false)
      form.date_creation = transformDate(form.date_creation)
      form.date_recepisse_district = transformDate(form.date_recepisse_district)
      console.log('submit');
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passFederationU.dataPass.mode==='Ajouter'){
        setSelectedF_ou_U('') 
        setSelectedFokontany('') 
        setSelectedCommune('')
        passFederationU.add(form)
        setForm(passFederationU.dataPass.initValue)
        
      }
      else{
        passFederationU.update(form)
      }
      passFederationU.dataPass.setSaisieFederationU(false)
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
      <Text style={FormStyles.paragraph}>Saisie Fédération/Union </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
      <View>
      <Text style={FormStyles.label}>Type (Fédération ou Union)</Text>
      <SelectList data = {lstF_ou_U}  setSelected = {setSelectedF_ou_U}
                      save='value'
                      defaultOption = {{key:selectedF_ou_U,value:selectedF_ou_U}}
                      onSelect={filterFkt(selectedF_ou_U)}
                      value={selectedF_ou_U}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>  
      </View>
      <View>
        <Text style={FormStyles.label}>Nom du Federation/Union</Text>
        <TextInput  style={FormStyles.input}
                    name="nom_federation_union"
                    onChangeText={(value) => handleForm('nom_federation_union', value)}
                    value = {form.nom_federation_union}/>
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
        <Text style={FormStyles.label}>Date de création Federation/Union</Text>
          <TextInput style={FormStyles.input}
                     name="date_creation"
                     placeholder='JJ-MM-YYYY'
                      onChangeText={(value) => handleForm('date_creation', value)}
                     value = {form.date_creation}
                     keyboardType="numeric"/>
      </View>      
     
        <Text style={FormStyles.label}>Date de recepisse</Text>
        <TextInput  style={FormStyles.input}
                    name="date_recepisse_district"
                    placeholder='JJ-MM-YYYY'
                    onChangeText={(value) => handleForm('date_recepisse_district', value)}
                    value = {form.date_recepisse_district}
                    keyboardType="numeric"
        />
      
      
      </Card>  
      <Text style={styles.box}></Text>
      {erreur===true?<Text style={styles.erreur}>{"L'un des dates: "+form.date_creation+","+ form.date_recepisse_district+''+" n'est pas validé"}</Text>:null}
     <Card style={FormStyles.card}>  
      <View >
        
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passFederationU.dataPass.mode}</Text>
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

