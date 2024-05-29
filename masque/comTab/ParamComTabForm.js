import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable, Platform, BackHandler} from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

export default function ComTabForm({pass}) {
  
  let lstReg =[]
  pass.dataPass.lstRegion.forEach(item => {
    lstReg = [...lstReg,{key:item.nom +' ('+ item.code +')',value:item.nom +'('+item.code+')'}]  
    if(item.code == pass.dataPass.initValue.nregion){
      pass.dataPass.initValue.nregion = item.nom +'('+item.code+')'
    }
  }); 
  const [selectedRegion, setSelectedRegion] = useState(pass.dataPass.initValue.nregion);
  // console.log(lstReg)

  let toutDist =[]
  pass.dataPass.lstDistrict.forEach(item => {
    toutDist = [...toutDist,{nregion:item.maitre, key:item.nom +' ('+ item.code +')',value:item.nom +'('+item.code+')'}]  
    if(item.code == pass.dataPass.initValue.ndistrict){
      pass.dataPass.initValue.ndistrict = item.nom +'('+item.code+')'
    }
  }); 
  let lstDist = []
  const [selectedDistrict, setSelectedDistrict] = useState(pass.dataPass.initValue.ndistrict);

  
  let lstCom = []
  pass.dataPass.lstCommune.forEach(item => {
    lstCom = [...lstCom,{ndistrict:item.maitre,key:item.nom +' ('+ item.code +')',value:item.nom +'('+item.code+')'}]  
    if(item.code == pass.dataPass.initValue.ncommune){
      pass.dataPass.initValue.ncommune = item.nom +'('+item.code+')'
    }
  });
  
  const [selectedCommune, setSelectedCommune] = useState(pass.dataPass.initValue.ncommune);
  
  const [form, setForm] = React.useState(pass.dataPass.initValue);
  
  Object.entries(pass.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(pass.dataPass.initValue[key])==="number") 
    pass.dataPass.initValue[key] = pass.dataPass.initValue[key].toString();
  });
  
  const [shouldShow, setShouldShow] = useState(true);
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };
  const submitForm = () => {
    form.nregion = selectedRegion.substring(selectedRegion.length-3,selectedRegion.length-1)
    form.ndistrict = selectedDistrict.substring(selectedDistrict.length-4,selectedDistrict.length-1)
    form.ncommune = selectedCommune.substring(selectedCommune.length-6,selectedCommune.length-1)
    form['commune'] = selectedCommune.substring(0,selectedCommune.length-7)
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    
    if(pass.dataPass.mode==='Ajouter'){
      setSelectedRegion("")
      setSelectedDistrict("")
      setSelectedCommune("")
   
      pass.add(form)
      setForm(pass.dataPass.initValue)
    }
    else{
      pass.update(form)
    }
    pass.dataPass.setSaisie(false)
    
    
    
    };

  const toNomber = (st) => {
    if (st==='') 
      ret = 0
    else
      ret = parseInt(st,10)
  } 
  
  function filteDist(region){
    try{
      lstDist =  [...toutDist].filter(dist => dist.nregion == region.substring(region.length-3,region.length-1))
    }catch(err){
      // console.log(err)
    }
  }

  function filteCom(district){
      try{
          lstCom =  [...lstCom].filter(com => com.ndistrict == district.substring(district.length-4,district.length-1))
      }catch(err){
        // console.log(err)
   }
  }

  return (
    <View style={FormStyles.container}> 
    <Card style={FormStyles.card}>
    <Text style={FormStyles.paragraph}>Saisie Commune tablette</Text>
    </Card>
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>
    <Text style={{color:'#FF0000', fontWeight: 'bold'}}>Information sur la localisation </Text>
    <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
      <Text style={FormStyles.label}>Region</Text>
      <SelectList data = {lstReg}  setSelected = {setSelectedRegion}
                  save='key'
                  onSelect={filteDist(selectedRegion)}
                  defaultOption = {{key:selectedRegion,value:selectedRegion}}
                  value={selectedRegion}
                  placeholder='-------------'
                  SelectedTextStyle={FormStyles.SelectedTextStyle}
                  inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
    <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
      <Text style={FormStyles.label}>District</Text>
      <SelectList data = {lstDist}  setSelected = {setSelectedDistrict}
                  save='key'
                  onSelect={filteCom(selectedDistrict)}
                  defaultOption = {{key:selectedDistrict,value:selectedDistrict}}
                  value={selectedDistrict}
                  placeholder='-------------'
                  SelectedTextStyle={FormStyles.SelectedTextStyle}
                  inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
    
    <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
      <Text style={FormStyles.label}>Commune</Text>
      <SelectList data = {lstCom}  setSelected = {setSelectedCommune}
                  save='key'
                  // onSelect={filterFkt(selectedCommune)}
                  defaultOption = {{key:selectedCommune,value:selectedCommune}}
                  value={selectedCommune}
                  placeholder='-------------'
                  SelectedTextStyle={FormStyles.SelectedTextStyle}
                  inputSearchStyle={FormStyles.inputSearchStyle}/>
    </View>
     </Card>   
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>  
      <View>
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm
                          
                          } >
                        <Text style={FormStyles.text}> Enregistrer</Text>
      </Pressable>
      </View>
    </Card>  
  </View>
  
  );

}