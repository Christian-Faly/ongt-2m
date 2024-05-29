import { createStackNavigator} from '@react-navigation/stack';
import ProtectEnv from '../../masque/p.env/ProtectENV';


const RBMStack = createStackNavigator();
function RBMStackScreen() {
  return (
    <RBMStack.Navigator>
      <RBMStack.Screen name="protection" component={ProtectEnv} />
    </RBMStack.Navigator>
  );
}

export default RBMStackScreen