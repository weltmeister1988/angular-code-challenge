import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CitySearchComponent } from './components/city-search/city-search.component';
import { WeatherResultComponent } from './components/weather-result/weather-result.component';

@Component({
  imports: [RouterModule, CitySearchComponent, WeatherResultComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'WeatherDashboard';
}
