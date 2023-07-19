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

  const savedLocationsArray = Array.from(savedLocations);

  return (
    <Layout>
      {(() => {
        if (savedLocationsArray.length === 0) {
          return <Text>No saved locations found.</Text>;
        }

        return savedLocationsArray.map((location) => (
          <Button
            key={location}
            title={location}
            onPress={() => handlePress(location)}
          />
        ));
      })()}
    </Layout>
  );
}
