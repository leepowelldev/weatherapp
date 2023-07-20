import React from 'react';
import { ForecastResponse } from '../domain/services';
import { StyleSheet, View } from 'react-native';
import { WeatherIcon } from './weather-icon';
import { Text } from 'react-native-paper';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

export type WeatherForecastProps = {
  data: ForecastResponse;
};

export function WeatherForecast({ data }: WeatherForecastProps) {
  return (
    <View style={styles.root}>
      <Text variant="displayMedium">{data.location.name}</Text>
      <Text>
        {data.location.region} / {data.location.country}
      </Text>
      <Text variant="bodySmall" style={styles.lastUpdated}>
        Last Updated: {data.current.last_updated}
      </Text>
      <View style={styles.daysContainer}>
        {data.forecast.forecastday.map(({ date, day }, index) => {
          const dateDayJs = dayjs(date);

          return (
            <View
              style={[
                styles.dayContainer,
                index === 0 && styles.dayContainerFirst,
              ]}
              key={date}
            >
              <Text variant="headlineSmall">
                {dateDayJs.isToday() ? 'Today' : dateDayJs.format('ddd')}
              </Text>
              <WeatherIcon code={day.condition.code} />
              <Text>
                High: {day.maxtemp_c} / Low: {day.mintemp_c}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  lastUpdated: {
    marginTop: 10,
    marginBottom: 30,
  },
  daysContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dayContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dayContainerFirst: {
    borderTopWidth: 0,
  },
});
