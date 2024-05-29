import { createStackNavigator} from '@react-navigation/stack';
import AUE from '../../masque/aue/AUE';
import BenefAUE from '../../masque/aue/benefAUE';
import OffertAUE from '../../masque/aue/offertAUE';
import MembreFamilleBenefAUE from '../../masque/aue/MembreFamilleBenef';

const AUEStack = createStackNavigator();
function AUEStackScreen() {
  return (
    <AUEStack.Navigator>
      <AUEStack.Screen name="Association des usages de l'eau (AUE)" component={AUE} />
      <AUEStack.Screen name="Membre AUE" component={BenefAUE}/>
      <AUEStack.Screen name="Membre famille des membres AUE" component={MembreFamilleBenefAUE}/>
      <AUEStack.Screen name="Dotation AUE" component={OffertAUE}/>
    </AUEStack.Navigator>
  );
}

export default AUEStackScreen