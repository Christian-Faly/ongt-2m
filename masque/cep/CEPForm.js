import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button ,Pressable, Platform} from 'react-native';
import { FormStyles } from '../../styles/global';
import { Card } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';

export default function CEPForm({passCEP}) {
  const [erreur,setErreur] = useState(false)  
  const [msgErreur,setMsgErreur] = useState('')  

  let lstCom =[]
  passCEP.dataPass.comTab.forEach(item => {
    lstCom = [...lstCom,{key:item.commune +' ('+ item.ncommune +')',value:item.commune +'('+item.ncommune+')'}]  
    if(item.ncommune == passCEP.dataPass.initValue.ncommune){
      passCEP.dataPass.initValue.ncommune = item.commune +'('+item.ncommune+')'
    }  
  });
  const [selectedCommune, setSelectedCommune] = useState(passCEP.dataPass.initValue.ncommune);
  
  let toutFkt =[]
  passCEP.dataPass.lstFokontany.forEach((item,i) => {
    toutFkt = [...toutFkt,{key:item.maitre,value:item.nom}]  
  });
  // console.log(toutFkt)
  let lstFkt = []

  if (passCEP.dataPass.initValue.date_mep!=="")
    passCEP.dataPass.initValue.date_mep = transformDate(passCEP.dataPass.initValue.date_mep)
  
  const [selectedFokontany, setSelectedFokontany] = useState(passCEP.dataPass.initValue.fokontany);

  const [selectedTypoSol, setSelectedTypoSol] = useState(passCEP.dataPass.initValue.typologie_sol);
  const lstTypoSol = [
    {key: 'Tanimbary', value: 'Tanimbary'},
    {key: 'Baiboho', value: 'Baiboho'},
    {key: 'Tanety', value: 'Tanety'},
  ]; 
  const [selectedCampagne, setSelectedCampagne] = useState(passCEP.dataPass.initValue.campagne);
  const lstCampagne = [
    {key: 'Saison', value: 'Saison'},
    {key: 'Contre-saison', value: 'Contre-saison'},
    {key: 'Inter-saison', value: 'Inter-saison'},
  ];

  Object.entries(passCEP.dataPass.initValue).forEach(([key, value]) => {
    if (typeof(passCEP.dataPass.initValue[key])==="number") 
      passCEP.dataPass.initValue[key] = passCEP.dataPass.initValue[key].toString(); // "a 5", "b 7", "c 9"
  });
  
  const [form, setForm] = React.useState(passCEP.dataPass.initValue);
  
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
    var condition1 = (d.getFullYear() == Number(temp[2]))&&(d.getMonth() + 1 == Number(temp[1]))&&(d.getDate() == Number(temp[0]))
    if(condition1===false) setMsgErreur("date invalide")
    let isSaison =(form.campagne === 'Saison')
    let moisSaison = ((temp[1]==='12')||(temp[1]==='01')||(temp[1]==='02')||(temp[1]==='03'))
    let isContreSaison = (form.campagne === 'Contre-saison')
    let moisContreSaison = ((temp[1]==='06')||(temp[1]==='07')||(temp[1]==='08')||(temp[1]==='09'))
    let isCepRiz = (passCEP.dataPass.typeCEP==="Riz")
    var condition2 = (((isSaison && moisSaison)||( isContreSaison && moisContreSaison)||(!isSaison&&!isContreSaison))
                      &&isCepRiz)||(!isCepRiz)
    // console.log("condition",condition1,condition2)
    
      if(condition2===false) setMsgErreur("date invalide par rapport à la saison")
    if ((condition1===false)||(condition2===false)) 
      setErreur(true)
    else
      setErreur(false)
    return condition1&&condition2 
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
    form.campagne = selectedCampagne
    form.typologie_sol = selectedTypoSol
    // console.log('date',form.date_mep)
     
    if (isValidDate(form.date_mep)===true){
      // setErreur(false)
      form.date_mep = transformDate(form.date_mep)
      console.log('submit this form =>', JSON.stringify(form, false, 2));
      if(passCEP.dataPass.mode==='Ajouter'){
        passCEP.add(form)
        setForm(passCEP.dataPass.initValue)
        setSelectedCommune('')
        setSelectedFokontany('')
        setSelectedCampagne('')
        setSelectedTypoSol('')
      }
      else{
        passCEP.update(form)
      }
      passCEP.dataPass.setSaisieCEP(false)
    }else{
      // console.log('not submit');
      // setMsgErreur('Erreur date de mise en place')
      // setErreur(false)
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
      <Card style={styles.cardTop}>
      <Text style={styles.paragraph}>{'Saisie CEP '+passCEP.dataPass.typeCEP}</Text>
      </Card>
      <Text style={FormStyles.label}></Text>
      <Card style={styles.cardCenter}>
      
      {/* <View style={{elevation:50,zIndex: 5, position: 'relative'}}> */}
          <Text style={FormStyles.label}>Commune</Text>
          <SelectList data = {lstCom}  setSelected = {setSelectedCommune}
                      save='value'
                      defaultOption = {{key:selectedCommune,value:selectedCommune}}
                      onSelect={filterFkt(selectedCommune)}
                      value={selectedCommune}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      {/* </View> */}

      {/* <View style={{elevation:50,zIndex: 5, position: 'relative'}}> */}
          <Text style={FormStyles.label}>Fokontany</Text>
          <SelectList data = {lstFkt}  setSelected = {setSelectedFokontany}
                      save='value'
                      defaultOption = {{key:selectedFokontany,value:selectedFokontany}}
                      value={selectedFokontany}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
      {/* </View> */}
        {/* <View> */}
          <Text style={FormStyles.label}>village</Text>
          <TextInput style={FormStyles.input}
                     name="village"
                     onChangeText={(value) => handleForm('village', value)}
                     value = {form.village}/>
        {/* </View> */}
        {/* <View> */}
        <Text style={FormStyles.label}>Reference</Text>
          <TextInput style={FormStyles.input}
                     name="ref"
                     onChangeText={(value) => handleForm('ref', value)}
                     value = {form.ref}/>
        {/* </View> */}
        {/* <View> */}
          <Text style={FormStyles.label}>Groupement</Text>
          <TextInput 
                    // autoCapitalize = {"characters"}
                     style={FormStyles.input}
                     name="nom"
                     onChangeText={(value) => handleForm('nom', value)}
                     value = {form.nom}/>
       {/* </View> */}
       {/* <View> */}
       {passCEP.dataPass.typa!=="Apiculture"
        ? <View> 
            <Text style={FormStyles.label}>Variété</Text>
            <TextInput 
                    // autoCapitalize = {"characters"}
                     style={FormStyles.input}
                     name="variete"
                     onChangeText={(value) => handleForm('variete', value)}
                     value = {form.variete}/>
          </View>
        :null
      }
       {/* </View> */}
       {passCEP.dataPass.typa==="Agriculture"?(
      
       <View style={{elevation:50,zIndex:3 , position: 'relative'}}>
            <Text style={FormStyles.label}>Campagne</Text>
            <SelectList data = {lstCampagne}  setSelected = {setSelectedCampagne}
                        defaultOption = {{key:selectedCampagne,value:selectedCampagne}}
                        value={selectedCampagne}
                        placeholder='-------------'
                        SelectedTextStyle={FormStyles.SelectedTextStyle}
                        inputSearchStyle={FormStyles.inputSearchStyle}/>
         </View>
       ):null}
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
      {passCEP.dataPass.typa==="Agriculture"?(
        <View>
          <View style={{elevation:50,zIndex: 4, position: 'relative'}}>
            <Text style={FormStyles.label}>Typologie Sol</Text>
            <SelectList data = {lstTypoSol}  setSelected = {setSelectedTypoSol}
                      defaultOption = {{key:selectedTypoSol,value:selectedTypoSol}}
                      value={selectedTypoSol}
                      placeholder='-------------'
                      SelectedTextStyle={FormStyles.SelectedTextStyle}
                      inputSearchStyle={FormStyles.inputSearchStyle}/>
          </View>
          
          <View>
            <Text style={FormStyles.label}>Nom du perimetre</Text>
            <TextInput
                  style={FormStyles.input}
                  name="nom_perimetre"
                  onChangeText={(value) => handleForm('nom_perimetre', value)}
                  value = {form.nom_perimetre}
            />
          </View>
        </View>
       ):null}
      
        {passCEP.dataPass.typa==="Apiculture"
        ? <Text style={FormStyles.label}>Nombre de ruches</Text>
            :(passCEP.dataPass.typa==="Porciculture"
              ?<Text style={FormStyles.label}>Nombre de cheptel</Text>
              :<Text style={FormStyles.label}>Superficie prévisionnelle</Text>)
        }
      <TextInput
            style={FormStyles.input}
            name="surface"
            keyboardType="numeric"
            onChangeText={(value) => handleForm('surface', value)}
            value = {form.surface}
      />
        
        
      {passCEP.dataPass.typa==="Agriculture"?(
        <View>
          <View>
            <Text style={FormStyles.label}>Rendement</Text>
                <TextInput
                  placeholder='Rendement'
                  style={FormStyles.input}
                  name="rendement"
                  keyboardType="numeric"
                  onChangeText={(value) => handleForm('rendement', value)}
                  value = {form.rendement}
                />
          </View>
        </View>      
     ):null}
    </Card>  
    <Text style={styles.box}></Text>
    {erreur===true?<Text style={styles.erreur}>{msgErreur}</Text>:null}
    <Card style={styles.cardBottom}>  
      <View >

      <Pressable style={FormStyles.buttonContainer}
                        onPress={submitForm} >
                        <Text style={FormStyles.text}>{passCEP.dataPass.mode}</Text>
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
