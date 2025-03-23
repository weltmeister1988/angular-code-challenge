import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { WeatherDashboardFacadeService } from '../../state/weather-dashboard-facade.service';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-search.component.html',
  styleUrl: './city-search.component.scss'
})
export class CitySearchComponent {
  private searchSubject = new Subject<string>();
  private readonly debounce = 1000;

  constructor(private facade: WeatherDashboardFacadeService) {
    this.searchSubject.pipe(
      debounceTime(this.debounce),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query.trim()) {
        this.facade.searchCity(query);
      }
    });
  }

  onSearch(query: Event) {
    const value = (query.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }
}