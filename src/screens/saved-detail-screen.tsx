import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  WeatherSummary,
  Layout,
  WeatherDataErrorMessage,
  LoadingIndicator,
  Button,
} from '../components';
import { SavedDetailScreenProps } from '../router';
import { useCurrentWeather } from '../hooks';
import { useFocusEffect } from '@react-navigation/native';
import {
  setSavedLocationsToStorage,
  getSavedLocationsFromStorage,
} from '../utils/saved-locations-storage';

export type SavedDetailScreenParams = {
  location: string;
};

export function SavedDetailScreen({
  navigation,
  route,
}: SavedDetailScreenProps): JSX.Element {
  const [savedLocations, setSavedLocations] = useState<Set<string>>(new Set());

  const [weatherData, { isLoading, error }] = useCurrentWeather(
    `${route.params.location}, United Kingdom`
  );

  async function handleDelete() {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.delete(route.params.location);

    try {
      setSavedLocationsToStorage(nextSavedLocations);
      navigation.navigate('Index');
    } catch {
      Alert.alert('Error removing');
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSavedLocationsFromStorage().then((locations) => {
        if (locations === null) {
          return setSavedLocations(new Set());
        }
        setSavedLocations(locations);
        // Location has been removed from saved locations elsewhere - probably
        // search detail page
        if (!locations.has(route.params.location)) {
          navigation.navigate('Index');
        }
      });
    }, [navigation, route.params.location])
  );

  return (
    <Layout>
      {(() => {
        if (isLoading) {
          return <LoadingIndicator />;
        }
        if (error) {
          return <WeatherDataErrorMessage error={error} />;
        }
        if (weatherData) {
          return (
            <View style={styles.container}>
              <WeatherSummary data={weatherData} />
              <Button onPress={handleDelete}>Delete</Button>
            </View>
          );
        }
        return null;
      })()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
