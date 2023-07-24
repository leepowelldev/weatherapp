import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  getFavouritesFromStorage,
  setFavouritesToStorage,
} from '../utils/favourites-storage';

export type FavouritesContext = Readonly<
  [
    Set<string>,
    {
      addFavourite(
        favourite: string,
        options?: {
          onError?(error: unknown): void;
        }
      ): void;
      deleteFavourite(
        favourite: string,
        options?: {
          onError?(error: unknown): void;
        }
      ): void;
    }
  ]
> | null;

const FavouritesContext = createContext<FavouritesContext>(null);

export type FavouritesProviderProps = {
  children: ReactNode;
};

export function FavouritesProvider({ children }: FavouritesProviderProps) {
  const [favourites, setFavourites] = useState(new Set<string>());

  const addFavourite = useCallback(
    async (
      favourite: string,
      { onError }: { onError(error: unknown): void }
    ) => {
      const prevFavourites = favourites;
      const nextFavourites = new Set(favourites);
      nextFavourites.add(favourite);
      setFavourites(nextFavourites);
      try {
        await setFavouritesToStorage(nextFavourites);
      } catch (error) {
        // If saving fails - revert back
        console.error(error);
        setFavourites(prevFavourites);
        onError?.(error);
      }
    },
    [favourites]
  );

  const deleteFavourite = useCallback(
    async (
      favourite: string,
      { onError }: { onError(error: unknown): void }
    ) => {
      const prevFavourites = favourites;
      const nextFavourites = new Set(favourites);
      nextFavourites.delete(favourite);
      setFavourites(nextFavourites);
      try {
        await setFavouritesToStorage(nextFavourites);
      } catch (error) {
        // If saving fails - revert back
        console.error(error);
        setFavourites(prevFavourites);
        onError?.(error);
      }
    },
    [favourites]
  );

  const value = useMemo(
    () => [favourites, { addFavourite, deleteFavourite }] as const,
    [addFavourite, deleteFavourite, favourites]
  );

  useEffect(() => {
    (async () => {
      try {
        const savedFavourites = await getFavouritesFromStorage();
        setFavourites(new Set(savedFavourites ?? []));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites(): NonNullable<FavouritesContext> {
  const value = useContext(FavouritesContext);

  if (value === null) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }

  return value;
}
