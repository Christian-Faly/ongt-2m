import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable} from 'react-native';
import Constants from 'expo-constants';
import { FormStyles } from '../../styles/global';

import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

export default function ProtectEnvForm({ passENV}) {
  const [erreur,setErreur] = useState(false)  
  let lstCom =[]
  // console.log('56',passENV.dataPass.comTab)
 
  passENV.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passENV.dataPass.initValue.ncommune){
      passENV.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(passENV.dataPass.initValue.ncommune);
  // console.log('55',passENV.dataPass.lstFokontany)
  let toutFkt =[]
  passENV.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  let lstFkt = []

  if (passENV.dataPass.initValue.date_mis_terre!=="")
    passENV.dataPass.initValue.date_mis_terre = transformDate(passENV.dataPass.initValue.date_mis_terre)
  // if (passENV.dataPass.initValue.date_suivie!=="")
  //   passENV.dataPass.initValue.date_suivie = transformDate(passENV.dataPass.initValue.date_suivie)
 
  const [selectedFokontany, setSelectedFokontany] = useState(passENV.dataPass.initValue.fokontany);


  const [selectedRivCanal, setSelectedRivCanal] = useState(passENV.dataPass.initValue.riv_canal_protegee);
  const lstRivCanal = [
  
    {key: 'Gauche', value: 'Gauche'},
    {key: 'Droite', value: 'Droite'},
    {key: 'Gauche/Droite', value: 'Gauche/Droite'}
  ];
const [selectedPartieOuvrage, setSelectedPartieOuvrage] = useState(passENV.dataPass.initValue.riv_canal_protegee);
const lstPartieOuvrage = [

  {key: 'Canal principal', value: 'Canal principal'},
  {key: 'Secondaire', value: 'Secondaire'},
  {key: 'Autres', value: 'Autres'}
];
Object.entries(passENV.dataPass.initValue).forEach(([key, value]) => {
  if (typeof(passENV.dataPass.initValue[key])==="number") 
  passENV.dataPass.initValue[key] = passENV.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
});

const [dateMet, setDateMet] = useState("");
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
      setDateMet(currentDate.toDateString());
    }
  } else {
    toogleDatePicker();
  }
}
  
  const [form, setForm] = React.useState(passENV.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  
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
    let moisSaison = ((temp[1]==='12')||(temp[1]==='01')||(temp[1]==='02')||(temp[1]==='03'))
    let dateValide=(d.getFullYear() == Number(temp[2]))&&(d.getMonth() + 1 == Number(temp[1]))&&(d.getDate() == Number(temp[0]))
    return moisSaison&&dateValide
  }

  function transformDate(date_fr) {
    var temp = date_fr.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    return temp2
  }

  const submitForm = () => {
    form.ncommune = selectedCommune.substring(selectedCommune.length-6,selectedCommune.length-1)
    form.fokontany = selectedFokontany
    form.riv_canal_protegee = selectedRivCanal
      
    if ((isValidDate(form.date_mis_terre)===true)){
      setErreur(false)
      form.date_mis_terre = transformDate(form.date_mis_terre)
      // form.date_suivie = transformDate(form.date_suivie)
      console.log('submit');
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passENV.dataPass.mode==='Ajouter'){
        setSelectedPartieOuvrage("")
        setSelectedRivCanal("")
        passENV.add(form)
        setSelectedCommune('')
        setSelectedFokontany('')
        setForm(passENV.dataPass.initValue)
      }
      else{
        passENV.update(form)
      }
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
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
      <Text style={FormStyles.paragraph}>Saisie d'information sur la protection des ouvrages </Text>
      </Card>
      <Text style={styles.label}></Text>
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
    
        <Text style={styles.label}>Nom de périmètre</Text>
        <TextInput  style={styles.input}
                    id="nom_perimetre"
                    name="nom_perimetre"
                    onChangeText={(value) => handleForm('nom_perimetre', value)}
                    value = {form.nom_perimetre}
        />
        <Text style={styles.label}>Partie des ouvrages à protéger</Text>
          
          <View>
          <SelectList data = {lstPartieOuvrage}  setSelected = {setSelectedPartieOuvrage}
                      defaultOption = {{key:selectedPartieOuvrage,value:selectedPartieOuvrage}}
                      value={selectedPartieOuvrage}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
         </View>
       
          <Text style={styles.label}>Rive du canal protégée </Text>
          <SelectList data = {lstRivCanal}  setSelected = {setSelectedRivCanal}
                      defaultOption = {{key:selectedRivCanal,value:selectedRivCanal}}
                      value={selectedRivCanal}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
       
        <Text style={styles.label}>Longuer</Text>
        <TextInput  style={styles.input}
                    id="longuer"
                    name="longuer"
                    onChangeText={(value) => handleForm('longuer', value)}
                    value = {form.longuer}
                    keyboardType="numeric"/>
      
        <Text style={FormStyles.label}>Date de mise en terre</Text>
          <TextInput style={FormStyles.input}
                     name="date_mis_terre"
                     placeholder='JJ/MM/YYYY'
                     onChangeText={(value) => handleForm('date_mis_terre', value)}
                     value = {form.date_mis_terre}
                     keyboardType="numeric"/>
      
      </Card>
      <Text style={styles.box}></Text>
      {erreur===true?<Text style={styles.erreur}>{"La date date de mise en terre: "+form.date_mis_terre+" n'est pas validé"}</Text>:null}
      <Card style={FormStyles.card}>
      <View >
        <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passENV.dataPass.mode}</Text>
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

  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  card: {
    padding: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 5,
    zIndex: 2, elevation:50,
  },
  input: {
    height: 40,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    // zIndex: 3, elevation:50
  },
  buttonContainer: {
    marginTop: 10,
  }
  ,
  item: {
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 48,
    width: 200,
    borderRadius: 8,
  },
});
