import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  CurrentLocationIndexScreen,
  CurrentLocationForecastScreen,
  SearchScreen,
  SavedIndexScreen,
  SavedDetailScreen,
} from './screens';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';

const { Navigator: CurrentLocationNavigator, Screen: CurrentLocationScreen } =
  createNativeStackNavigator();
const { Navigator: SavedNavigator, Screen: SavedScreen } =
  createNativeStackNavigator();
const { Navigator: RootTabsNavigator, Screen: RootTabsScreen } =
  createBottomTabNavigator();

function CurrentLocationStack(): JSX.Element {
  return (
    <CurrentLocationNavigator initialRouteName="Index">
      <CurrentLocationScreen
        name="Index"
        component={CurrentLocationIndexScreen}
      />
      <CurrentLocationScreen
        name="Forecast"
        component={CurrentLocationForecastScreen}
      />
    </CurrentLocationNavigator>
  );
}

function SavedStack(): JSX.Element {
  return (
    <SavedNavigator initialRouteName="Index">
      <SavedScreen name="Index" component={SavedIndexScreen} />
      <SavedScreen name="Detail" component={SavedDetailScreen} />
    </SavedNavigator>
  );
}

export function Router(): JSX.Element {
  return (
    <RootTabsNavigator initialRouteName="CurrentLocation">
      <RootTabsScreen name="CurrentLocation" component={CurrentLocationStack} />
      <RootTabsScreen name="Search" component={SearchScreen} />
      <RootTabsScreen name="Saved" component={SavedStack} />
    </RootTabsNavigator>
  );
}

/**
 * PARAMETER LISTS
 */

export type CurrentLocationStackParamList = {
  Index: undefined;
  Forecast: undefined;
};

export type SavedStackParamList = {
  Index: undefined;
  Detail: undefined;
};

export type RootTabsParamList = {
  CurrentLocation: NavigatorScreenParams<CurrentLocationStackParamList>;
  Search: undefined;
  Saved: NavigatorScreenParams<SavedStackParamList>;
};

/**
 * SCREEN PROPS
 */

export type CurrentLocationIndexScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CurrentLocationStackParamList, 'Index'>,
  BottomTabScreenProps<RootTabsParamList, 'CurrentLocation'>
>;

export type CurrentLocationForecastScreenProps = CompositeScreenProps<
  NativeStackScreenProps<CurrentLocationStackParamList, 'Forecast'>,
  BottomTabScreenProps<RootTabsParamList, 'CurrentLocation'>
>;

export type SearchScreenProps = BottomTabScreenProps<
  RootTabsParamList,
  'Search'
>;

export type SavedIndexScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SavedStackParamList, 'Index'>,
  BottomTabScreenProps<RootTabsParamList, 'Saved'>
>;

export type SavedDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SavedStackParamList, 'Detail'>,
  BottomTabScreenProps<RootTabsParamList, 'Saved'>
>;
