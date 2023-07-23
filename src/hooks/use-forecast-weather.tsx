import {
  ForecastResponse,
  WeatherApiService,
} from '../domain/services/weatherapi';
import { env } from '../env';
import { useQuery } from '@tanstack/react-query';

export function useForecastWeather(
  location: string | null,
  { days = 5 }: { days?: number } = {}
): [
  Awaited<ReturnType<WeatherApiService['getForecastByLocation']>> | null,
  { isLoading: boolean; error: Error | null }
] {
  const service = new WeatherApiService({ key: env.WEATHERAPI_API_KEY });

  let { data, isLoading, error } = useQuery<ForecastResponse, Error>({
    queryKey: ['FORECAST_LOCATION', location, days],
    queryFn({ signal }) {
      return service.getForecastByLocation(
        location as Exclude<typeof location, null>,
        {
          days: days,
          signal,
        }
      );
    },
    enabled: location !== null,
    staleTime: 60000,
  });

  return [data ?? null, { isLoading, error }];
}
