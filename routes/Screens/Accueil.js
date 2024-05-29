import { Button, View, Text ,StyleSheet,Image} from 'react-native';
import { FormStyles, globalStyles } from '../../styles/global';

function AccueilScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../../assets/image/banier.png')} 
                    resizeMode='contain'
                   style={{
                    position: 'absolute',
                    top: -10,
                    left: 10,
                    width: 800
                    }}
                      />
        
        {/* <Image source={require('../assets/logo_ad2m.png')} style={{height:80, width:80, borderRadius:40, marginBottom:10}}/> */}
        <Text style={globalStyles.paragraph}>PROJET D’APPUI AU DEVELOPPEMENT DU MENABE ET DU MELAKY</Text>
        <Text style={globalStyles.paragraph}> PHASE II (AD2M II) </Text>
      </View>
      
    );
}

export default AccueilScreen