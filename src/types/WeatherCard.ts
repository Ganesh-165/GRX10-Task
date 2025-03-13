export interface WeatherData {
  city: string;
  highTemperature: number;
  lowTemperature: number;
  avgTemperature: number;
  condition: string;
  sunrise: Date;
  sunset: Date;
  wind: number;
  humidity: number;
  realFeel: number;
  timestamp: number;
  date: Date;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  };
  weather: { main: string }[];
  wind: {
    speed: number;
  };
}

export interface WeatherCardProps {
  cityName: string;
}

export interface ForecastSectionProps {
  cityName: string;
}

export interface FutureForecast {
  date: string;
  temp: number;
  imagSrc: string;
  condition: string;
}

export interface ApiResponse {
  city: {
    name: string;
    sunrise: number;
    sunset: number;
  };
  list: ForecastItem[];
}
