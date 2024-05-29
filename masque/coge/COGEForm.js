import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,Pressable } from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
export default function COGEForm({ passCOGE}) {
  const [erreur,setErreur] = useState(false)  
  let lstCom =[]
  passCOGE.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passCOGE.dataPass.initValue.ncommune){
      passCOGE.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(passCOGE.dataPass.initValue.ncommune);
  
  let toutFkt =[]
  passCOGE.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  // console.log(toutFkt)
  let lstFkt = []
  const [selectedFokontany, setSelectedFokontany] = useState(passCOGE.dataPass.initValue.fokontany);

  if (passCOGE.dataPass.initValue.date_creation!=="")
  passCOGE.dataPass.initValue.date_creation = transformDate(passCOGE.dataPass.initValue.date_creation)



  Object.entries(passCOGE.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passCOGE.dataPass.initValue[key])==="number") 
    passCOGE.dataPass.initValue[key] = passCOGE.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
 
  const [form, setForm] = React.useState(passCOGE.dataPass.initValue);
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
    form.ncommune = passCOGE.dataPass.initValue.ncommune
    form.fokontany = selectedFokontany
    if (isValidDate(form.date_creation)===true){
      setErreur(false)
      form.date_creation = transformDate(form.date_creation)
      console.log('submit');
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passCOGE.dataPass.mode==='Ajouter'){
        setSelectedFokontany("")
        passCOGE.add(form)
        setForm(passCOGE.dataPass.initValue)
      }
      else{
        passCOGE.update(form)
      }
      passCOGE.dataPass.setSaisieCOGE(false)
    }else{
      console.log('not submit');
      setErreur(true)
    }
  };
  function filterFkt(commune){
    try{
        lstFkt =  [...toutFkt].filter(fkt => fkt.key == commune.substring(commune.length-6,commune.length-1))
    }catch(err){
      // console.log(err)
 }
}
  const toNomber = (st) => {
    if (st==='') 
      ret = 0
    else
      ret = parseInt(st,10)
  } 

  return (
   <View style={FormStyles.container}> 
      <Card style={FormStyles.card}>
      <Text style={FormStyles.paragraph}>Saisie COGE </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
      <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
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
        <Text style={FormStyles.label}>Nom du président</Text>
        <TextInput  style={FormStyles.input}
                    name="nom_president"
                    onChangeText={(value) => handleForm('nom_president', value)}
                    value = {form.nom_president}
        />
      </View>
      <View>
        <Text style={FormStyles.label}>Date de création COGE</Text>
        <TextInput    style={FormStyles.input}
                      keyboardType="numeric"
                      name="date_creation"
                      placeholder='JJ-MM-YYYY'
                      onChangeText={(value) => handleForm('date_creation', value)}
                      value = {form.date_creation}
        />
      </View>
      
      <View>
        <Text style={FormStyles.label}>Sexe du président</Text>
        <TextInput
          style={FormStyles.input}
          name="sexe_president"
          onChangeText={(value) => handleForm('sexe_president', value)}
          value = {form.sexe_president}
        />
      </View>
      {/* <View>
        <Text style={FormStyles.label}>Nom du leader</Text>
        <TextInput
          style={FormStyles.input}
          name="nom_leader"
          onChangeText={(value) => handleForm('nom_leader', value)}
          value = {form.nom_leader}
        />
      </View> */}
      <View>
        <Text style={FormStyles.label}>Contact</Text>
        <TextInput
          style={FormStyles.input}
          keyboardType="numeric"
          name="contact"
          onChangeText={(value) => handleForm('contact', value)}
          value = {form.contact}
        />
      </View>
    </Card>  
    <Text style={styles.box}></Text>
    {erreur===true?<Text style={styles.erreur}>{"Erreur date mise en place : "+form.date_creation}</Text>:null}
     <Card style={FormStyles.card}>  
      <View >
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passCOGE.dataPass.mode}</Text>
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

