import { z } from 'zod';

function isErrorResponse(response: unknown): response is ErrorResponse {
  return ErrorResponse.safeParse(response).success;
}

export class WeatherApiService {
  private key: string;
  private url = 'https://api.weatherapi.com';
  private version = '1';

  constructor({ key, version }: { key: string; version?: string }) {
    this.key = key;
    if (version) {
      this.version = version;
    }
  }

  /**
   * @throws
   */
  async getCurrentByLocation(
    location: string,
    {
      signal,
    }: {
      signal?: AbortSignal;
    } = {}
  ): Promise<CurrentResponse> | never {
    const params = new URLSearchParams({
      key: this.key,
      q: location,
      aqi: 'no',
    });

    const response = await fetch(
      `${this.url}/v${this.version}/current.json?${params}`,
      {
        signal,
      }
    );

    let json: CurrentResponse | ErrorResponse | null = null;

    try {
      json = await response.json();
    } catch {}

    if (json === null) {
      throw new Error('Invalid json response');
    }

    // Use api error response first
    if (isErrorResponse(json)) {
      throw new Error(`${json.error.code}`);
    }

    // Otherwise fall back to status if response is no good
    if (!response.ok) {
      throw new Error(`${response.statusText} ${response.status}`);
    }

    try {
      CurrentResponse.parse(json);
    } catch {
      throw new Error('Response does not match schema');
    }

    return json;
  }

  /**
   * @throws
   */
  async getForecastByLocation(
    location: string,
    {
      days = 5,
      signal,
    }: {
      days?: number;
      signal?: AbortSignal;
    } = {}
  ): Promise<ForecastResponse> | never {
    const params = new URLSearchParams({
      key: this.key,
      q: location,
      days: String(days),
      aqi: 'no',
      alerts: 'no',
    });

    const response = await fetch(
      `${this.url}/v${this.version}/forecast.json?${params}`,
      {
        signal,
      }
    );

    let json: ForecastResponse | ErrorResponse | null = null;

    try {
      json = await response.json();
    } catch {}

    if (json === null) {
      throw new Error('Invalid json response');
    }

    // Use api error response first
    if (isErrorResponse(json)) {
      throw new Error(`${json.error.code}`);
    }

    // Otherwise fall back to status if response is no good
    if (!response.ok) {
      throw new Error(`${response.statusText} ${response.status}`);
    }

    return json;
  }
}

const Location = z.object({
  lat: z.number(),
  lon: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  tz_id: z.string(),
  localtime_epoch: z.number(),
  localtime: z.string(),
});

const Condition = z.object({
  text: z.string(),
  icon: z.string(),
  code: z.number(),
});

const Current = z.object({
  last_updated_epoch: z.number(),
  last_updated: z.string(),
  temp_c: z.number(),
  temp_f: z.number(),
  is_day: z.number(),
  condition: Condition,
  wind_mph: z.number(),
  wind_kph: z.number(),
  wind_degree: z.number(),
  wind_dir: z.string(),
  pressure_mb: z.number(),
  pressure_in: z.number(),
  precip_mm: z.number(),
  precip_in: z.number(),
  humidity: z.number(),
  cloud: z.number(),
  feelslike_c: z.number(),
  feelslike_f: z.number(),
  vis_km: z.number(),
  vis_miles: z.number(),
  uv: z.number(),
  gust_mph: z.number(),
  gust_kph: z.number(),
});

const Hour = z.intersection(
  Current,
  z.object({
    time_epoch: z.number(),
    time: z.string(),
    windchill_c: z.number(),
    windchill_f: z.number(),
    heatindex_c: z.number(),
    heatindex_f: z.number(),
    dewpoint_c: z.number(),
    dewpoint_f: z.number(),
    will_it_rain: z.number(),
    chance_of_rain: z.number(),
    will_it_snow: z.number(),
    chance_of_snow: z.number(),
  })
);

const Day = z.object({
  maxtemp_c: z.number(),
  maxtemp_f: z.number(),
  mintemp_c: z.number(),
  mintemp_f: z.number(),
  avgtemp_c: z.number(),
  avgtemp_f: z.number(),
  maxwind_mph: z.number(),
  maxwind_kph: z.number(),
  totalprecip_mm: z.number(),
  totalprecip_in: z.number(),
  totalsnow_cm: z.number(),
  avgvis_km: z.number(),
  avgvis_miles: z.number(),
  avghumidity: z.number(),
  daily_will_it_rain: z.number(),
  daily_chance_of_rain: z.number(),
  daily_will_it_snow: z.number(),
  daily_chance_of_snow: z.number(),
  condition: Condition,
  uv: z.number(),
});

const Astro = z.object({
  sunrise: z.string(),
  sunset: z.string(),
  moonrise: z.string(),
  moonset: z.string(),
  moon_phase: z.string(),
  moon_illumination: z.string(),
  is_moon_up: z.number(),
  is_sun_up: z.number(),
});

const ForecastDay = z.object({
  date: z.string(),
  date_epoch: z.number(),
  day: Day,
  astro: Astro,
  hour: z.array(Hour),
});

const Forecast = z.object({
  forecastday: z.array(ForecastDay),
});

const ErrorResponse = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

const CurrentResponse = z.object({
  location: Location,
  current: Current,
});

const ForecastResponse = z.object({
  location: Location,
  current: Current,
  forecast: Forecast,
});

export type ErrorResponse = z.infer<typeof ErrorResponse>;

export type CurrentResponse = z.infer<typeof CurrentResponse>;

export type ForecastResponse = z.infer<typeof ForecastResponse>;
