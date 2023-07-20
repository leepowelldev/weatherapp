import React from 'react';
import { CurrentResponse } from '../domain/services';
import { StyleSheet, View } from 'react-native';
import { WeatherIcon } from './weather-icon';
import { Text } from 'react-native-paper';

export type WeatherSummaryProps = {
  data: CurrentResponse;
};

export function WeatherSummary({ data }: WeatherSummaryProps) {
  return (
    <View style={styles.root}>
      <WeatherIcon code={data.current.condition.code} />
      <Text variant="displayMedium">{data.location.name}</Text>
      <Text>
        {data.location.region} / {data.location.country}
      </Text>
      <Text variant="displayLarge" style={styles.temp}>
        {data.current.temp_c}˚
      </Text>
      <Text variant="titleMedium">{data.current.condition.text}</Text>
      <Text variant="bodySmall">Last Updated: {data.current.last_updated}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  temp: {
    marginVertical: 10,
  },
});
