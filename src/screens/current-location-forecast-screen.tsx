import React from 'react';
import {
  CurrentLocationErrorMessage,
  Layout,
  LoadingIndicator,
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
      {(() => {
        if (isLoading) {
          return <LoadingIndicator />;
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
    </Layout>
  );
}
