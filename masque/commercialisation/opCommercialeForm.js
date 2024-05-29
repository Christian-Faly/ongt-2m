import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,Pressable } from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
// AUE = pepiniere
import DropDownPicker from 'react-native-dropdown-picker'
export default function OPCommercialeForm({ pass}) {
  const [erreur,setErreur] = useState(false)  
  const [msgErreur,setMsgErreur] = useState('')  

  if (pass.dataPass.initValue.date_creation!=="")
    pass.dataPass.initValue.date_creation = transformDate(pass.dataPass.initValue.date_creation)
  if (pass.dataPass.initValue.date_certificat_enr!=="")
    pass.dataPass.initValue.date_certificat_enr = transformDate(pass.dataPass.initValue.date_certificat_enr)
  
  let lstCom =[]
  pass.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == pass.dataPass.initValue.ncommune){
      pass.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(pass.dataPass.initValue.ncommune);
  
  let toutFkt =[]
  pass.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  
  let lstFkt = []
  const [selectedFokontany, setSelectedFokontany] = useState(pass.dataPass.initValue.fokontany);
  
  const lstTypeOP =[
    {key:'Coopérative',value :'Coopérative' },
    {key:'EURL',value :'EURL' }
  ]
  
  const [selectedTypeOP, setSelectedTypeOP] = useState(pass.dataPass.initValue.type_op);
  
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

  function isValidDate(daty) {
    var temp = daty.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    var d = new Date(temp2);
    console.log(daty)
    console.log(d.getFullYear() , Number(temp[2]),
                d.getMonth() + 1 , Number(temp[1]),
                d.getDate() , Number(temp[0]))
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
    form.type_op = selectedTypeOP
    
    if (form.date_certificat_enr>''){
      if (isValidDate(form.date_certificat_enr)===true)
        form.date_certificat_enr = transformDate(form.date_certificat_enr)
      else
        delete form.date_certificat_enr
    }

    if (isValidDate(form.date_creation)===true){
      setErreur(false)
      form.date_creation = transformDate(form.date_creation)
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(pass.dataPass.mode==='Ajouter'){
        setSelectedFokontany('') 
        setSelectedCommune('')
        setSelectedTypeOP('')
        pass.add(form)
        setForm(pass.dataPass.initValue)
      }
      else{
        pass.update(form)
      }
    }else{
      
      console.log('not submit',form.date_creation);
      setErreur(true)
    }
    pass.dataPass.setSaisie(false)
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
      <Text style={FormStyles.paragraph}>Saisie OP Commerciale </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
          <Text style={FormStyles.label}>Commune</Text>
          <SelectList data = {lstCom}  setSelected = {setSelectedCommune}
                      save='value'
                      defaultOption = {{key:selectedCommune,value:selectedCommune}}
                      onSelect={filterFkt(selectedCommune)}
                      value={selectedCommune}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
         <Text style={FormStyles.label}>Fokontany</Text>
          <SelectList data = {lstFkt}  setSelected = {setSelectedFokontany}
                      save='value'
                      defaultOption = {{key:selectedFokontany,value:selectedFokontany}}
                      value={selectedFokontany}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
        <Text style={FormStyles.label}>Siège sociale</Text>
        <TextInput  style={FormStyles.input}
                    name="site"
                    onChangeText={(value) => handleForm('site', value)}
                    value = {form.site}/>
      {/* <Text style={FormStyles.label}>Coordoonnés géographique</Text> */}
      <Text style={FormStyles.label}>Latitude</Text>
      <TextInput  style={FormStyles.input}
                    name="coo_x"
                    onChangeText={(value) => handleForm('coo_x', value)}
                    value = {form.coo_x}
                    />
      <Text style={FormStyles.label}>Longitude</Text>
      <TextInput  style={FormStyles.input}
                    name="coo_y"
                    onChangeText={(value) => handleForm('coo_y', value)}
                    value = {form.coo_y}
                    />
      
      <Text style={FormStyles.label}>Type OP</Text>
          <SelectList data = {lstTypeOP}  setSelected = {setSelectedTypeOP}
                      save='value'
                      defaultOption = {{key:selectedTypeOP,value:selectedTypeOP}}
                      value={selectedTypeOP}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      
        <Text style={FormStyles.label}>nom OP Commerciale</Text>
        <TextInput  style={FormStyles.input}
                    name="nom_op"
                    onChangeText={(value) => handleForm('nom_op', value)}
                    value = {form.nom_op}
        />
      
        
        <Text style={FormStyles.label}>Date création</Text>
          <TextInput style={FormStyles.input}
                    name="date_creation"
                     keyboardType="numeric"
                     placeholder='JJ-MM-YYYY'
                     onChangeText={(value) => handleForm('date_creation', value)}
                     value = {form.date_creation}
          />
    
    
      <Text style={FormStyles.label}>Filière</Text>
        <TextInput  style={FormStyles.input}
                    name="filiere"
                    onChangeText={(value) => handleForm('filiere', value)}
                    value = {form.filiere}
        />
      
        <Text style={FormStyles.label}>Capitale</Text>
          <TextInput style={FormStyles.input}
                    name="capital"
                     keyboardType="numeric"
                     onChangeText={(value) => handleForm('capital', value)}
                     value = {form.capital}
          />
    
    <Text style={FormStyles.label}>Certificat enregistrement</Text>
    <Text style={FormStyles.label}>numéro</Text>
        <TextInput  style={FormStyles.input}
                    name="num_certificat_enr"
                    onChangeText={(value) => handleForm('num_certificat_enr', value)}
                    value = {form.num_certificat_enr}
        />
      
        
        <Text style={FormStyles.label}>Date</Text>
          <TextInput style={FormStyles.input}
                    name="date_certificat_enr"
                     keyboardType="numeric"
                     placeholder='JJ-MM-YYYY'
                     onChangeText={(value) => handleForm('date_certificat_enr', value)}
                     value = {form.date_certificat_enr}
          />
    
      </Card>  
      <Text style={styles.box}></Text>
      {erreur===true?<Text style={styles.erreur}>{"La date création: "+form.date_creation+" n'est pas validé"}</Text>:null}
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

