import React, { useCallback, useState } from 'react';
import { Layout, LocationsList } from '../components';
import { useFocusEffect } from '@react-navigation/native';
import { getSavedLocationsFromStorage } from '../utils/saved-locations-storage';
import { SavedIndexScreenProps } from '../router';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export function SavedIndexScreen({
  navigation,
}: SavedIndexScreenProps): JSX.Element {
  const [savedLocations, setSavedLocations] = useState<Set<string>>(new Set());

  function handleLocationPress(location: string) {
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
          return (
            <Text style={styles.noLocations}>No saved locations found.</Text>
          );
        }

        return (
          <LocationsList
            locations={savedLocationsArray}
            onLocationPress={handleLocationPress}
          />
        );
      })()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  noLocations: {
    textAlign: 'center',
  },
});
