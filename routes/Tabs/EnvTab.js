import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {StyleSheet,Image,View,Text} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import RBMStackScreen from '../Stacks/RBMStack';
import FAStackScreen from '../Stacks/FAStack';
import { TabBScreen } from '../Screens/CEPScreen';
import ProtectEnvStackScreen from '../../masque/p.env/ProtectENV';
import RbmCom from '../../masque/rbmCom/rbmCom';
import RbmComStackScreen from '../Stacks/RbmComStack';


const Tab = createBottomTabNavigator();

export default function EnvTab() {
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
        <Tab.Screen name="RBM Individuel" component={RBMStackScreen}
              options={{
                tabBarIcon:({focused}) =>(
                  <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                    <Image source={require('../../assets/icons/reboisement.png')} 
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
          <Tab.Screen name="RBM COMM" component={RbmComStackScreen}
              options={{
                tabBarIcon:({focused}) =>(
                  <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                    <Image source={require('../../assets/icons/reb1.png')} 
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
          <Tab.Screen name="Protection des ouvrages" component={ProtectEnvStackScreen}
              options={{
                tabBarIcon:({focused}) =>(
                  <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                    <Image source={require('../../assets/icons/reb2.png')} 
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
        <Tab.Screen name="F.A" component={FAStackScreen}
              options={{
                tabBarIcon:({focused}) =>(
                  <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                    <Image source={require('../../assets/icons/fa.png')} 
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