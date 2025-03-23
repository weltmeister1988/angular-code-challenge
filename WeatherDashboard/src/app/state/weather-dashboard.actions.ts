import { WeatherModel } from '../models/weather.model';

export class SearchCity {
  static readonly type = '[WeatherDashboard] Search City';
  constructor(public query: string) {}
}

export class LoadCityWeatherSuccess {
  static readonly type = '[WeatherDashboard] Load City Weather Success';
  constructor(public weather: WeatherModel) {}
}
