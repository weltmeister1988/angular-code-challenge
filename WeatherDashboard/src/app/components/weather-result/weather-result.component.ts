import { Component, inject } from '@angular/core';

import { WeatherDashboardFacadeService } from '../../state/weather-dashboard-facade.service';

@Component({
  selector: 'app-weather-result',
  imports: [],
  templateUrl: './weather-result.component.html',
  styleUrl: './weather-result.component.scss'
})
export class WeatherResultComponent {
  private readonly facade = inject(WeatherDashboardFacadeService);

  readonly weather = this.facade.weather;
  readonly selectedCity = this.facade.selectedCity;
  readonly error = this.facade.error;
}
