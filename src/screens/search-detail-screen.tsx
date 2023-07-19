import React, { useCallback, useState } from 'react';
import { Alert, Button, Text } from 'react-native';
import { SearchDetailScreenProps } from '../router';
import { useCurrentWeather } from '../hooks';
import {
  getSavedLocationsFromStorage,
  setSavedLocationsToStorage,
} from '../utils/saved-locations-storage';
import { useFocusEffect } from '@react-navigation/native';

export type SearchDetailScreenParams = {
  location: string;
};

export function SearchDetailScreen({ route }: SearchDetailScreenProps) {
  const [savedLocations, setSavedLocations] = useState<Set<string>>(new Set());

  const [weatherData] = useCurrentWeather(
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
      Alert.alert('Error adding');
    }
  }

  async function handleRemove() {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.delete(route.params.location);

    try {
      setSavedLocationsToStorage(nextSavedLocations);
      setSavedLocations(nextSavedLocations);
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
      });
    }, [])
  );

  return (
    <>
      <Text>{JSON.stringify(weatherData)}</Text>
      {isSaved ? (
        <Button title="Remove from saved locations" onPress={handleRemove} />
      ) : (
        <Button title="Add to saved locations" onPress={handleSave} />
      )}
      <Text>{JSON.stringify(Array.from(savedLocations))}</Text>
    </>
  );
}
