import React from 'react';
import {
  Button,
  CurrentLocationErrorMessage,
  Layout,
  LoadingIndicator,
  WeatherDataErrorMessage,
  WeatherSummary,
} from '../components';
import { useCurrentWeather } from '../hooks';
import { CurrentLocationIndexScreenProps } from '../router';
import { useCurrentLocation } from '../contexts';
import { StyleSheet, View } from 'react-native';

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
          return <LoadingIndicator />;
        }
        if (currentLocationError) {
          return <CurrentLocationErrorMessage error={currentLocationError} />;
        }
        if (weatherDataError) {
          return <WeatherDataErrorMessage error={weatherDataError} />;
        }
        if (weatherData) {
          return (
            <View style={styles.container}>
              <WeatherSummary data={weatherData} />
              <Button onPress={() => navigation.navigate('Forecast')}>
                5 Day Forecast
              </Button>
            </View>
          );
        }
        return null;
      })()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
});
