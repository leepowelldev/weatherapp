import React, { Fragment, useCallback, useState } from 'react';
import { Alert, Button, Text } from 'react-native';
import { Layout } from '../components';
import { useFocusEffect } from '@react-navigation/native';
import {
  getSavedLocationsFromStorage,
  setSavedLocationsToStorage,
} from '../utils/saved-locations-storage';
import { SavedIndexScreenProps } from '../router';

export function SavedIndexScreen({
  navigation,
}: SavedIndexScreenProps): JSX.Element {
  const [savedLocations, setSavedLocations] = useState<Set<string>>(new Set());

  function handlePress(location: string) {
    navigation.navigate('Detail', { location });
  }

  function handleRemove(location: string) {
    const nextSavedLocations = new Set(savedLocations);
    nextSavedLocations.delete(location);

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
    <Layout>
      {Array.from(savedLocations).map((location) => (
        <Fragment key={location}>
          <Button title={location} onPress={() => handlePress(location)} />
          <Button title="Remove" onPress={() => handleRemove(location)} />
        </Fragment>
      ))}
    </Layout>
  );
}
