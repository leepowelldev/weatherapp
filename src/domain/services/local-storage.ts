import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageService<T = unknown> {
  private key: string;

  constructor(key: string) {
    this.key = `@${key}`;
  }

  /**
   * @throws
   */
  async get(): Promise<T | null> {
    const item = await AsyncStorage.getItem(this.key);

    if (item === null) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * @throws
   */
  set(value: unknown) {
    return AsyncStorage.setItem(this.key, JSON.stringify(value));
  }

  /**
   * @throws
   */
  clear() {
    return AsyncStorage.removeItem(this.key);
  }
}
