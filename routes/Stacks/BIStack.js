import { createStackNavigator} from '@react-navigation/stack';
import BI from '../../masque/bi/bi';
import AppuisBI from '../../masque/bi/appuisBI';
import VenteBI from '../../masque/bi/venteBI';

const PepineristeStack = createStackNavigator();
function PepineristeStackScreen() {
  return (
    <PepineristeStack.Navigator>
      <PepineristeStack.Screen name="Boutiquee Intrant" component={BI} />
      <PepineristeStack.Screen name="Vente BI" component={VenteBI}/>
      <PepineristeStack.Screen name="Appuis BI" component={AppuisBI}/>
    </PepineristeStack.Navigator>
  );
}

export default PepineristeStackScreen