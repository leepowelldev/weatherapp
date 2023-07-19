import React from 'react';
import { CurrentResponse } from '../domain/services';
import { Text, View } from 'react-native';
import { WeatherIcon } from './weather-icon';

export type CurrentLocationSummaryProps = {
  weatherData: CurrentResponse;
};

export function CurrentLocationSummary({
  weatherData,
}: CurrentLocationSummaryProps) {
  return (
    <View>
      <WeatherIcon code={weatherData.current.condition.code} />
      <Text>{weatherData.location.name}</Text>
      <Text>
        {weatherData.location.region} / {weatherData.location.country}
      </Text>
      <Text>{weatherData.current.temp_c}˚</Text>
      <Text>{weatherData.current.condition.text}</Text>
      <Text>Last Updated: {weatherData.current.last_updated}</Text>
    </View>
  );
}
