import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { LoginRegister } from './screens/LoginRegister';
import { Home } from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const HomeNav = () => {
    return (
      <TouchableOpacity style={styles.connectBtn}>
        <Image source={require('./assets/wifiLogo.png')} />
        <Text style={styles.connectBtnText}>Connect a smart watch</Text>
      </TouchableOpacity>
    )
  }
  const HomeNavRight = () => {
    return (
      <View style={styles.homeNavRight}>
        <TouchableOpacity><Image source={require('./assets/bell.png')} /></TouchableOpacity>
        <TouchableOpacity><Image source={require('./assets/hamburger.png')} /></TouchableOpacity>
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen name="Login" component={LoginRegister} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home}
          options={{
            headerTitle: () => <HomeNav />,
            headerBackVisible: false,
            headerRight: () => <HomeNavRight />
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  connectBtn: {
    backgroundColor: '#E78500',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginVertical: 20
  },
  connectBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  },
  homeNavRight: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginVertical: 20
  },
});