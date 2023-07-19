import React, { useCallback, useState } from 'react';
import { Alert, Button, Text } from 'react-native';
import { SearchDetailScreenProps } from '../router';
import { useCurrentWeather } from '../hooks';
import {
  getSavedLocationsFromStorage,
  setSavedLocationsToStorage,
} from '../utils/saved-locations-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  CurrentLocationSummary,
  Layout,
  WeatherDataErrorMessage,
} from '../components';

export type SearchDetailScreenParams = {
  location: string;
};

export function SearchDetailScreen({ route }: SearchDetailScreenProps) {
  const [savedLocations, setSavedLocations] = useState<Set<string>>(new Set());

  const [weatherData, { isLoading, error }] = useCurrentWeather(
    `${route.params.location}, United Kingdom`
  );

  const isSaved = savedLocations.has(route.params.location);

  async function handleSave() {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.add(route.params.location);

    try {
      setSavedLocationsToStorage(nextSavedLocations);
      setSavedLocations(nextSavedLocations);
    } catch {
      Alert.alert('Error saving');
    }
  }

  async function handleDelete() {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.delete(route.params.location);

    try {
      setSavedLocationsToStorage(nextSavedLocations);
      setSavedLocations(nextSavedLocations);
    } catch {
      Alert.alert('Error deleting');
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSavedLocationsFromStorage().then((locations) => {
        if (locations === null) {
          return setSavedLocations(new Set());
        }
        setSavedLocations(locations);
      });
    }, [])
  );

  return (
    <Layout>
      {(() => {
        if (isLoading) {
          return <Text>Loading...</Text>;
        }
        if (error) {
          return <WeatherDataErrorMessage error={error} />;
        }
        if (weatherData) {
          return (
            <>
              <CurrentLocationSummary weatherData={weatherData} />
              {isSaved ? (
                <Button
                  title="Delete from saved locations"
                  onPress={handleDelete}
                />
              ) : (
                <Button title="Save to saved locations" onPress={handleSave} />
              )}
            </>
          );
        }
        return null;
      })()}
    </Layout>
  );
}
