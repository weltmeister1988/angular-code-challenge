import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { WeatherModel } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherDataService {
  private readonly API_URL = 'https://api.open-meteo.com/v1';constructor(private http: HttpClient) {}

  getWeather(lat: string, lon: string): Observable<WeatherModel> {
    const url = `${this.API_URL}/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`;

    return this.http.get<any>(url);
  }
}