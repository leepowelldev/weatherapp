import React, { Fragment } from 'react';
import { ScrollView, Text } from 'react-native';
import {
  CurrentLocationErrorMessage,
  Layout,
  WeatherDataErrorMessage,
  WeatherIcon,
} from '../components';
import { useForecastWeather } from '../hooks';
import { useCurrentLocation } from '../contexts';

export function CurrentLocationForecastScreen(): JSX.Element {
  const [
    currentLocation,
    { isLoading: isCurrentLocationLoading, error: currentLocationError },
  ] = useCurrentLocation();

  const [
    weatherData,
    { isLoading: isWeatherDataLoading, error: weatherDataError },
  ] = useForecastWeather(currentLocation, { days: 5 });

  const isLoading = isCurrentLocationLoading || isWeatherDataLoading;

  return (
    <Layout>
      <ScrollView>
        {(() => {
          if (isLoading) {
            return <Text>Loading...</Text>;
          }
          if (currentLocationError) {
            return <CurrentLocationErrorMessage error={currentLocationError} />;
          }
          if (weatherDataError) {
            return <WeatherDataErrorMessage error={weatherDataError} />;
          }
          if (weatherData) {
            return (
              <>
                <Text>{weatherData.location.name}</Text>
                <Text>
                  {weatherData.location.region} / {weatherData.location.country}
                </Text>
                <Text>Last Updated: {weatherData.current.last_updated}</Text>
                {weatherData.forecast.forecastday.map(({ date, day }) => {
                  return (
                    <Fragment key={date}>
                      <Text>{date}</Text>
                      <WeatherIcon code={day.condition.code} />
                      <Text>High: {day.maxtemp_c}</Text>
                      <Text>Low: {day.mintemp_c}</Text>
                    </Fragment>
                  );
                })}
              </>
            );
          }
          return null;
        })()}
      </ScrollView>
    </Layout>
  );
}
