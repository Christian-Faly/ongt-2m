import { createStackNavigator} from '@react-navigation/stack';
import RbmCom from '../../masque/rbmCom/rbmCom';
import RbmComDotat from '../../masque/rbmCom/rbmComDotat';

const RbmComStack = createStackNavigator();
function RbmComStackScreen() {
  return (
    <RbmComStack.Navigator>
      <RbmComStack.Screen name="RBM Communautaire" component={RbmCom}/>
      <RbmComStack.Screen name="RBMCom Dotation" component={RbmComDotat}/>
    </RbmComStack.Navigator>
  );
}

export default RbmComStackScreen