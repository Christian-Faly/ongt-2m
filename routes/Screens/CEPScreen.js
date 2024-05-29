import { Button, View, Text } from 'react-native';

function CEPHomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Text>
          Champs Ecole Paysan
        </Text>
        <Button 
        onPress={() => navigation.navigate('TabA Details')}
        title="Go to TabA Details"
        />
      </View>
    );
  }
  
  function Details() {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Text>
          TabA Details here!
        </Text>
      </View>
    );
  }
  
  function TabBScreen() {
    return (
      <View>
        <Text style={{textAlign: 'center', marginTop: 300}}>
           Tab saisie MPV
        </Text>
      </View>
    );
  }
  
  export {CEPHomeScreen,Details,TabBScreen}
  
  