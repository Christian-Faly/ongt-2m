import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

const AppLoader = () => {
  return (
    <View style = {[StyleSheet.absoluteFillObject,styles.container]}>
       <LottieView source={require('../assets/animation_llpznizo.json')}
        autoPlay loop />
     </View>
  );
}
const  styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgb(0,0,0,0.3)',
        zIndex:1
    }
})
export default AppLoader;