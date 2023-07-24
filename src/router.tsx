import React from 'react';
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  CurrentLocationIndexScreen,
  CurrentLocationForecastScreen,
  SearchIndexScreen,
  FavouritesIndexScreen,
  FavouritesDetailScreen,
  FavouritesDetailScreenParams,
} from './screens';
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  SearchDetailScreen,
  SearchDetailScreenParams,
} from './screens/search-detail-screen';

/**
 * PARAMETER LISTS
 */

export type RootTabsParamList = {
  CurrentLocation: NavigatorScreenParams<CurrentLocationStackParamList>;
  Search: undefined;
  Favourites: NavigatorScreenParams<FavouritesStackParamList>;
};

export type CurrentLocationStackParamList = {
  Index: undefined;
  Forecast: undefined;
};

export type SearchStackParamList = {
  Index: undefined;
  Detail: SearchDetailScreenParams;
};

export type FavouritesStackParamList = {
  Index: undefined;
  Detail: FavouritesDetailScreenParams;
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

export type SearchIndexScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, 'Index'>,
  BottomTabScreenProps<RootTabsParamList, 'Search'>
>;

export type SearchDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, 'Detail'>,
  BottomTabScreenProps<RootTabsParamList, 'Search'>
>;

export type FavouritesIndexScreenProps = CompositeScreenProps<
  NativeStackScreenProps<FavouritesStackParamList, 'Index'>,
  BottomTabScreenProps<RootTabsParamList, 'Favourites'>
>;

export type FavouritesDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<FavouritesStackParamList, 'Detail'>,
  BottomTabScreenProps<RootTabsParamList, 'Favourites'>
>;

/**
 * NAVIGATORS
 */

const { Navigator: RootTabsNavigator, Screen: RootTabsScreen } =
  createBottomTabNavigator<RootTabsParamList>();

const { Navigator: CurrentLocationNavigator, Screen: CurrentLocationScreen } =
  createNativeStackNavigator<CurrentLocationStackParamList>();

const { Navigator: SearchNavigator, Screen: SearchScreen } =
  createNativeStackNavigator<SearchStackParamList>();

const { Navigator: FavouritesNavigator, Screen: FavouritesScreen } =
  createNativeStackNavigator<FavouritesStackParamList>();

/**
 * STACK COMPONENTS
 */

const sharedScreenOptions: NativeStackNavigationOptions = {
  title: '',
  headerBackTitle: 'Back',
};

function CurrentLocationStack(): JSX.Element {
  return (
    <CurrentLocationNavigator
      initialRouteName="Index"
      screenOptions={sharedScreenOptions}
    >
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

function FavouritesStack(): JSX.Element {
  return (
    <FavouritesNavigator
      initialRouteName="Index"
      screenOptions={sharedScreenOptions}
    >
      <FavouritesScreen name="Index" component={FavouritesIndexScreen} />
      <FavouritesScreen name="Detail" component={FavouritesDetailScreen} />
    </FavouritesNavigator>
  );
}

function SearchStack(): JSX.Element {
  return (
    <SearchNavigator
      initialRouteName="Index"
      screenOptions={sharedScreenOptions}
    >
      <SearchScreen name="Index" component={SearchIndexScreen} />
      <SearchScreen name="Detail" component={SearchDetailScreen} />
    </SearchNavigator>
  );
}

/**
 * ROUTER
 */

export function Router(): JSX.Element {
  return (
    <RootTabsNavigator initialRouteName="CurrentLocation">
      <RootTabsScreen
        name="CurrentLocation"
        component={CurrentLocationStack}
        options={{ title: 'Current Location' }}
      />
      <RootTabsScreen name="Search" component={SearchStack} />
      <RootTabsScreen name="Favourites" component={FavouritesStack} />
    </RootTabsNavigator>
  );
}
