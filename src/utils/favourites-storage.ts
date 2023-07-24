import { z } from 'zod';
import { LocalStorageService } from '../domain/services';

const key = 'favourites';
const favouritesSchema = z.array(z.string());
const favouritesStorage = new LocalStorageService<Array<string>>(key);

/**
 * @throws
 */
export async function getFavouritesFromStorage(): Promise<Array<string> | null> {
  const item = await favouritesStorage.get();

  if (item !== null) {
    favouritesSchema.parse(item);
  }

  return item;
}

/**
 * @throws
 */
export async function setFavouritesToStorage(
  locations: Set<string>
): Promise<void> {
  await favouritesStorage.set(Array.from(locations));
}
