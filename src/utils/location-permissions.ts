import { Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

export async function requestLocationPermissions(permission: Permission) {
  const result = await request(permission);
  return result === RESULTS.GRANTED;
}

export async function hasLocationPermissions() {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const result = await check(permission);

  if (result === RESULTS.DENIED) {
    return await requestLocationPermissions(permission);
  }

  return result === RESULTS.GRANTED;
}
