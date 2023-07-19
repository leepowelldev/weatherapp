import React from 'react';
import { CurrentResponse } from '../domain/services';
import { Text, View } from 'react-native';
import { WeatherIcon } from './weather-icon';

export type WeatherSummaryProps = {
  data: CurrentResponse;
};

export function WeatherSummary({ data }: WeatherSummaryProps) {
  return (
    <View>
      <WeatherIcon code={data.current.condition.code} />
      <Text>{data.location.name}</Text>
      <Text>
        {data.location.region} / {data.location.country}
      </Text>
      <Text>{data.current.temp_c}˚</Text>
      <Text>{data.current.condition.text}</Text>
      <Text>Last Updated: {data.current.last_updated}</Text>
    </View>
  );
}
