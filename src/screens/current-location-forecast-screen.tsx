import React from 'react';
import { ScrollView, Text } from 'react-native';
import {
  CurrentLocationErrorMessage,
  Layout,
  WeatherDataErrorMessage,
  WeatherForecast,
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
            return <WeatherForecast data={weatherData} />;
          }
          return null;
        })()}
      </ScrollView>
    </Layout>
  );
}
