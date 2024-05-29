import { createStackNavigator} from '@react-navigation/stack';
import Parametrage from '../../masque/xdev/Parametrage'
import Tables from '../../masque/xdev/tables'
import { TabBScreen } from '../Screens/CEPScreen';

const InfraStack = createStackNavigator();
function InfraStackScreen() {
  return (
    <InfraStack.Navigator>
      <InfraStack.Screen name="Suivi des travaux en cours" component={TabBScreen} />
    </InfraStack.Navigator>
  );
}

export default InfraStackScreen