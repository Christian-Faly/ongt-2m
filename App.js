import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProjetTab from './routes/Tabs/ProjetTab';
import AccueilScreen from './routes/Screens/Accueil';
import { Alert } from 'react-native';
import ParamStackScreen from './routes/Stacks/ParamStack'
import CustomDrawer from './styles/CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import EnvTab from './routes/Tabs/EnvTab';
import FournisseurTab from './routes/Tabs/FournisseurTab';
import ParamComTabStackScreen from './routes/Stacks/ParamComTabStack';
import CommercialStackScreen from './routes/Stacks/CommercialStack';
import AssociationTab from './routes/Tabs/AssociationTab';

const Drawer = createDrawerNavigator();

export default function App() {
  const [programmeur,setProgrammeur]=useState(false)
  const showAlert = () =>
  Alert.alert(
    "Attention !!!",
    "Etes-vous programmeur?",
    [
      {
        text: "Non",
        style: "cancel",
      },
      {
        text: "Oui",
        // onPress: () => deleteNom(id),
        // style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
  // showAlert()
    return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Notification" drawerContent={props => <CustomDrawer {...props} />} screenOptions={{headerStyle:{backgroundColor:'#BAB7B7'}, drawerActiveBackgroundColor:'#008080', drawerActiveTintColor:'#fff', drawerStyle:{ width: 400}}} >
        <Drawer.Screen name="Acceuil" component={AccueilScreen} options={{drawerIcon: ({color}) => (<Ionicons name="home-outline" size={22} color={color}/> )}} />
        <Drawer.Screen name="Projet" component={ProjetTab} options={{drawerIcon: ({color}) => (<Ionicons name="newspaper-outline" size={22} color={color}/> )}}/>
        <Drawer.Screen name="Protection environnementale" component={EnvTab}  options={{drawerIcon: ({color}) => (<Ionicons name="earth-outline" size={22} color={color}/> )}}/>
        <Drawer.Screen name="Association et comité des gestions" component={AssociationTab} options={{drawerIcon: ({color}) => (<Ionicons name="people-circle-outline" size={22} color={color}/> )}}/>
        <Drawer.Screen name="Fournisseurs" component={FournisseurTab} options={{drawerIcon: ({color}) => (<Ionicons name="man" size={22} color={color}/> )}}/>
        <Drawer.Screen name="Commercialisation" component={CommercialStackScreen} options={{drawerIcon: ({color}) => (<Ionicons name="cart" size={22} color={color}/> )}}/>
        <Drawer.Screen name="Récupération paramètre serveur" component={ParamStackScreen} options={{drawerIcon: ({color}) => (<Ionicons name="settings-outline" size={22} color={color}/> )}}/>
        <Drawer.Screen name="Paramètrage commune Tablette" component={ParamComTabStackScreen} options={{drawerIcon: ({color}) => (<Ionicons name="cog" size={22} color={color}/> )}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
