import { createStackNavigator} from '@react-navigation/stack';
import SpeculationCEP from '../../masque/cep/speculationCEP';
import CEP from '../../masque/cep/CEP';
import MembreCEP from '../../masque/cep/membreCEP';
import OffertCEP from '../../masque/cep/offertCEP';
import OffertMembreCEP from '../../masque/cep/offertMembreCEP';
import { FormStyles } from '../../styles/global';
import MembreFamilleBenefCEP from '../../masque/cep/MembreFamilleBenef';


const CEPStack = createStackNavigator();
function CEPStackScreen() {
  return (
    <CEPStack.Navigator>
      <CEPStack.Screen name="Type speculation CEP" component={SpeculationCEP} style={FormStyles.card} />
      <CEPStack.Screen name="Champs Ecole Paysan (CEP)" component={CEP} />
      <CEPStack.Screen name="Membres CEP" component={MembreCEP}/>
      <CEPStack.Screen name="Membre famille beneficiaire CEP" component={MembreFamilleBenefCEP}/>
      <CEPStack.Screen name="Dotation CEP" component={OffertCEP}/>
      <CEPStack.Screen name="Dotation Membres CEP" component={OffertMembreCEP}/>
    </CEPStack.Navigator>
  );
}

export default CEPStackScreen