import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const globalStyles = StyleSheet.create({
  Button: {
    elevation: 8,
    backgroundColor: 'white',
    // "#32CD32",
    borderRadius: 10,
    paddingVertical: 10,
    width:'100%',
    paddingHorizontal: 12,
    textAlign: 'center', 
    color:'black'   

  },
  Card:{
   borderRadius: 50,
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#008080'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    Color: '#EDFB47',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
 
 
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  paragraph: {
    margin: 2,
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: { width: 2, height: 2 },
    textShadowColor: '#00FF00',
    textShadowRadius: 6,
    fontSize: 40,
    color: 'red',
  },

});


export const ButtonStyles = StyleSheet.create({
  Button:{
    
    backgroundColor: "#808000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position:'relative',
  }
})

export const FormStyles = StyleSheet.create({
  Button:{
    backgroundColor:'red'
    },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#008080',
    padding: 8,
  },
  inputSearchStyle:{
    height:40,
    fontSize:16
  },
  Button:{
    backgroundColor:'white'
  },
  SelectedTextStyle:{
    fontSize:16
  }  ,  

  paragraph: {
    margin: 2,
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: { width: 2, height: 2 },
    textShadowColor: 'black',
    textShadowRadius: 6,
    fontSize: 20,
    color: '#22AA44',
  },
  card: {
    padding: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:1.5,
    borderRadius:25,
    
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
    backgroundColor: "#008080",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    position:'relative',
       

  },
  text:{
    textAlign: 'center',
    color:'white',
    fontWeight: 'bold'
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

export const images = {
  ratings: {
    '1': require('../assets/rating-1.png'),
    '2': require('../assets/rating-2.png'),
    '3': require('../assets/rating-3.png'),
    '4': require('../assets/rating-4.png'),
    '5': require('../assets/rating-5.png'),
  }
};