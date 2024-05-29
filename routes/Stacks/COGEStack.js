import { createStackNavigator} from '@react-navigation/stack';
import COGE from '../../masque/coge/COGE';
import BenefCOGE from '../../masque/coge/benefCoge';
import MembreFamilleBenefCOGE from '../../masque/coge/MembreFamilleBenef';

const COGEStack = createStackNavigator();
function COGEStackScreen() {
  return (
    <COGEStack.Navigator>
      <COGEStack.Screen name="Commité des gestions" component={COGE} />
      <COGEStack.Screen name="Membre COGE" component={BenefCOGE}/>
      <COGEStack.Screen name="Membre famille des membres COGE" component={MembreFamilleBenefCOGE}/>
      
      {/* <AUEStack.Screen name="Dotation AUE" component={OffertBenef}/> */}
    </COGEStack.Navigator>
  );
}

export default COGEStackScreen