import { createStackNavigator} from '@react-navigation/stack';
import PaysanSem from '../../masque/paysanSem/paysanSem';
import ExploitationPS from '../../masque/paysanSem/exploitationPS';
import VentePS from '../../masque/paysanSem/ventePS';
import AppuisPS from '../../masque/paysanSem/appuisPS';
// import PaysanSem from '../../masque/paysanSem/paysanSem';

const PaysanSemStack = createStackNavigator();
function PaysanSemStackScreen() {
  return (
    <PaysanSemStack.Navigator>
      <PaysanSemStack.Screen name="PaysanSem" component={PaysanSem} />
      <PaysanSemStack.Screen name="Exploitation PS" component={ExploitationPS}/>
      <PaysanSemStack.Screen name="Vente PS" component={VentePS}/>
      <PaysanSemStack.Screen name="Appuis PS" component={AppuisPS}/>
    </PaysanSemStack.Navigator>
  );
}

export default PaysanSemStackScreen