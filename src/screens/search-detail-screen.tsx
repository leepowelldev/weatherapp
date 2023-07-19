import React from 'react';
import { Button, Text } from 'react-native';
import { SearchDetailScreenProps } from '../router';
import { useCurrentWeather } from '../hooks';

export type SearchDetailScreenParams = {
  location: string;
};

export function SearchDetailScreen({ route }: SearchDetailScreenProps) {
  const [weatherData] = useCurrentWeather(
    `${route.params.location}, United Kingdom`
  );

  function handleSave() {}

  return (
    <>
      <Text>{JSON.stringify(weatherData)}</Text>
      <Button title="Save" onPress={handleSave} />
    </>
  );
}
