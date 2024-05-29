import { createStackNavigator} from '@react-navigation/stack';
import OffertRBM from '../../masque/rbm/offertRBM';
import RBM from '../../masque/rbm/RBM';
import BenefRBM from '../../masque/rbm/benefRBM';
import MembreFamilleBenefRBM from '../../masque/rbm/MembreFamilleBenef';
import OffertBenefRBM from '../../masque/rbm/offertBenefRBM';

const RBMStack = createStackNavigator();
function RBMStackScreen() {
  return (
    <RBMStack.Navigator>
      <RBMStack.Screen name="Lot de distribution" component={RBM} />
      <RBMStack.Screen name="Bénéficiaire RBM" component={BenefRBM}/>
      <RBMStack.Screen name="Membre famille beneficiaire RBM" component={MembreFamilleBenefRBM}/>
      <RBMStack.Screen name="Dotation bénéficiaire RBM" component={OffertBenefRBM}/>
      {/* <RBMStack.Screen name="Dotation RBM" component={OffertRBM}/> */}
    </RBMStack.Navigator>
  );
}

export default RBMStackScreen