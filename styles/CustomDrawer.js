import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, ImageBackground, Image, BackHandler } from 'react-native';
import { Button } from 'react-native-paper';

const CustomDrawer = (props) => {
    return (
       
       <View style={{flex:1}}>
        <DrawerContentScrollView
            {...props} 
            contentContainerStyle={{backgroundColor:'#fff'}}>
            <ImageBackground source={require('../assets/font_back.jpg')} style={{padding:20 }}>
                <Image source={require('../assets/logo_ad2m.png')} style={{height:80, width:80, borderRadius:40, marginBottom:10}}/>
                <Text style={{color:'#000', fontSize:18,fontWeight: "bold"}}>AD2M - ONGT</Text>
            </ImageBackground>
            <View style={{flex:1, backgroundColor:'#fff', paddingTop:10}}>
                <DrawerItemList {...props}/>
            </View>
        </DrawerContentScrollView>
        <View>
            <Button onPress ={
                            ()=>{
                            return BackHandler.exitApp();
                            }
            }> <Image source={require('../assets/icons/logout.jpeg')} 
                        resizeMode='contain'
                        style={{
                            width:20,
                            height:20,
                        }}
            />  Quitter l'Application</Button>
            <Text></Text>
            <Text></Text>
        </View>
       </View>
    )
}
export default CustomDrawer