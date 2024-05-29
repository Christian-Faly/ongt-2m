import React, { useState , useEffect} from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';

const offertSchema = yup.object({
  designation: yup.string()
    .required(),
  quantite: yup.number()
    .required(),
  });

export default function OffertForm({ passOffert }) {
  
  return (
    <View style={globalStyles.container}>
      
      <Formik
        initialValues={{ designation: '', quantite : 0, id_membre: passOffert.toUpdate.id }}
        validationSchema={offertSchema}
        enableReinitialize ={true}
  
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          passOffert.add(values);
        }
      }
      >
        {props => (
          <View>
{/*             
            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='id_membre'
              onChangeText={props.handleChange('id_membre')}
              onBlur={props.handleBlur('id_membre')}
              value={props.values.id_membre}
            /> */}
            
            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Designation'
              onChangeText={props.handleChange('designation')}
              onBlur={props.handleBlur('designation')}
              value={props.values.designation}
            />
            <Text style={globalStyles.errorText}>{props.touched.designation && props.errors.designation}</Text>
            
            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Quantite'
              onChangeText={props.handleChange('quantite')}
              onBlur={props.handleBlur('quantite')}
              value={props.values.quantite}
            />
            <Text style={globalStyles.errorText}>{props.touched.quantite && props.errors.quantite}</Text>
            
            <FlatButton onPress={props.handleSubmit} text='ENREGISTRER' />
          </View>
        )}
      </Formik>
    </View>
  );
}