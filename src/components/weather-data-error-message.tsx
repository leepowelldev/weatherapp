import { Link } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';

export type WeatherDataErrorMessageProps = {
  error: Error;
};

export function WeatherDataErrorMessage({
  error,
}: WeatherDataErrorMessageProps) {
  if (error.message === '1006') {
    return (
      <Text>
        Sorry, we do not have data for this location, please try another.
      </Text>
    );
  }

  if (__DEV__) {
    return (
      <>
        <Text>Error code: {error.message}</Text>
        <Text>
          See{' '}
          <Link to="https://www.weatherapi.com/docs/#intro-error-codes">
            https://www.weatherapi.com/docs/#intro-error-codes
          </Link>{' '}
          for details.
        </Text>
      </>
    );
  }

  return (
    <Text>
      There has been a problem retrieving the data for your current location.
      Please try again later.
    </Text>
  );
}
