import { createStackNavigator} from '@react-navigation/stack';
import RBM from '../../masque/rbm/RBM';
import BenefFA from '../../masque/F.A/benefFA';
import OffertBenefFA from '../../masque/F.A/offertBenefFA';
import FA from '../../masque/F.A/FA';
import MembreFamilleBenef from '../../masque/F.A/MembreFamilleBenef';

const FAStack = createStackNavigator();
function FAStackScreen() {
  return (
    <FAStack.Navigator>
      <FAStack.Screen name="Foyer améliorer" component={FA} />
      <FAStack.Screen name="Beneficiaire FA" component={BenefFA}/>
      <FAStack.Screen name="Membre famille beneficiaire FA" component={MembreFamilleBenef}/>
      <FAStack.Screen name="Dotation FA" component={OffertBenefFA}/>
    </FAStack.Navigator>
  );
}

export default FAStackScreen