import { createStackNavigator} from '@react-navigation/stack';
import AUE from '../../masque/aue/AUE';
import OffertFederationU from '../../masque/federationUnion/offertFederationU';
import BenefFederationU from '../../masque/federationUnion/benefFederationU';
import FederationU from '../../masque/federationUnion/federationU';

const FederationStackScreen = createStackNavigator();
function FederationUnionStackScreen() {
  return (
    <FederationStackScreen.Navigator>
      <FederationStackScreen.Screen name="FederationU" component={FederationU} />
      <FederationStackScreen.Screen name="Membre Federation/Union" component={BenefFederationU}/>
      <FederationStackScreen.Screen name="Dotation Federation" component={OffertFederationU}/>
    </FederationStackScreen.Navigator>
  );
}

export default FederationUnionStackScreen