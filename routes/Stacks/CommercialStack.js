import { createStackNavigator} from '@react-navigation/stack';
import MembreOP from '../../masque/commercialisation/membreOP';
import VenteOP from '../../masque/commercialisation/venteOP';
import AppuisOP from '../../masque/commercialisation/appuisOP';
import OPCommerciale from '../../masque/commercialisation/opCommerciale';

const CommercialStack = createStackNavigator();
function CommercialStackScreen() {
  return (
    <CommercialStack.Navigator>
      <CommercialStack.Screen name="OP Commerciale" component={OPCommerciale} />
      <CommercialStack.Screen name="Membres OP Commerciale" component={MembreOP} />
      <CommercialStack.Screen name="Mise en relation OM" component={VenteOP} />
      <CommercialStack.Screen name="Appuis OP Commerciale" component={AppuisOP} />
    </CommercialStack.Navigator>
  );
}

export default CommercialStackScreen