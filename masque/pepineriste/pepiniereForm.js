import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,Pressable } from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
// AUE = pepiniere
export default function pepiniereForm({ pass}) {
  const [erreur,setErreur] = useState(false)  
  
  if (pass.dataPass.initValue.debut_activite!=="")
    pass.dataPass.initValue.debut_activite = transformDate(pass.dataPass.initValue.debut_activite)
  
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
  
  const lstSexe =[
    {key:'Homme',value :'Homme' },
    {key:'Femme',value :'Femme' }
  ]
  const [selectedSexe, setSelectedSexe] = useState(pass.dataPass.initValue.sexe);
  
  Object.entries(pass.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(pass.dataPass.initValue[key])==="number") 
       pass.dataPass.initValue[key] = pass.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
  const [form, setForm] = React.useState(pass.dataPass.initValue);
  console.log('form',form.debut_activite)
  
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
    console.log((d.getFullYear() == Number(temp[2])),
                (d.getMonth() + 1 == Number(temp[1])),
                (d.getDate() == Number(temp[0])))
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
    form.sexe = selectedSexe
    console.log(form.debut_activite)
    if (isValidDate(form.debut_activite)===true){
      setErreur(false)
      form.debut_activite = transformDate(form.debut_activite)
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(pass.dataPass.mode==='Ajouter'){
        setSelectedFokontany('') 
        setSelectedCommune('')
        setSelectedSexe('')
        pass.add(form)
        setForm(pass.dataPass.initValue)
      }
      else{
        pass.update(form)
      }
      pass.dataPass.setSaisiePepiniere(false)
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

  return (
   <View style={FormStyles.container}> 
      <Card style={FormStyles.card}>
      <Text style={FormStyles.paragraph}>Saisie pépinière </Text>
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
      <View>
        <Text style={FormStyles.label}>Site</Text>
        <TextInput  style={FormStyles.input}
                    name="site"
                    onChangeText={(value) => handleForm('site', value)}
                    value = {form.site}/>
      </View>
      <Text style={FormStyles.label}>Coordoonnés géographique</Text>
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
      {/*ncommune, fokontany, site TEXT, coo_x TEXT, coo_y TEXT, nom_pepineriste TEXT, sexe TEXT, date  */}
      
        <View>
        <Text style={FormStyles.label}>nom pépineriste</Text>
        <TextInput  style={FormStyles.input}
                    name="nom_pepineriste"
                    onChangeText={(value) => handleForm('nom_pepineriste', value)}
                    value = {form.nom_pepineriste}
        />
        </View>
      
        
        <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
        <Text style={FormStyles.label}>Sexe</Text>
          <SelectList data = {lstSexe}  setSelected = {setSelectedSexe}
                      save='value'
                      defaultOption = {{key:selectedSexe,value:selectedSexe}}
                      value={selectedSexe}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      
      <View>
        <Text style={FormStyles.label}>Date de début activité</Text>
          <TextInput style={FormStyles.input}
                     name="debut_activite"
                     placeholder='JJ-MM-YYYY'
                     keyboardType="numeric"
                     onChangeText={(value) => handleForm('debut_activite', value)}
                     value = {form.debut_activite}
          />
      </View>      
     </View>
      
      </Card>  
      <Text style={styles.box}></Text>
      {erreur===true?<Text style={styles.erreur}>{"La date de début d'activité: "+form.debut_activite+" n'est pas validé"}</Text>:null}
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

