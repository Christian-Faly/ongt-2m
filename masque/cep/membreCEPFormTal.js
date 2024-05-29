import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import { Picker } from '@react-native-community/picker'
import TextInputMask from 'react-native-masked-text';


const cinNumberMask = [
  /[1-9]/,
  /[1-9]/,
  /[1-9]/,
  " ",
  /[1-9]/,
  /[1-9]/,
  /[1-9]/,
  " ",
  /[1-9]/,
  /[1-9]/,
  /[1-9]/,
  " ",
  /[1-9]/,
  /[1-9]/,
  /[1-9]/
];


const membreSchema = yup.object({
  nom: yup.string()
    .required()
    .min(4),
  // village: yup.string()
  //   .required()
  //   .min(8),
  // h_f: yup.string()
  //   .required()
  //   .min(8),
  surface: yup.number()
     .required()
  });
  
export default function MembreCEPForm({ passMembre}) {
  console.log(passMembre.dataPass.id_groupement)

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ nom: '', surnom: '', id_groupement :passMembre.dataPass.id_groupement,
        fokontany: '',village: '', h_f: '', annee_naissance: '', surface: '',
        cin:'',statut_menage :'',respon_niveau_grpt :'',respon_niveau_comt:''
        }}
        validationSchema={membreSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          passMembre.add(values);
        }}
      >
        {props => (
          <View>
            <Text style={globalStyles.titleText}>Nom et prenom</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={props.handleChange('nom')}
              onBlur={props.handleBlur('nom')} 
              value={props.values.nom}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.nom && props.errors.nom}</Text>

            <Text style={globalStyles.titleText}>Surnom</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={props.handleChange('surnom')}
              onBlur={props.handleBlur('surnom')} 
              value={props.values.surnom}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.surnom && props.errors.surnom}</Text>

            <Text style={globalStyles.titleText}>fokontany</Text>
            <Picker
              style={{backgroundColor : "#EDFB47"}}
              enabled={true}
              mode="dropdown"
              type = 'Text'
              onValueChange={props.handleChange('fokontany')}
              selectedValue={props.values.fokontany}
            >
              {passMembre.dataPass.lstFokontany.map((item, index)=>{
                return(
                  <Picker.Item 
                      label={item.fokontany} 
                      value={item.fokontany} 
                      key={index.toString()} 
                  />)
            })}
            </Picker>

            <Text style={globalStyles.titleText}>Village</Text>
            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Village'
              onChangeText={props.handleChange('village')}
              onBlur={props.handleBlur('village')}
              value={props.values.village}
            />
            <Text style={globalStyles.errorText}>{props.touched.village && props.errors.village}</Text>

            <Text style={globalStyles.titleText}>Sexe</Text>
            <Picker
              style={{backgroundColor : "#EDFB47"}}
              enabled={true}
              mode="dropdown"
              type = 'Text'
              onValueChange={props.handleChange('h_f')}
              selectedValue={props.values.h_f}
            >
              <Picker.Item label='-----' value={'0'} key={0} />
              <Picker.Item label='Homme' value={'1'} key={1} />
              <Picker.Item label='Femme' value={'2'} key={2} />
            </Picker>
          
            <Text style={globalStyles.errorText}>{props.touched.h_f && props.errors.h_f}</Text>

            <Text style={globalStyles.titleText}>Annee de naissance</Text>
           <TextInput 
              style={globalStyles.input}
              onChangeText={props.handleChange('annee_naissance')}
              onBlur={props.handleBlur('annee_naissance')} 
              value={props.values.annee_naissance}
            />
            <Text style={globalStyles.errorText}>{props.touched.annee_naissance && props.errors.annee_naissance}</Text>
           
            <Text style={globalStyles.titleText}>CIN</Text>
            <TextInputMask 
              // type={'custom'}
              // options={{
                mask= '999 999 999 999'
              // }}
              style={globalStyles.input}
              onChangeText={props.handleChange('cin')}
              onBlur={props.handleBlur('cin')} 
              value={props.values.cin}
            />
            <Text style={globalStyles.errorText}>{props.touched.cin && props.errors.cin}</Text>
             

   
            <Text style={globalStyles.titleText}>Situation matrimoniale</Text>
            <Picker
              style={{backgroundColor : "#EDFB47"}}
              enabled={true}
              mode="dropdown"
              type = 'Text'
              onValueChange={props.handleChange('statut_menage')}
              selectedValue={props.values.statut_menage}
            >
              <Picker.Item label='-----' value={'0'} key={0} />
              <Picker.Item label='Marie' value={'1'} key={1} />
              <Picker.Item label='Celibataire' value={'2'} key={2} />
              <Picker.Item label='Veuf(Veuve)' value={'3'} key={4} />
              <Picker.Item label='Divorce' value={'4'} key={5} />
            </Picker>
            <Text style={globalStyles.errorText}>{props.touched.statut_menage && props.errors.statut_menage}</Text>
  
            <Text style={globalStyles.titleText}>Responsabilite aux niveau grpt</Text>
            <TextInput 
              style={globalStyles.input}
              onChangeText={props.handleChange('respon_niveau_grpt')}
              onBlur={props.handleBlur('respon_niveau_grpt')} 
              value={props.values.respon_niveau_grpt}
            />
            <Text style={globalStyles.errorText}>{props.touched.respon_niveau_grpt && props.errors.respon_niveau_grpt}</Text>
  
            <Text style={globalStyles.titleText}>Surface</Text>
            <TextInput 
              style={globalStyles.input}
              onChangeText={props.handleChange('surface')}
              onBlur={props.handleBlur('surface')} 
              value={props.values.surface}
            />
            <Text style={globalStyles.errorText}>{props.touched.surface && props.errors.surface}</Text>

            <FlatButton onPress={props.handleSubmit} text='ENREGISTRER' />
          </View>
        )}
      </Formik>
    </View>
  );
}