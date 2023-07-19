import React, { useEffect, useState } from 'react';
import { Alert, Button, Text } from 'react-native';
import { SearchDetailScreenProps } from '../router';
import { useCurrentWeather } from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SearchDetailScreenParams = {
  location: string;
};

export function SearchDetailScreen({ route }: SearchDetailScreenProps) {
  const [savedLocations, setSavedLocations] = useState<Set<string>>(
    new Set([])
  );

  const [weatherData] = useCurrentWeather(
    `${route.params.location}, United Kingdom`
  );

  async function handleSave() {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.add(route.params.location);

    try {
      AsyncStorage.setItem(
        '@saved_locations',
        JSON.stringify(Array.from(nextSavedLocations))
      );
      setSavedLocations(nextSavedLocations);
    } catch {
      Alert.alert('Error adding');
    }
  }

  async function handleRemove() {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.delete(route.params.location);

    try {
      AsyncStorage.setItem(
        '@saved_locations',
        JSON.stringify(Array.from(nextSavedLocations))
      );
      setSavedLocations(nextSavedLocations);
    } catch {
      Alert.alert('Error removing');
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('@saved_locations').then((item) => {
      if (item !== null) {
        setSavedLocations(new Set(JSON.parse(item)));
      }
    });
  }, []);

  const isSaved = savedLocations.has(route.params.location);

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
