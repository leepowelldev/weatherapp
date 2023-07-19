import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  CurrentLocationIndexScreen,
  CurrentLocationForecastScreen,
  SearchIndexScreen,
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
  Saved: NavigatorScreenParams<SavedStackParamList>;
};

export type CurrentLocationStackParamList = {
  Index: undefined;
  Forecast: undefined;
};

export type SearchStackParamList = {
  Index: undefined;
  Detail: SearchDetailScreenParams;
};

export type SavedStackParamList = {
  Index: undefined;
  Detail: undefined;
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

export type SavedIndexScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SavedStackParamList, 'Index'>,
  BottomTabScreenProps<RootTabsParamList, 'Saved'>
>;

export type SavedDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SavedStackParamList, 'Detail'>,
  BottomTabScreenProps<RootTabsParamList, 'Saved'>
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

const { Navigator: SavedNavigator, Screen: SavedScreen } =
  createNativeStackNavigator<SavedStackParamList>();

/**
 * STACK COMPONENTS
 */

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

function SearchStack(): JSX.Element {
  return (
    <SearchNavigator initialRouteName="Index">
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
      <RootTabsScreen name="CurrentLocation" component={CurrentLocationStack} />
      <RootTabsScreen name="Search" component={SearchStack} />
      <RootTabsScreen name="Saved" component={SavedStack} />
    </RootTabsNavigator>
  );
}
