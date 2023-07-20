import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SearchDetailScreenProps } from '../router';
import { useCurrentWeather } from '../hooks';
import {
  getSavedLocationsFromStorage,
  setSavedLocationsToStorage,
} from '../utils/saved-locations-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
  WeatherSummary,
  Layout,
  WeatherDataErrorMessage,
  SaveSwitch,
  LoadingIndicator,
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

  async function saveLocation() {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.add(route.params.location);

    try {
      setSavedLocationsToStorage(nextSavedLocations);
      setSavedLocations(nextSavedLocations);
    } catch {
      Alert.alert('Error saving');
    }
  }

  async function deleteLocation() {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.delete(route.params.location);

    try {
      setSavedLocationsToStorage(nextSavedLocations);
      setSavedLocations(nextSavedLocations);
    } catch {
      Alert.alert('Error deleting');
    }
  }

  async function handleValueChange(shouldSave: boolean) {
    if (shouldSave) {
      return await saveLocation();
    }
    return await deleteLocation();
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
          return <LoadingIndicator />;
        }
        if (error) {
          return <WeatherDataErrorMessage error={error} />;
        }
        if (weatherData) {
          return (
            <>
              <WeatherSummary data={weatherData} />
              <SaveSwitch
                value={isSaved}
                onValueChange={handleValueChange}
                style={styles.saveSwitch}
              />
            </>
          );
        }
        return null;
      })()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  saveSwitch: {
    marginTop: 30,
  },
});
