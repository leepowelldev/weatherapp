import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ForecastScreen, HomeScreen } from './screens';

const { Navigator, Screen } = createNativeStackNavigator();

export function Router(): JSX.Element {
  return (
    <Navigator initialRouteName={routes.home}>
      <Screen name={routes.home} component={HomeScreen} />
      <Screen name={routes.forecast} component={ForecastScreen} />
    </Navigator>
  );
}

export const routes = {
  home: 'Home',
  forecast: 'Forecast',
};
