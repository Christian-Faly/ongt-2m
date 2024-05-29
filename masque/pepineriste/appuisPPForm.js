import React, { useState} from 'react';
import { Button, StyleSheet,  View, Text,Pressable ,TextInput} from 'react-native';
import { FormStyles ,styles} from '../../styles/global';
import Card from '../../shared/card';
import { SelectList } from 'react-native-dropdown-select-list';

//OffertAUE = AppuisPP
export default function AppuisPPForm({ pass }) {
  const [erreur,setErreur] = useState(false)  
  const [msgErreur,setMsgErreur] = useState('')  

  Object.entries(pass.dataPass.initValue).forEach(([key, value]) => {
      if (typeof(pass.dataPass.initValue[key])==="number") 
      pass.dataPass.initValue[key] = pass.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
    });
  if (pass.dataPass.initValue.daty!=="")
    pass.dataPass.initValue.daty = transformDate(pass.dataPass.initValue.daty)

  const  lstTypa =[
      {key:'Dotation',value :'Dotation' },
      {key:'Formation',value :'Formation' }
    ]
  const [selectedTypa, setSelectedTypa] = useState(pass.dataPass.initValue.typa);
  
  const [form, setForm] = React.useState(pass.dataPass.initValue);
  const [shouldShow, setShouldShow] = useState(true);
  
  const handleForm = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  };

  function transformDate(date_fr) {
    var temp = date_fr.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    return temp2
  }
  

  function isValidDate(date) {
    var temp = date.split('-');
    var temp2 = temp[2] + '-' + temp[1] + '-' + temp[0]
    var d = new Date(temp2);
    var condition1 = (d.getFullYear() == Number(temp[2]))&&(d.getMonth() + 1 == Number(temp[1]))&&(d.getDate() == Number(temp[0]))
    if(condition1===false) setMsgErreur("date invalide")
    if (condition1===false) 
      setErreur(true)
    else
      setErreur(false)
    return condition1 
  }


  const submitForm = () => {
    console.log('submit this form =>', JSON.stringify(form, false, 2));
    if (isValidDate(form.daty)===true){
      // setErreur(false)
      form.daty = transformDate(form.daty)
    
      if(pass.dataPass.mode==='Ajouter'){
        pass.add(form)
        setForm(pass.dataPass.initValue)
      }
      else{
        pass.update(form)
      }
    }
  };

  const toNomber = (st) => {
    if (st==='') 
      ret = 0
    else
      ret = parseInt(st,10)
  } 

  function filterOffert(cate){
    lstOffert =  [...toutOffert].filter(offert => offert.categorie == cate)
  }  
 
  return (
 
    <View style={FormStyles.container}> 
    <Card style={FormStyles.card}>
    <Text style={FormStyles.paragraph}>{'Saisie Appuis pépineriste'} </Text>
    </Card>
    <Text style={FormStyles.label}></Text>
    <Card style={FormStyles.card}>
       <Text></Text>
      <View style={{elevation:50,zIndex: 4, position: 'relative'}}>
      <Text style={FormStyles.label}>Date</Text>
           <TextInput
                        style={FormStyles.input}
                        pla="daty"
                        placeholder='JJ-MM-YYYY'
                        keyboardType="numeric"
                        onChangeText={(value) => handleForm('daty', value)}
                        value = {form.daty}
        />

        <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
          <Text style={FormStyles.label}>Type appuis(Dotation / Formation)</Text>
          <SelectList data = {lstTypa}  setSelected = {setSelectedTypa}
                      save='value'
                      defaultOption = {{key:selectedTypa,value:selectedTypa}}
                      value={selectedTypa}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
        </View>
        <Text style={FormStyles.label}>{selectedTypa !== 'Formation'?'Nature':'Thème'}</Text>
        <TextInput
                        style={FormStyles.input}
                        name="nature"
                        onChangeText={(value) => handleForm('nature', value)}
                        value = {form.nature}
        />
     
      </View>
      <Text></Text>
      {selectedTypa !== 'Formation'?
          <View>
            <Text style={FormStyles.label}>Unité</Text>
            <TextInput
                        style={FormStyles.input}
                        name="unite"
                        onChangeText={(value) => handleForm('unite', value)}
                        value = {form.unite}
            />
            <Text style={FormStyles.label}>Quantité</Text>
            <TextInput
                        style={FormStyles.input}
                        name="quantite"
                        keyboardType="numeric"
                        onChangeText={(value) => handleForm('quantite', value)}
                        value = {form.quantite}
            />
            <Text style={FormStyles.label}>Prix unitaire</Text>
            <TextInput
                        style={FormStyles.input}
                        name="pu"
                        keyboardType="numeric"
                        onChangeText={(value) => handleForm('pu', value)}
                        value = {form.pu}
            />
      </View>
      :null
    } 
        <Text style={FormStyles.label}>Source de financement</Text>
        <TextInput
                        style={FormStyles.input}
                        name="source_financement"
                        onChangeText={(value) => handleForm('source_financement', value)}
                        value = {form.source_financement}
        />
        
     </Card>  
     {erreur===true?<Text style={styles1.erreur}>{msgErreur}</Text>:null}
      <Text style={FormStyles.label}></Text>
      <Card style={FormStyles.card}>  
      <View>
      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{pass.dataPass.mode}</Text>
      </Pressable>
      </View>
    </Card>  
 
    </View>
  );
}

const styles1 = StyleSheet.create({
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
    margin: -15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: { width: 2, height: 2 },
    textShadowColor: 'black',
    textShadowRadius: 6,
    fontSize: 40,
    color: '#22AA44',
  },
  cardTop: {
    padding: 20,
    marginHorizontal: 0,
    justifyContent: 'center',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2,
    borderRadius:30,
    marginBottom:-18,
    height : 70
  },
  cardCenter: {
    padding: 20,
    marginHorizontal: 0,
    justifyContent: 'center',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2,
    borderRadius:30,
    marginBottom:-18
    
  },
  cardBottom: {
    padding: 20,
    marginHorizontal: 0,
    justifyContent: 'center',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:2,
    borderRadius:30,
    marginBottom:-18
    
  },
});
