import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ErrorIcon } from './error-icon';

export type WeatherDataErrorMessageProps = {
  error: Error;
};

export function WeatherDataErrorMessage({
  error,
}: WeatherDataErrorMessageProps) {
  let text: string;

  if (__DEV__ && error.message !== '1006') {
    console.error(
      `Error code: ${error.message} - See https://www.weatherapi.com/docs/#intro-error-codes`
    );
  }

  if (error.message === '1006') {
    text = 'Sorry, we do not have data for this location, please try another.';
  }

  text =
    'There has been a problem retrieving the data for your current location. Please try again later.';

  return (
    <View style={styles.root}>
      <ErrorIcon />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
  },
});
