import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function hasLocationPermissionIOS(): Promise<boolean> {
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  return false;
}

export async function hasLocationPermissionAndroid(): Promise<boolean> {
  if (Number(Platform.Version) < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  return false;
}

export async function hasLocationPermission() {
  switch (Platform.OS) {
    case 'ios': {
      return hasLocationPermissionIOS();
    }
    case 'android': {
      return hasLocationPermissionAndroid();
    }
    default: {
      return false;
    }
  }
}
