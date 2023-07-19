import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { LatLong } from '../types';
import { hasLocationPermission } from '../utils/permissions';
import Geolocation, { GeoError } from 'react-native-geolocation-service';

const CurrentLocationContext = createContext<Readonly<
  [State['currentLocation'], Omit<State, 'currentLocation'>]
> | null>(null);

type State = {
  currentLocation: LatLong | null;
  isLoading: boolean;
  error: GeoError | null;
};

type Action =
  | {
      type: 'CURRENT_LOCATION';
      value: State['currentLocation'];
    }
  | {
      type: 'IS_LOADING';
      value: State['isLoading'];
    }
  | {
      type: 'ERROR';
      value: State['error'];
    };

function reducer(state: State, action: Action): State {
  const { type, value } = action;

  switch (type) {
    case 'CURRENT_LOCATION': {
      return {
        ...state,
        currentLocation: value,
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
        currentLocation: null,
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
  currentLocation: null,
  isLoading: false,
  error: null,
};

export type CurrentLocationProviderProps = {
  children: ReactNode;
};

export function CurrentLocationProvider({
  children,
}: CurrentLocationProviderProps) {
  const [{ currentLocation, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  /**
   * Watch users position and update context value when it changes
   */
  useEffect(() => {
    (async () => {
      const hasPermission = await hasLocationPermission();

      if (hasPermission) {
        dispatch({ type: 'IS_LOADING', value: true });

        Geolocation.watchPosition(
          (position) => {
            dispatch({
              type: 'CURRENT_LOCATION',
              value: `${position.coords.latitude},${position.coords.longitude}`,
            });
          },
          (err) => {
            dispatch({
              type: 'ERROR',
              value: err,
            });
          }
        );
      } else {
        dispatch({
          type: 'ERROR',
          // Use react-native-geolocation-service shape for errors
          value: { code: 1, message: 'Location permission denied' },
        });
      }
    })();

    return () => Geolocation.stopObserving();
  }, []);

  const value = useMemo(
    () => [currentLocation, { isLoading, error }] as const,
    [currentLocation, error, isLoading]
  );

  return (
    <CurrentLocationContext.Provider value={value}>
      {children}
    </CurrentLocationContext.Provider>
  );
}

export function useCurrentLocation() {
  const value = useContext(CurrentLocationContext);

  if (value === null) {
    throw new Error(
      'useCurrentLocation must be used within a CurrentLocationProvider'
    );
  }

  return value;
}
