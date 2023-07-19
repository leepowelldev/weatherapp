import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@saved_locations';

export async function getSavedLocationsFromStorage(): Promise<Set<string> | null> {
  const item = await AsyncStorage.getItem(key);

  if (item !== null) {
    return new Set(JSON.parse(item));
  }

  return null;
}

export async function setSavedLocationsToStorage(locations: Set<string>) {
  await AsyncStorage.setItem(key, JSON.stringify(Array.from(locations)));
}
