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

  async getCurrentByLocation({
    location,
  }: {
    location: string;
  }): Promise<CurrentResponse> | never {
    const params = new URLSearchParams({
      key: this.key,
      q: location,
      aqi: 'no',
    });

    const response = await fetch(
      `${this.url}/v${this.version}/current.json?${params}`
    );

    let json: CurrentResponse | ErrorResponse | null = null;

    try {
      json = (await response.json()) as CurrentResponse | ErrorResponse;
    } catch {}

    if (!json) {
      throw new Error('Invalid json response');
    }

    // Use api error response first
    if ('error' in json) {
      throw new Error(`${json.error.code}`);
    }

    // Otherwise fall back to status if response is no good
    if (!response.ok) {
      throw new Error(`${response.statusText} ${response.status}`);
    }

    return json;
  }

  async getForecastByLocation({
    location,
    days,
  }: {
    location: string;
    days: number;
  }): Promise<ForecastResponse> | never {
    const params = new URLSearchParams({
      key: this.key,
      q: location,
      days: String(days),
      aqi: 'no',
      alerts: 'no',
    });

    const response = await fetch(
      `${this.url}/v${this.version}/forecast.json?${params}`
    );

    let json: ForecastResponse | ErrorResponse | null = null;

    try {
      json = (await response.json()) as ForecastResponse | ErrorResponse;
    } catch {}

    if (!json) {
      throw new Error('Invalid json response');
    }

    // Use api error response first
    if ('error' in json) {
      throw new Error(`${json.error.code}`);
    }

    // Otherwise fall back to status if response is no good
    if (!response.ok) {
      throw new Error(`${response.statusText} ${response.status}`);
    }

    return json;
  }
}

type Location = {
  lat: number;
  lon: number;
  name: string;
  region: string;
  country: string;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
};

type Condition = {
  text: string;
  icon: string;
  code: number;
};

type Current = {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
};

type Hour = Current & {
  time_epoch: number;
  time: string;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
};

type Forecast = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: Condition;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_moon_up: number;
    is_sun_up: number;
  };
  hour: Array<Hour>;
};

export type ErrorResponse = {
  error: {
    code: number;
    message: string;
  };
};

export type CurrentResponse = {
  location: Location;
  current: Current;
};

export type ForecastResponse = {
  location: Location;
  current: Current;
  forecast: {
    forecastday: Array<Forecast>;
  };
};
