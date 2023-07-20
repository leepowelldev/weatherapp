/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Router } from './router';
import { CurrentLocationProvider } from './contexts';
import './env';
import { PaperProvider } from 'react-native-paper';

export function App(): JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <CurrentLocationProvider>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </CurrentLocationProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
