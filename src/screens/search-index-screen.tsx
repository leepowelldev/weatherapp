import React, { useState } from 'react';
import { Button, Text, TextInput } from 'react-native';
import { Layout } from '../components';
import { unitedKingdomCities } from '../united-kingdom-cities';
import { SearchIndexScreenProps } from '../router';

export function SearchIndexScreen({
  navigation,
}: SearchIndexScreenProps): JSX.Element {
  const [value, setValue] = useState('');

  const locations =
    value.length > 0
      ? unitedKingdomCities.filter((city) => city.includes(value))
      : [];

  function handleChangeText(nextValue: string) {
    setValue(nextValue);
  }

  function handleOptionPress(location: string) {
    navigation.navigate('Detail', { location });
  }

  return (
    <Layout>
      <Text>Find UK City</Text>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        style={{ borderWidth: 1 }}
      />
      {locations.map((location) => (
        <Button
          title={location}
          key={location}
          onPress={() => handleOptionPress(location)}
        />
      ))}
    </Layout>
  );
}
