import React from 'react';
import { Button, Text } from 'react-native';
import {
  CurrentLocationErrorMessage,
  Layout,
  WeatherDataErrorMessage,
  WeatherIcon,
} from '../components';
import { useCurrentWeather } from '../hooks';
import { CurrentLocationIndexScreenProps } from '../router';
import { useCurrentLocation } from '../contexts';

export function CurrentLocationIndexScreen({
  navigation,
}: CurrentLocationIndexScreenProps): JSX.Element {
  const [
    currentLocation,
    { isLoading: isCurrentLocationLoading, error: currentLocationError },
  ] = useCurrentLocation();

  const [
    weatherData,
    { isLoading: isWeatherDataLoading, error: weatherDataError },
  ] = useCurrentWeather(currentLocation);

  const isLoading = isCurrentLocationLoading || isWeatherDataLoading;

  return (
    <Layout>
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
              <WeatherIcon code={weatherData.current.condition.code} />
              <Text>{weatherData.location.name}</Text>
              <Text>
                {weatherData.location.region} / {weatherData.location.country}
              </Text>
              <Text>{weatherData.current.temp_c}˚</Text>
              <Text>{weatherData.current.condition.text}</Text>
              <Text>Last Updated: {weatherData.current.last_updated}</Text>
              <Button
                title="Forecast"
                onPress={() => navigation.navigate('Forecast')}
              />
            </>
          );
        }
        return null;
      })()}
    </Layout>
  );
}
