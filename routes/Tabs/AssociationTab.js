import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {StyleSheet,Image,View,Text} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
// import { TabBScreen } from '../Screens/CEPScreen';
import AUEStackScreen from '../Stacks/AUEStack';
import AUPStackScreen from '../Stacks/AUPStack';
import COGEStackScreen from '../Stacks/COGEStack';
import FederationUnionStackScreen from '../Stacks/FederationUnionStack';


const Tab = createBottomTabNavigator();

export default function AssociationTab() {
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
        <Tab.Screen name='AUE'  component={AUEStackScreen}
         options={{
          tabBarIcon:({focused}) =>(
            <View style={{alignItems:'center',justifyContent:'center',top:10}}>
              <Image source={require('../../assets/icons/eau.png')} 
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
        <Tab.Screen name="AUP" component={AUPStackScreen}
             options={{
              tabBarIcon:({focused}) =>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                  <Image source={require('../../assets/icons/piste.png')} 
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
        <Tab.Screen name="COGE PEC" component={COGEStackScreen}
             options={{
              tabBarIcon:({focused}) =>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                  <Image source={require('../../assets/icons/groupe.png')} 
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
         <Tab.Screen name="Federation/Union" component={FederationUnionStackScreen}
             options={{
              tabBarIcon:({focused}) =>(
                <View style={{alignItems:'center',justifyContent:'center',top:10}}>
                  <Image source={require('../../assets/icons/travail-en-equipe.png')} 
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