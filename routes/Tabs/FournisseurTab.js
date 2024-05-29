import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {StyleSheet,Image,View,Text} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import PepineristeStackScreen from '../Stacks/PepineristeStack';
import PaysanSemStackScreen from '../Stacks/PaysanSem';
import BIStackScreen from '../Stacks/BIStack';
import PMAStackScreen from '../Stacks/PMAStack';


// import FabMatAgriStackScreen from '../Stacks/FabMatAgriStack';
// import BoutikIntrantStackScreen from '../Stacks/BoutikIntrantStack';


const Tab = createBottomTabNavigator();

export default function FournisseurTab() {
  return (
    <Tab.Navigator
       screenOptions={{
            tabBarShowLabel: "false",
              "tabBarStyle": [
                      {
                        
                        position:"absolute",
                        button:25,
                        left:5,
                        right:5,
                        elevation:2,
                        backgroundColor:'white',
                        borderRadius:20,
                        height:100,
                        marginBottom: 15,
                        ...styles.shadow

                      },
                      null
                    ]
                  }}
    
    >
        <Tab.Screen name='Pepineriste'  component={PepineristeStackScreen}
         options={{
          tabBarIcon:({focused}) =>(
            <View style={{alignItems:'center',justifyContent:'center',top:10}}>
              <Image source={require('../../assets/icons/pepiniere.png')} 
                resizeMode='contain'
               style={{
                  width:25,
                  height:25,
                  tintColor: focused ?'#2980B9':'black'}}
                 />
            </View>
          )
         }}
         
         />

        <Tab.Screen name="Paysan Semencier" component={PaysanSemStackScreen}
             options={{
              tabBarIcon:({focused}) =>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                  <Image source={require('../../assets/icons/plantation.png')} 
                    resizeMode='contain'
                   style={{
                      width:25,
                      height:25,
                      tintColor: focused ?'#2980B9':'black'}}
                      />
                 </View>
        
          )
             }}
             
        />
        <Tab.Screen name="Fab. Maté. Agri" component={PMAStackScreen}
             options={{
              tabBarIcon:({focused}) =>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                  <Image source={require('../../assets/icons/machine-a-grue.png')} 
                    resizeMode='contain'
                   style={{
                      width:30,
                      height:30,
                      tintColor: focused ?'#2980B9':'black'}}
                     />
                </View>
              )
             }}
             
        />
        <Tab.Screen name="Boutique Intrant" component={BIStackScreen}
             options={{
              tabBarIcon:({focused}) =>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                  <Image source={require('../../assets/icons/boutik.png')} 
                    resizeMode='contain'
                   style={{
                      width:30,
                      height:30,
                      tintColor: focused ?'#2980B9':'black'}}
                     />
                </View>
              )
             }}
             
        />
</Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  shadow:{
    shodowColor:'black',
    shodowOffset:{
      width:0,
      height:20,
    },
    shodowOpacity:'0,5',
    showdowRadius:'3,5',
    elevation:5
  }

})