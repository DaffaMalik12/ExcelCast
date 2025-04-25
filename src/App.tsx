import { NavigationContainer } from '@react-navigation/native';
import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <NavigationContainer
      linking={{
        enabled: true,  // Set linking as true for enabling deep linking
        prefixes: ['helloworld://'],  // Set your scheme
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    >
      <Navigation /> 
    </NavigationContainer>
  );
}
