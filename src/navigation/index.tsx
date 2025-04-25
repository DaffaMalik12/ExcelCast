import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from '@react-navigation/elements';
import Splash from './screens/SplashScreen';
import Home from './screens/Home';


export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerBackVisible: false,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/image.png')}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>ExcelCast</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
