import { Button, View, Text } from 'react-native';

function EnvironmtScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Protection environnemental</Text>
        {/* <Button 
        onPress={() => navigation.goBack()}
        title="Go back home"
        /> */}
      </View>
    );
}

export default EnvironmtScreen