import React, { useState } from 'react';
import { Layout, LocationsList } from '../components';
import { unitedKingdomCities } from '../united-kingdom-cities';
import { SearchIndexScreenProps } from '../router';
import { Searchbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export function SearchIndexScreen({
  navigation,
}: SearchIndexScreenProps): JSX.Element {
  const [value, setValue] = useState('');

  const locations =
    value.length > 0
      ? unitedKingdomCities.filter((city) => city.includes(value))
      : [];

  const hasLocations = locations.length > 0;
  const hasValue = value.length > 0;

  function handleChangeText(nextValue: string) {
    setValue(nextValue);
  }

  function handleLocationPress(location: string) {
    navigation.navigate('Detail', { location });
  }

  return (
    <Layout noScrollView>
      <Searchbar
        placeholder="Search"
        value={value}
        onChangeText={handleChangeText}
      />
      <View style={styles.container}>
        {!hasValue && (
          <Text style={styles.text}>
            View weather for cities within the United Kingdom.
          </Text>
        )}
        {!hasLocations && hasValue && (
          <Text style={styles.text}>No results found.</Text>
        )}
        <LocationsList
          locations={locations}
          onLocationPress={handleLocationPress}
        />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
});
