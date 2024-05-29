import { createStackNavigator} from '@react-navigation/stack';
import PMA from '../../masque/pma/pma';
import ExploitationPMA from '../../masque/pma/exploitPMA';
import AppuisPMA from '../../masque/pma/appuisPMA';
import VentePMA from '../../masque/pma/ventePMA';

const PepineristeStack = createStackNavigator();
function PepineristeStackScreen() {
  return (
    <PepineristeStack.Navigator>
      <PepineristeStack.Screen name="Producteur de Materiel Agricole" component={PMA} />
      <PepineristeStack.Screen name="Exploitation PMA" component={ExploitationPMA}/>
      <PepineristeStack.Screen name="Vente PMA" component={VentePMA}/>
      <PepineristeStack.Screen name="Appuis PMA" component={AppuisPMA}/>
    </PepineristeStack.Navigator>
  );
}

export default PepineristeStackScreen