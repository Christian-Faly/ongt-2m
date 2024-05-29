import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from "react-native-paper";
  
const Enregistrer = () => {
  
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postName: 'React updates ' })
    };
  
    const postExample = async () => {
        try {
            await fetch(
                'https://reqres.in/api/posts', membre_cep)
                .then(response => {
                    response.json()
                        .then(data => {
                            Alert.alert("Post created at : ", 
                            data.createdAt);
                        });
                })
        }
        catch (error) {
            console.error(error);
        }
    }
  
    return (
        <View style={styles.btn}>
            <Button mode="contained" onPress={postExample} >
                add </Button>
        </View>
    )
  
}
  
export default Enregistrer;
  
const styles = StyleSheet.create({
    btn: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30
    }
})