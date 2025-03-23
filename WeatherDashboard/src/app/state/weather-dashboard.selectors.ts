import { Selector } from '@ngxs/store';

import { CityResultModel } from '../models/city.model';
import { WeatherDashboardState, WeatherDashboardStateModel } from './weather-dashboard.state';
import { WeatherModel } from '../models/weather.model';

export class WeatherDashboardSelectors {
  @Selector([WeatherDashboardState])
  static selectedCity(state: WeatherDashboardStateModel): CityResultModel | undefined {
    return state.selectedCity;
  }

  @Selector([WeatherDashboardState])
  static weather(state: WeatherDashboardStateModel): WeatherModel | undefined {
    return state.weather;
  }

  @Selector([WeatherDashboardState])
  static error(state: WeatherDashboardStateModel): string | undefined {
    return state.error;
  }
}
