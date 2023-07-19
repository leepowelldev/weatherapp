import React, { useCallback, useState } from 'react';
import { Button, Text } from 'react-native';
import { Layout } from '../components';
import { useFocusEffect } from '@react-navigation/native';
import { getSavedLocationsFromStorage } from '../utils/saved-locations-storage';
import { SavedIndexScreenProps } from '../router';

export function SavedIndexScreen({
  navigation,
}: SavedIndexScreenProps): JSX.Element {
  const [savedLocations, setSavedLocations] = useState<Set<string>>(new Set());

  function handlePress(location: string) {
    navigation.navigate('Detail', { location });
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
      <Text>Saved Index</Text>
      {Array.from(savedLocations).map((location) => (
        <Button
          key={location}
          title={location}
          onPress={() => handlePress(location)}
        />
      ))}
    </Layout>
  );
}
