import { Injectable } from '@angular/core';
import { EMPTY, map } from 'rxjs';
import { State, StateContext, Action } from '@ngxs/store';
import { catchError, switchMap } from 'rxjs/operators';

import { CityDataService } from '../services/city.data.service';
import { CityResultModel } from '../models/city.model';
import { LoadCityWeatherSuccess, SearchCity } from './weather-dashboard.actions';
import { WeatherModel } from '../models/weather.model';
import { WeatherDataService } from '../services/weather.data.service';
import { WeatherDashboardMapper } from '../mappers/weather-dashboard.mapper';

export interface WeatherDashboardStateModel {
  selectedCity?: CityResultModel;
  weather?: WeatherModel;
  error?: string;
}

@State<WeatherDashboardStateModel>({
  name: 'weatherDashboard',
  defaults: {
    selectedCity: undefined,
    weather: undefined,
    error: undefined
  },
})
@Injectable()
export class WeatherDashboardState {
  constructor(private cityDataService: CityDataService, private weatherDataService: WeatherDataService) {}

  @Action(SearchCity)
  searchCity(ctx: StateContext<WeatherDashboardStateModel>, action: SearchCity) {
    ctx.patchState({ error: undefined });

    return this.cityDataService.searchCity(action.query).pipe(
      switchMap(results => {
        if (results.length > 0) {
          const city = results[0];
          ctx.patchState({ selectedCity: city });
          return this.weatherDataService.getWeather(city.lat, city.lon).pipe(
            map(dto => WeatherDashboardMapper.toWeatherModel(dto, city.name)),
            map(weather => ctx.dispatch(new LoadCityWeatherSuccess(weather)))
          );
        }
        ctx.patchState({ selectedCity: undefined, weather: undefined, error: 'City not found.' });
        return EMPTY;
      }),
      catchError(() => {
        ctx.patchState({ error: 'Something went wrong while fetching weather.' });
        return EMPTY;
      })
    );
  }

  @Action(LoadCityWeatherSuccess)
  loadCityWeatherSuccess(ctx: StateContext<WeatherDashboardStateModel>, action: LoadCityWeatherSuccess) {
    ctx.patchState({ weather: action.weather, error: undefined });
  }
}
