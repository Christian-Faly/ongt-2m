import { createStackNavigator} from '@react-navigation/stack';
import MembreMPV from '../../masque/mpv/membreMPV';
import MPV from '../../masque/mpv/MPV';
import OffertMPV from '../../masque/mpv/offertMPV';
import SpeculationMPV from '../../masque/mpv/speculationMPV';
import OffertMembreMPV from '../../masque/mpv/offertMembreMPV';
import MembreFamilleBenefMPV from '../../masque/cep/MembreFamilleBenef';


const CEPStack = createStackNavigator();
function MPVStackScreen() {
  return (
    <CEPStack.Navigator>
      <CEPStack.Screen name="Type speculation MPV" component={SpeculationMPV} />
      <CEPStack.Screen name="Micro Projet Vulnerable (MPV)" component={MPV} />
      <CEPStack.Screen name="Membres MPV" component={MembreMPV}/>
      <CEPStack.Screen name="Membre famille beneficiaire MPV" component={MembreFamilleBenefMPV}/>
      <CEPStack.Screen name="Dotation MPV" component={OffertMPV}/>
      <CEPStack.Screen name="Dotation Membres MPV" component={OffertMembreMPV}/>
    </CEPStack.Navigator>
  );
}

export default MPVStackScreen