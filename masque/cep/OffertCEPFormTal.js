import React, { useState , useEffect} from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';

export default function OffertFormCEP({ passOffert }) {
    const [openCategorie, setOpenCategorie] = useState(false);
    const [valueCategorie, setValueCategorie] = useState(null);
    const [lstCategorie, setLstCategorie] = useState([
        {label: 'Materiel Agricole', value: 'Materiel Agricole'},
        {label: 'Semence', value: 'Semence'},
        {label: 'Intrant', value: 'Intrant'},
        {label: 'Insecticide', value: 'Insecticide'},
      ]);
    
    const [openDesignation, setOpenDesignation] = useState(false);
    const [valueDesignation, setValueDesignation] = useState(null);
    const [lstDesignation, setLstDesignation] = useState([
        {label: 'Materiel Agricole', value: 'Materiel Agricole'},
        {label: 'Semence', value: 'Semence'},
        {label: 'Intrant', value: 'Intrant'},
        {label: 'Insecticide', value: 'Insecticide'},
    ]);

    const handleForm = (key, value) => {
        setForm((currentForm) => ({
          ...currentForm,
          [key]: value,
        }));
    };
    
    const submitForm = () => {
        console.log('submit this form =>', JSON.stringify(form, false, 2));
        passMembre.add(form);
        // setForm(initialValue)
    };
    
    return (
        <View style={styles.container}> 
            <Card style={styles.card}>
               <Text style={styles.paragraph}>Saise CEP </Text>
            </Card>

            <Text style={styles.label}></Text>
            
            <Card style={styles.card}>
                <View>
                    <View style={{elevation:50,zIndex: 5, position: 'relative'}}>
                        <Text style={styles.label}>Categorie</Text>
                        <DropDownPicker
                            style={styles.input}
                                dropDownContainerStyle={{
                            }}
            
                            open={openCommune}
                            value={valueCommune}
                            items={lstCommune}
                            setOpen={setOpenCommune}
                            setValue={setValueCommune}
                            setItems={setLstCommune}
                            defaultIndex={0}
                            containerStyle={{height: 40}}
                            onChangeItem={item => console.log(item.label, item.value)}
                        />
                    </View>

                    <Text style={styles.label}>Reference</Text>
                    <TextInput
                    style={styles.input}
                    name="ref"
                    onChangeText={(value) => handleForm('ref', value)}
                    value = {form.ref}
                    />
                    </View>
             
         </Card>  
         <Text style={styles.label}></Text>
         <Card style={styles.card}>  
           <View style={styles.buttonContainer}>
             <Button title="Valider" onPress={submitForm} />
           </View>
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
     });
     