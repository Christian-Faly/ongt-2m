import { createStackNavigator} from '@react-navigation/stack';
import Parametrage from '../../masque/xdev/Parametrage'
import Tables from '../../masque/xdev/tables'
import ParamaComTab from '../../masque/comTab/ParamComTab';

const ParamComTabStack = createStackNavigator();
function ParamComTabStackScreen() {
  return (
    <ParamComTabStack.Navigator>
      <ParamComTabStack.Screen name="Tablette" component={ParamaComTab} />
      <ParamComTabStack.Screen name="Tables" component={Tables} />
    </ParamComTabStack.Navigator>
  );
}

export default ParamComTabStackScreen