import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { WeatherDashboardSelectors } from './weather-dashboard.selectors';
import { SearchCity } from './weather-dashboard.actions';

@Injectable({ providedIn: 'root' })
export class WeatherDashboardFacadeService {
  private readonly store = inject(Store);

  readonly selectedCity = this.store.selectSignal(WeatherDashboardSelectors.selectedCity);
  readonly weather = this.store.selectSignal(WeatherDashboardSelectors.weather);
  readonly error = this.store.selectSignal(WeatherDashboardSelectors.error);

  searchCity(query: string) {
    this.store.dispatch(new SearchCity(query));
  }
}
