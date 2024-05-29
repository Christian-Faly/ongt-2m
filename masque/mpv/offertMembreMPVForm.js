import React, { useState} from 'react';
import { Button,  View, Text,Pressable ,TextInput} from 'react-native';
import { FormStyles ,styles} from '../../styles/global';
import Card from '../../shared/card';
import { SelectList } from 'react-native-dropdown-select-list';

  
  export default function OffertMembreMPVForm({ passOffert }) {
    
    const [isPreciSemence, setIsPreciSemence] = useState(false)
    
    const [selectedCategorie, setSelectedCategorie] = useState(passOffert.dataPass.initValue.categorie);
    
    const lstTypeFonction = [
        {key: 'Membre de bureau', value: 'Membre de bureau'},
        {key: 'Controlaire', value: 'Controlaire'},
        {key: 'Equipe technique', value: 'Equipe technique'},
        {key: 'Vaomiera', value: 'Vaomiera'},
        {key: 'Autres', value: 'Autres'},
    ];    
    const [selectedDesignation, setSelectedDesignation] = useState();
    let lstOffert=[]
    console.log(passOffert.dataPass.speculation_special)
    if (passOffert.dataPass.speculation_special === 'Caprin et Ovin')
      lstOffert  = [
        {key: 'Caprin', value: 'Caprin'},
        {key: 'Ovin', value: 'Ovin'},
      ];    
    if (passOffert.dataPass.speculation_special==='Canard'){
      lstOffert  = [
        {key: 'Canard', value: 'Canard'},
      ];
      selectedDesignation('Canard')    
    }
    if (passOffert.dataPass.speculation_special==='Poulet gasy'){
      lstOffert  = [
        {key: 'Poulet gasy', value: 'Poulet gasy'},
      ];
      selectedDesignation('Poulet gasy')    
    }
    if (passOffert.dataPass.speculation_special==='Gargote'){
      lstOffert  = [
        {key: 'Thermos', value: 'Thermos'},
        {key: 'Cuvette', value: 'Cuvette'},
        {key: 'Tasse à café', value: 'Tasse à café'},
        {key: 'tasse à ditée', value: 'tasse à ditée'},
        {key: 'Moule', value: 'Moule'},
        {key: 'Glaciére', value: 'Glaciére'},
        {key: 'Verre', value: 'Verre'},
        {key: 'Passoire', value: 'Passoire'},
        {key: 'Tamis', value: 'Tamis'},
        {key: 'Plateaux', value: 'Plateaux'},
        {key: 'Boîte de conservation', value: 'Boîte de conservation'},
        {key: 'Autres', value: 'utres'},
      ];
    }
    if (passOffert.dataPass.speculation_special==='Cuma'){
      lstOffert  = [
        {key: 'Tomate', value: 'Tomate'},
        {key: 'Oignon', value: 'Oignon'},
        {key: 'Ciboulette', value: 'Ciboulette'},
        {key: 'Petsai', value: 'Petsai'},
        {key: 'Ramirebaka', value: 'Ramirebaka'},
        {key: 'Cocombre', value: 'Cocombre'},
        {key: 'Kimalao', value: 'Kimalao'},
        {key: 'Courgette', value: 'Courgette'},
        {key: 'Tissam', value: 'Tissam'},
        {key: 'Carotte', value: 'Carotte'},
        {key: 'Poivron', value: 'Poivron'},
        {key: 'Chou de chine', value: 'Chou de chine'},
        {key: 'Aubergine', value: 'Aubergine'},
        {key: 'Angivy', value: 'Angivy'},
        {key: 'Anamamy', value: 'Anamamy'},
        {key: 'Sakay lava', value: 'Sakay lava'},
        {key: 'Sakay pilokely', value: 'Sakay pilokely'},
        {key: 'Pastéque', value: 'Pastéque'},
        {key: 'Melon', value: 'Melon'},
      ];
    }
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
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passOffert.dataPass.mode==='Ajouter'){
        passOffert.add(form)
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
      <Text style={FormStyles.paragraph}>{'Saisie dotation membre '+ passOffert.dataPass.titre} </Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>
        <View style={{elevation:50,zIndex: 4, position: 'relative'}}>
          <Text style={FormStyles.label}>Designation</Text>
          <SelectList   data = {lstOffert}  setSelected = {setSelectedDesignation}
                        defaultOption = {{key:selectedDesignation,value:selectedDesignation}}
                        value={selectedDesignation}
                        placeholder='-------------'
                        SelectedTextStyle={FormStyles.SelectedTextStyle}
                        inputSearchStyle={FormStyles.inputSearchStyle}/>
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