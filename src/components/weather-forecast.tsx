import React, { Fragment } from 'react';
import { ForecastResponse } from '../domain/services';
import { View, Text } from 'react-native';
import { WeatherIcon } from './weather-icon';

export type WeatherForecastProps = {
  data: ForecastResponse;
};

export function WeatherForecast({ data }: WeatherForecastProps) {
  return (
    <View>
      <Text>{data.location.name}</Text>
      <Text>
        {data.location.region} / {data.location.country}
      </Text>
      <Text>Last Updated: {data.current.last_updated}</Text>
      {data.forecast.forecastday.map(({ date, day }) => {
        return (
          <Fragment key={date}>
            <Text>{date}</Text>
            <WeatherIcon code={day.condition.code} />
            <Text>High: {day.maxtemp_c}</Text>
            <Text>Low: {day.mintemp_c}</Text>
          </Fragment>
        );
      })}
    </View>
  );
}
