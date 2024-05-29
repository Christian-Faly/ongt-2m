import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CEPStackScreen from '../Stacks/CEPStack'
import { TabBScreen} from '../Screens/CEPScreen' 
import { Ionicons } from '@expo/vector-icons';
import MPVStackScreen from '../Stacks/MPVStack';
import {StyleSheet,Image,View,Text} from 'react-native';


const Tab = createBottomTabNavigator();

export default function ProjetTab() {
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
        <Tab.Screen name="CEP" component={CEPStackScreen}
            options={{
              tabBarIcon:({focused}) =>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                  <Image source={require('../../assets/icons/champ.png')} 
                    resizeMode='contain'
                   style={{
                      width:25,
                      height:25,
                      tintColor: focused ?'#2980B9':'black'}}
                      />
                 </View>
        
          )
             }}/>
        <Tab.Screen name="MPV" component={MPVStackScreen}
            options={{
              tabBarIcon:({focused}) =>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                  <Image source={require('../../assets/icons/individus.png')} 
                    resizeMode='contain'
                   style={{
                      width:25,
                      height:25,
                      tintColor: focused ?'#2980B9':'black'}}
                      />
                 </View>
        
          )
             }} />
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