import {
  CurrentResponse,
  WeatherApiService,
} from '../domain/services/weatherapi';
import { env } from '../env';
import { useQuery } from '@tanstack/react-query';

export function useCurrentWeather(
  location: string | null
): [
  Awaited<ReturnType<WeatherApiService['getCurrentByLocation']>> | null,
  { isLoading: boolean; error: Error | null }
] {
  const service = new WeatherApiService({ key: env.WEATHERAPI_API_KEY });

  const { data, isLoading, error } = useQuery<CurrentResponse, Error>({
    queryKey: ['CURRENT_LOCATION', location],
    queryFn({ signal }) {
      return service.getCurrentByLocation(
        location as Exclude<typeof location, null>,
        {
          signal,
        }
      );
    },
    enabled: location !== null,
    staleTime: 60000,
  });

  return [data ?? null, { isLoading, error }];
}
