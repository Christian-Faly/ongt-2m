import { createStackNavigator} from '@react-navigation/stack';
import AUP from '../../masque/aup/AUP';
import BenefAUP from '../../masque/aup/benefAup';
import MembreFamilleBenefAUP from '../../masque/aup/MembreFamilleBenef';
import OffertAUP from '../../masque/aup/offertAUP';

const AUPStack = createStackNavigator();
function AUPStackScreen() {
  return (
    <AUPStack.Navigator>
     
      <AUPStack.Screen name="Association des usages de pistes (AUP)" component={AUP} />
      <AUPStack.Screen name="Membre AUP" component={BenefAUP}/>
      <AUPStack.Screen name="Membre famille des membres AUP" component={MembreFamilleBenefAUP}/>
      {/* <AUPStack.Screen name="Dotation beneficiaire AUP" component={OffertBenefAUP}/> */}
      <AUPStack.Screen name="Dotation AUP" component={OffertAUP}/>
    </AUPStack.Navigator>
  );
}

export default AUPStackScreen