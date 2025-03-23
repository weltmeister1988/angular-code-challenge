import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CityResultDto } from '../dtos/city-result.dto';
import { CityResultModel } from '../models/city.model';
import { WeatherDashboardMapper } from '../mappers/weather-dashboard.mapper';

@Injectable({ providedIn: 'root' })
export class CityDataService {
  private readonly API_URL = 'https://nominatim.openstreetmap.org';

  constructor(private http: HttpClient) {}

  searchCity(query: string): Observable<CityResultModel[]> {
    const url = `${this.API_URL}/search?q=${encodeURIComponent(query)}&format=json`;
    return this.http.get<CityResultDto[]>(url).pipe(
      map(results => results.map(WeatherDashboardMapper.toCityResultModel))
    );
  }
}
