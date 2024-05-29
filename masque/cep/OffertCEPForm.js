import React, { useState} from 'react';
import { Button,  View, Text,Pressable ,TextInput} from 'react-native';
import { FormStyles ,styles} from '../../styles/global';
import Card from '../../shared/card';
import { SelectList } from 'react-native-dropdown-select-list';

export default function OffertCEPForm({ passOffert }) {
  
  const [isPreciSemence, setIsPreciSemence] = useState(false)
  
  const [selectedCategorie, setSelectedCategorie] = useState(passOffert.dataPass.initValue.categorie);
  let lstCate =[]
  passOffert.dataPass.lstCategorie.forEach(item => {
    if ((item.categorie!=="Engrais")&&
    (item.categorie!=="Semences"))

    lstCate = [...lstCate,{key:item.categorie,value:item.categorie}]  
  }) 
  
  const [selectedDesignation, setSelectedDesignation] = useState(passOffert.dataPass.initValue.designation);
  let toutOffert=[]
  passOffert.dataPass.lstDesignation.forEach(item => {
    if ((item.designation!=="ruches complètes(Nb)")&&
        (item.designation!=="Cire gauffré(Nb)")&&
        (item.designation!=="Attire essaim(Nb)")&&
        (item.designation!=="Case à reine(Nb)")&&
        (item.designation!=="Grille à reine(Nb)"))
    toutOffert = [...toutOffert,{key:item.categorie,value:item.designation}]  
  }) 
  let lstOffert=[]
  // const [lstDesignation, setLstDesignation] = useState([...lstOffert].filter(liste => 
  //   liste.categorie == 'Cheptel'));

  Object.entries(passOffert.dataPass.initValue).forEach(([key, value]) => {
      if (typeof(passOffert.dataPass.initValue[key])==="number") 
      passOffert.dataPass.initValue[key] = passOffert.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
    });
   
  const [form, setForm] = React.useState(passOffert.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  const submitForm = () => {
    form.categorie = selectedCategorie
    form.designation = selectedDesignation
    console.log("cate design",form.categorie+" - "+selectedDesignation)
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    if(passOffert.dataPass.mode==='Ajouter'){
      passOffert.add(form)
      setSelectedCategorie('')
      setSelectedDesignation('')
      
      setForm(passOffert.dataPass.initValue)
    }
    else{
      passOffert.update(form)
    }
  };

  const toNomber = (st) => {
    if (st==='') 
      ret = 0
    else
      ret = parseInt(st,10)
  } 
  
  function filterOffert(){
    setTimeout(() => {
      setIsPreciSemence(selectedCategorie==="Semences")
    },  20);
    
    lstOffert =  [...toutOffert].filter(offert => offert.key === selectedCategorie)
  }
  
  return (
 
    <View style={FormStyles.container}> 
    <Card style={FormStyles.card}>
    <Text style={FormStyles.paragraph}>{'Saisie dotation '+ passOffert.dataPass.titre} </Text>
    </Card>
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>
    
    <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
        <Text style={FormStyles.label}>Type</Text>
        <SelectList   data = {lstCate}  setSelected = {setSelectedCategorie}
                      defaultOption = {{key:selectedCategorie,value:selectedCategorie}}
                      value={selectedCategorie}
                      onSelect={filterOffert(selectedCategorie)}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      </View>
      <Text></Text>
      <View style={{elevation:50,zIndex: 4, position: 'relative'}}>
        <Text style={FormStyles.label}>Designation</Text>
        {isPreciSemence === false
        ?
        <SelectList   data = {lstOffert}  setSelected = {setSelectedDesignation}
                      defaultOption = {{key:selectedDesignation,value:selectedDesignation}}
                      save = "value"
                      value={selectedDesignation}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
        :null
        }
        </View>
      <View>
      {isPreciSemence === true
        ?<TextInput
        style={FormStyles.input}
        name="designation"
        onChangeText={(value) => handleForm('designation', value)}
        value = {form.designation}
      />
        :null
      }
      </View>
      <Text></Text>
      <View>
      <View>
        <Text style={FormStyles.label}>Quantite</Text>
           <TextInput
                        style={FormStyles.input}
                        name="quantite"
                        keyboardType="numeric"
                        onChangeText={(value) => handleForm('quantite', value)}
                        value = {form.quantite}
          />
      </View> 
       </View>
     </Card>  
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>  
      <View>
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passOffert.dataPass.mode}</Text>
      </Pressable>
      </View>
    </Card>  
 
    </View>
  );
}