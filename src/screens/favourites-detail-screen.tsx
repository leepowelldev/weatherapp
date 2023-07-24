import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  WeatherSummary,
  Layout,
  WeatherDataErrorMessage,
  LoadingIndicator,
  FavouriteToggle,
} from '../components';
import { FavouritesDetailScreenProps } from '../router';
import { useCurrentWeather } from '../hooks';
import { useFavourites } from '../contexts';

export type FavouritesDetailScreenParams = {
  location: string;
};

export function FavouritesDetailScreen({
  route,
}: FavouritesDetailScreenProps): JSX.Element {
  const [favourites, { addFavourite, deleteFavourite }] = useFavourites();

  const [weatherData, { isLoading, error }] = useCurrentWeather(
    `${route.params.location}, United Kingdom`
  );

  const isFavourite = favourites.has(route.params.location);

  async function handleFavouriteToggle(shouldSave: boolean) {
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
            <View>
              <WeatherSummary data={weatherData} />
              <FavouriteToggle
                onToggle={handleFavouriteToggle}
                value={isFavourite}
                style={styles.favourite}
              />
            </View>
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
