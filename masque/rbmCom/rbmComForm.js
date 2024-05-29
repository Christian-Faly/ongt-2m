import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable, Platform} from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

export default function RbmComForm({passRbmCom}) {
  const [erreur,setErreur] = useState(false)  
  let lstCom =[]
  passRbmCom.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passRbmCom.dataPass.initValue.ncommune){
      passRbmCom.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(passRbmCom.dataPass.initValue.ncommune);
  
  let toutFkt =[]
  passRbmCom.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  // console.log(toutFkt)
  let lstFkt = []

  if (passRbmCom.dataPass.initValue.date_mis_terre!=="")
    passRbmCom.dataPass.initValue.date_mis_terre = transformDate(passRbmCom.dataPass.initValue.date_mis_terre)
  if (passRbmCom.dataPass.initValue.date_suivie_reb!=="")
    passRbmCom.dataPass.initValue.date_suivie_reb = transformDate(passRbmCom.dataPass.initValue.date_suivie_reb)

  const [selectedFokontany, setSelectedFokontany] = useState(passRbmCom.dataPass.initValue.fokontany);



 Object.entries(passRbmCom.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passRbmCom.dataPass.initValue[key])==="number") 
    passRbmCom.dataPass.initValue[key] = passRbmCom.dataPass.initValue[key].toString();
  });
  const [form, setForm] = React.useState(passRbmCom.dataPass.initValue);
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
    form.ncommune = passRbmCom.dataPass.initValue.ncommune
    form.fokontany = selectedFokontany
      
    if ((isValidDate(form.date_mis_terre)===true)&&(isValidDate(form.date_suivie_reb)===true)){
      setErreur(false)
      form.date_mis_terre = transformDate(form.date_mis_terre)
      form.date_suivie_reb = transformDate(form.date_suivie_reb)
      console.log('submit');
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passRbmCom.dataPass.mode==='Ajouter'){
        setSelectedFokontany("")
        passRbmCom.add(form)
        setForm(passRbmCom.dataPass.initValue)
      }
      else{
        passRbmCom.update(form)
      }
      passRbmCom.dataPass.setSaisieRbmCom(false)
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
    <Text style={FormStyles.paragraph}>Saisie reboisement communautaire</Text>
    </Card>
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>
    <Text style={{color:'#FF0000', fontWeight: 'bold'}}>Information sur la localisation </Text>
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
      <Text style={FormStyles.label}>Village</Text>
      <TextInput style={FormStyles.input}
                 name="village"
                 onChangeText={(value) => handleForm('village', value)}
                 value = {form.village}/>
    </View>
    
      
    <Text style={{color:'#FF0000', fontWeight: 'bold'}}>Information sur les jeunes plants</Text>
    <View>
      <Text style={FormStyles.label}>Date de mise en terre</Text>
      <TextInput style={FormStyles.input}
                 name="date_mis_terre"
                 placeholder='JJ-MM-YYYY'
                 onChangeText={(value) => handleForm('date_mis_terre', value)}
                 value = {form.date_mis_terre}
                 keyboardType="numeric"/>
    </View>
    <Text style={{color:'#29B960', fontWeight: 'bold'}}>Coordonnées géographiques</Text>
    <View>
      <Text style={FormStyles.label}>Latitude</Text>
      <TextInput style={FormStyles.input}
                 name="latitude"
                 onChangeText={(value) => handleForm('latitude', value)}
                 value = {form.latitude}/>
    </View>
    <View>
      <Text style={FormStyles.label}>Longitude</Text>
      <TextInput style={FormStyles.input}
                 name="longitude"
                 onChangeText={(value) => handleForm('longitude', value)}
                 value = {form.longitude}/>
    </View>
    <View>
      <Text style={FormStyles.label}>Bénéficiaires</Text>
      <TextInput style={FormStyles.input}
                 name="beneficiaire"
                 onChangeText={(value) => handleForm('beneficiaire', value)}
                 value = {form.beneficiaire}/>
    </View>
    <View>
      <Text style={FormStyles.label}>Date de suivi des reboisements</Text>
      <TextInput style={FormStyles.input}
                 name="date_suivie_reb"
                 placeholder='JJ-MM-YYYY'
                 onChangeText={(value) => handleForm('date_suivie_reb', value)}
                 value = {form.date_suivie_reb}
                 keyboardType="numeric"/>
    </View>
    </Card>   
    <Text style={styles.box}></Text>
    {erreur===true?<Text style={styles.erreur}>{"L'un des dates: "+form.date_mis_terre+","+ form.date_suivie_reb+''+" n'est pas validé"}</Text>:null}
    <Card style={FormStyles.card}>  
      <View>
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passRbmCom.dataPass.mode}</Text>
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
