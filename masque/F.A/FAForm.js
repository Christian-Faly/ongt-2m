import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button,Pressable } from 'react-native';
import Constants from 'expo-constants';

import { Card } from 'react-native-paper';
import { FormStyles } from '../../styles/global';
import { SelectList } from 'react-native-dropdown-select-list';

export default function FAForm({ passFA}) {
  const [erreur,setErreur] = useState(false)  
 
  let lstCom =[]
  passFA.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passFA.dataPass.initValue.ncommune){
      passFA.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  
  const [selectedCommune, setSelectedCommune] = useState(passFA.dataPass.initValue.ncommune);
  
  let toutFkt =[]
  passFA.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  // console.log(toutFkt)
  let lstFkt = []
  // passFA.dataPass.initValue.date_formation = transformDate(passFA.dataPass.initValue.date_formation)
  if (passFA.dataPass.initValue.date_formation!=="")
    passFA.dataPass.initValue.date_formation = transformDate(passFA.dataPass.initValue.date_formation)
  
  const [selectedFokontany, setSelectedFokontany] = useState(passFA.dataPass.initValue.fokontany);


  Object.entries(passFA.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passFA.dataPass.initValue[key])==="number") 
    passFA.dataPass.initValue[key] = passFA.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
 console.log(lstFkt)
  const [form, setForm] = React.useState(passFA.dataPass.initValue);
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
    form.ncommune = selectedCommune.substring(selectedCommune.length-6,selectedCommune.length-1)
    form.fokontany = selectedFokontany
    if (isValidDate(form.date_formation)===true){
      setErreur(false)
      form.date_formation = transformDate(form.date_formation)
      console.log('submit');
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passFA.dataPass.mode==='Ajouter'){
        setSelectedFokontany("")
        passFA.add(form)
        setForm(passFA.dataPass.initValue)
      }
      else{
        passFA.update(form)
      }
      passFA.dataPass.setSaisieFA(false)
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
      <Text style={FormStyles.paragraph}>Saisie foyer amélioré </Text>
      </Card>
      <Text style={styles.label}></Text>
      <Card style={FormStyles.card}>
      <Text style={styles.label}></Text>
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
        <Text style={styles.label}></Text>
        <Text style={styles.label}>Village</Text>
        <TextInput
          style={styles.input}
          name="village"
          onChangeText={(value) => handleForm('village', value)}
          value = {form.village}
        />
      </View>
      
      <View>
        <Text style={{color:'#FF0000', fontWeight: 'bold'}}>Identité animatrice </Text>
        <Text style={styles.label}>Nom et prénom</Text>
        <TextInput
          style={styles.input}
          name="nom"
          onChangeText={(value) => handleForm('nom', value)}
          value = {form.nom}
        />
      </View>
      
      <Text style={styles.label}>Nombre de foyers diffusé par bénéficiaires</Text>
        <TextInput  style={styles.input}
                    id="nb_foyer_diffuse"
                    name="nb_foyer_diffuse"
                    keyboardType="numeric"
                    onChangeText={(value) => handleForm('nb_foyer_diffuse', value)}
                    value = {form.nb_foyer_diffuse}/>
      <View>
        <Text style={FormStyles.label}>Date de formation</Text>
          <TextInput style={FormStyles.input}
                     name="date_formation"
                     placeholder='JJ-MM-YYYY'
                     onChangeText={(value) => handleForm('date_formation', value)}
                     value = {form.date_formation}
                     keyboardType="numeric"
          />
      </View>
      

     
    </Card>  
    <Text style={styles.box}></Text>
    {erreur===true?<Text style={styles.erreur}>{"Erreur date de formation : "+form.date_formation}</Text>:null}
    <Card style={FormStyles.card}>  
    <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passFA.dataPass.mode}</Text>
     </Pressable>
 
    </Card>  
    
  </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
  erreur: {
    margin: 24,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'white',
    textShadowRadius: 6,
    color: 'red',
  },
  
});





// import React from 'react';
// import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
// import { globalStyles } from '../../styles/global.js';
// import { Formik } from 'formik';
// import * as yup from 'yup';
// import FlatButton from '../../shared/button.js';

// const cepSchema = yup.object({
//   ref: yup.string(),
//   commune: yup.string(),
//   pepineriste: yup.string(),
//   annee: yup.string()
//   //   .required()
//   //   .min(2),
//   // nom: yup.string()
//   //   .required()
//   //   .min(2),
//   // type_speculation: yup.string()
//   //   .required()
//   //   .min(2),
//   // speculation_special: yup.string()
//   //   .required()
//   //   .min(2),
//   // speculation_scv: yup.string()
//   //   .required()
//   //   .min(2), 
//   // campagne: yup.string()
//   //   .required()
//   //   .min(2), 
// });

// export default function RBMForm({ addRBM }) {

//   return (
    
//     <View style={globalStyles.container}>
//       <Formik
//         initialValues={{ 
//           ref: '', 
//           commune: '',
//           // typologie_sol: '',
//           pepineriste: '',
//           annee: ''
//         }}
//         validationSchema={cepSchema}
//         onSubmit={(values, actions) => {
//           actions.resetForm(); 
//           addRBM(values);
//         }}
//       >
//         {props => (
//           <View>
//             <TextInput
//               style={globalStyles.input}
//               placeholder='Reference'
//               onChangeText={props.handleChange('ref')}
//               onBlur={props.handleBlur('ref')} 
//               value={props.values.ref}
//             />
//             {/* only if the left value is a valid string, will the right value be displayed */}
//             <Text style={globalStyles.errorText}>{props.touched.ref && props.errors.ref}</Text>

//             <TextInput
//               style={globalStyles.input}
//               multiline minHeight={60}
//               placeholder='Commune'
//               onChangeText={props.handleChange('commune')}
//               onBlur={props.handleBlur('commune')}
//               value={props.values.commune}
//             />
//             <Text style={globalStyles.errorText}>{props.touched.commune && props.errors.commune}</Text>

//             <TextInput 
//               style={globalStyles.input}
//               placeholder='Pepineriste'
//               onChangeText={props.handleChange('pepineriste')}
//               onBlur={props.handleBlur('pepineriste')} 
//               value={props.values.pepineriste}
//             />
//             <Text style={globalStyles.errorText}>{props.touched.pepineriste && props.errors.pepineriste}</Text>
            
//             <TextInput 
//               style={globalStyles.input}
//               placeholder='Annee'
//               onChangeText={props.handleChange('annee')}
//               onBlur={props.handleBlur('annee')} 
//               value={props.values.annee}
//             />
//             <Text style={globalStyles.errorText}>{props.touched.annee && props.errors.annee}</Text>  
//             <FlatButton onPress={props.handleSubmit} text='Enregistrer' />
//           </View>
//         )}
//       </Formik>
//     </View>
//   );
// }