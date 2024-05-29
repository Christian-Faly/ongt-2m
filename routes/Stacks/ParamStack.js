import { createStackNavigator} from '@react-navigation/stack';
import Parametrage from '../../masque/xdev/Parametrage'
import Tables from '../../masque/xdev/tables'

const ParamStack = createStackNavigator();
function ParamStackScreen() {
  return (
    <ParamStack.Navigator>
      <ParamStack.Screen name="Parametrage BDD" component={Parametrage} />
      <ParamStack.Screen name="Tables" component={Tables} />
    </ParamStack.Navigator>
  );
}

export default ParamStackScreen