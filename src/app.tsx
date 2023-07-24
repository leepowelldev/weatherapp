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
import { CurrentLocationProvider, FavouritesProvider } from './contexts';
import './env';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={client}>
      <PaperProvider>
        <SafeAreaProvider>
          <CurrentLocationProvider>
            <FavouritesProvider>
              <NavigationContainer>
                <Router />
              </NavigationContainer>
            </FavouritesProvider>
          </CurrentLocationProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
