import React from 'react';
import { Layout, LocationsList } from '../components';
import { FavouritesIndexScreenProps } from '../router';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useFavourites } from '../contexts';

export function FavouritesIndexScreen({
  navigation,
}: FavouritesIndexScreenProps): JSX.Element {
  const [favourites] = useFavourites();

  function handleLocationPress(location: string) {
    navigation.navigate('Detail', { location });
  }

  const locations = Array.from(favourites);

  return (
    <Layout>
      {(() => {
        if (locations.length === 0) {
          return <Text style={styles.empty}>No favourites found.</Text>;
        }

        return (
          <LocationsList
            locations={locations}
            onLocationPress={handleLocationPress}
          />
        );
      })()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
  },
});
