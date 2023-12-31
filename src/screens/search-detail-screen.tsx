import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { SearchDetailScreenProps } from '../router';
import { useCurrentWeather } from '../hooks';
import {
  WeatherSummary,
  Layout,
  WeatherDataErrorMessage,
  LoadingIndicator,
  FavouriteToggle,
} from '../components';
import { useFavourites } from '../contexts';

export type SearchDetailScreenParams = {
  location: string;
};

export function SearchDetailScreen({ route }: SearchDetailScreenProps) {
  const [favourites, { addFavourite, deleteFavourite }] = useFavourites();

  const [weatherData, { isLoading, error }] = useCurrentWeather(
    `${route.params.location}, United Kingdom`
  );

  const isFavourite = favourites.has(route.params.location);

  async function handleValueChange(shouldSave: boolean) {
    if (shouldSave) {
      return await addFavourite(route.params.location, {
        onError() {
          Alert.alert('Error adding');
        },
      });
    }
    return await deleteFavourite(route.params.location, {
      onError() {
        Alert.alert('Error deleting');
      },
    });
  }

  return (
    <Layout>
      {(() => {
        if (isLoading) {
          return <LoadingIndicator />;
        }
        if (error) {
          return <WeatherDataErrorMessage error={error} />;
        }
        if (weatherData) {
          return (
            <>
              <WeatherSummary data={weatherData} />
              <FavouriteToggle
                value={isFavourite}
                onToggle={handleValueChange}
                style={styles.favourite}
              />
            </>
          );
        }
        return null;
      })()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  favourite: {
    marginTop: 30,
  },
});
