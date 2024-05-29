import { createStackNavigator} from '@react-navigation/stack';
import Pepiniere from '../../masque/pepineriste/pepiniere';
import ExploitationPP from '../../masque/pepineriste/exploitationPP';
import VentePP from '../../masque/pepineriste/ventePP';
import AppuisPP from '../../masque/pepineriste/appuisPP';

const PepineristeStack = createStackNavigator();
function PepineristeStackScreen() {
  return (
    <PepineristeStack.Navigator>
      <PepineristeStack.Screen name="Pépinière" component={Pepiniere} />
      <PepineristeStack.Screen name="Exploitation PP" component={ExploitationPP}/>
      <PepineristeStack.Screen name="Vente PP" component={VentePP}/>
      <PepineristeStack.Screen name="Appuis PP" component={AppuisPP}/>
    </PepineristeStack.Navigator>
  );
}

export default PepineristeStackScreen