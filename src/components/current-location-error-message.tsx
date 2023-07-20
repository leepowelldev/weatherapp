import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GeoError } from 'react-native-geolocation-service';
import { Text } from 'react-native-paper';
import { ErrorIcon } from './error-icon';

export type CurrentLocationErrorMessageProps = {
  error: GeoError;
};

export function CurrentLocationErrorMessage({
  error,
}: CurrentLocationErrorMessageProps) {
  let text: string;

  switch (error.code) {
    case 1:
    case 5: {
      text =
        'Unable to retrieve your current location, please ensure location services are enabled and you have given us permission to use your location.';
      break;
    }
    case 2: {
      text =
        'Your location is currently unavailable. This may be a network issue, or a problem with your device.';
      break;
    }
    case 3: {
      text =
        'It has taken too long to retrieve your current location, please try again later.';
      break;
    }
    case 4: {
      text =
        'This application requires the Google Play service to be installed. If this is already installed, it may be an old version.';
      break;
    }
    default: {
      text = 'An unknown error has occurred.';
    }
  }

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
