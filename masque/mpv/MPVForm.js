import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable, Platform} from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

export default function MPVForm({ passMPV}) {
  const [erreur,setErreur] = useState(false)  
  let lstCom =[]
  passMPV.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passMPV.dataPass.initValue.ncommune){
      passMPV.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(passMPV.dataPass.initValue.ncommune);
  if (passMPV.dataPass.initValue.date_mep!=="")
  passMPV.dataPass.initValue.date_mep = transformDate(passMPV.dataPass.initValue.date_mep)

  
  let toutFkt =[]
  passMPV.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  // console.log(toutFkt)
  let lstFkt = []
  
  const [selectedFokontany, setSelectedFokontany] = useState(passMPV.dataPass.initValue.fokontany);
    Object.entries(passMPV.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passMPV.dataPass.initValue[key])==="number") 
    passMPV.dataPass.initValue[key] = passMPV.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
 


  const [dateMep, setDateMep] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toogleDatePicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({type}, selectedDate) => {
    if (type == "set"){
      const currentDate = selectedDate;
      setDate(currentDate);

      if(Platform.OS === "android"){
        toogleDatePicker();
        setDateMep(currentDate.toDateString());
      }


    } else {
      toogleDatePicker();
    }
  }
  const [form, setForm] = React.useState(passMPV.dataPass.initValue);
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
    form.nom = form.nom.toUpperCase()
    form.ncommune = selectedCommune.substring(selectedCommune.length-6,selectedCommune.length-1)
    form.fokontany = selectedFokontany
    
    if (isValidDate(form.date_mep)===true){
      setErreur(false)
      form.date_mep = transformDate(form.date_mep)
      console.log('submit');
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passMPV.dataPass.mode==='Ajouter'){
        setSelectedCommune('')
        setSelectedFokontany('')
        
        passMPV.add(form)
        setForm(passMPV.dataPass.initValue)
      }
      else{
        passCEP.update(form)
      }
      passMPV.dataPass.setSaisieMPV(false)
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
  } 
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
      <Text style={FormStyles.paragraph}>{'Saisie MPV '+passMPV.dataPass.typeMPV } </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
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
       <Text></Text>
    
      <View>
        <Text style={FormStyles.label}>Reference</Text>
        <TextInput
          style={FormStyles.input}
          name="ref"
          onChangeText={(value) => handleForm('ref', value)}
          value = {form.ref}
        />
      </View>
      <View>
        <Text style={FormStyles.label}>Groupement</Text>
        <TextInput
          style={FormStyles.input}
          name="nom"
          onChangeText={(value) => handleForm('nom', value)}
          value = {form.nom}
        />
      </View>

      <View>
        <Text style={FormStyles.label}>Date de mise en place</Text>
          <TextInput style={FormStyles.input}
                     name="date_mep"
                     placeholder='JJ-MM-YYYY'
                     onChangeText={(value) => handleForm('date_mep', value)}
                     value = {form.date_mep}
                     keyboardType="numeric"
          />
      </View>
      

        
    </Card>  
      <Text style={styles.box}></Text>
      {erreur===true?<Text style={styles.erreur}>{"Erreur date mise en place : "+form.date_mep}</Text>:null}
    <Card style={FormStyles.card}>  
      <View >
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passMPV.dataPass.mode}</Text>
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
