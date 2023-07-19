import { useEffect, useReducer } from 'react';
import { WeatherApiService } from '../domain/services/weatherapi';
import { env } from '../env';

type State = {
  data: Awaited<ReturnType<WeatherApiService['getCurrentByLocation']>> | null;
  isLoading: boolean;
  error: Error | null;
};

type Action =
  | { type: 'DATA'; value: State['data'] }
  | { type: 'IS_LOADING'; value: State['isLoading'] }
  | { type: 'ERROR'; value: State['error'] };

function reducer(state: State, action: Action): State {
  const { type, value } = action;

  switch (type) {
    case 'DATA': {
      return {
        ...state,
        data: value,
        isLoading: false,
        error: null,
      };
    }
    case 'IS_LOADING': {
      return {
        ...state,
        isLoading: value,
      };
    }
    case 'ERROR': {
      return {
        ...state,
        data: null,
        isLoading: false,
        error: value,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

export function useCurrentWeather(
  location: string | null
): [State['data'], { isLoading: State['isLoading']; error: State['error'] }] {
  const [{ data, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    (async () => {
      if (!location) {
        dispatch({ type: 'DATA', value: null });
        return;
      }

      const service = new WeatherApiService({ key: env.WEATHERAPI_API_KEY });

      try {
        dispatch({ type: 'IS_LOADING', value: true });
        const response = await service.getCurrentByLocation({
          location,
        });
        dispatch({ type: 'DATA', value: response });
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: 'ERROR', value: err });
        } else {
          throw err;
        }
      }
    })();
  }, [location]);

  return [data, { isLoading, error }];
}
