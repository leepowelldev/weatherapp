import React from 'react';
import { Text } from 'react-native';
import { GeoError } from 'react-native-geolocation-service';

export type CurrentLocationErrorMessageProps = {
  error: GeoError;
};

export function CurrentLocationErrorMessage({
  error,
}: CurrentLocationErrorMessageProps) {
  switch (error.code) {
    case 1:
    case 5: {
      return (
        <Text>
          Unable to retrieve your current location, please ensure location
          services are enabled and you have given us permission to use your
          location.
        </Text>
      );
    }
    case 2: {
      return (
        <Text>
          Your location is currently unavailable. This may be a network issue,
          or a problem with your device.
        </Text>
      );
    }
    case 3: {
      return (
        <Text>
          It has taken too long to retrieve your current location, please try
          again later.
        </Text>
      );
    }
    case 4: {
      return (
        <Text>
          This application requires the Google Play service to be installed. If
          this is already installed, it may be an old version.
        </Text>
      );
    }
    default: {
      return <Text>An unknown error has occurred.</Text>;
    }
  }
}
