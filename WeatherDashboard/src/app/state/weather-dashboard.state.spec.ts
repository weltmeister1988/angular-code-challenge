import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { CityDataService } from '../services/city.data.service';
import { WeatherDataService } from '../services/weather.data.service';
import { WeatherModel } from '../models/weather.model';
import { CityResultModel } from '../models/city.model';
import { SearchCity } from './weather-dashboard.actions';
import { WeatherDashboardState } from './weather-dashboard.state';

const mockCityResult: CityResultModel = {
  name: 'London',
  lat: '51.5',
  lon: '-0.12'
};

const mockWeatherResponse = {
  current_weather: {
    time: '2025-03-23T14:30',
    temperature: 13.6,
    windspeed: 10.8,
    weathercode: 80
  },
  hourly: {
    time: ['2025-03-23T14:00'],
    relativehumidity_2m: [77]
  }
};

const expectedWeather: WeatherModel = {
  city: 'London',
  temperature: 13.6,
  windSpeed: 10.8,
  weatherCode: 80,
  weatherIcon: '🌦',
  weatherDescription: 'Rain showers',
  humidity: 77
};

describe('WeatherDashboardState', () => {
  let store: Store;
  const searchCityMock = jest.fn().mockReturnValue(of([mockCityResult]));
  const getWeatherMock = jest.fn().mockReturnValue(of(mockWeatherResponse));

  beforeEach(() => {
    searchCityMock.mockClear();
    getWeatherMock.mockClear();

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([WeatherDashboardState])],
      providers: [
        { provide: CityDataService, useValue: { searchCity: searchCityMock } },
        { provide: WeatherDataService, useValue: { getWeather: getWeatherMock } }
      ]
    });

    store = TestBed.inject(Store);
  });

  test('should search city and load weather into state', (done) => {
    store.dispatch(new SearchCity('London')).subscribe(() => {
      expect(searchCityMock).toHaveBeenCalledTimes(1);
      expect(getWeatherMock).toHaveBeenCalledTimes(1);

      const state = store.selectSnapshot((s) => s.weatherDashboard);
      expect(state.selectedCity).toEqual(mockCityResult);
      expect(state.weather).toEqual(expectedWeather);
      expect(state.error).toBeUndefined();
      done();
    });
  });

  test('should set error if no city is found', (done) => {
    searchCityMock.mockReturnValueOnce(of([]));

    store.dispatch(new SearchCity('Atlantis')).subscribe(() => {
      const state = store.selectSnapshot(s => s.weatherDashboard);
      expect(state.selectedCity).toBeUndefined();
      expect(state.weather).toBeUndefined();
      expect(state.error).toBe('City not found.');
      done();
    });
  });

  test('should set error on failed API call', (done) => {
    searchCityMock.mockReturnValueOnce(throwError(() => new Error('Network error')));

    store.dispatch(new SearchCity('London')).subscribe(() => {
      const state = store.selectSnapshot(s => s.weatherDashboard);
      expect(state.selectedCity).toBeUndefined();
      expect(state.weather).toBeUndefined();
      expect(state.error).toBe('Something went wrong while fetching weather.');
      done();
    });
  });
});
