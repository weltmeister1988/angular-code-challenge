import { CityResultDto } from '../dtos/city-result.dto';
import { CityResultModel } from '../models/city.model';
import { WeatherModel } from '../models/weather.model';

const weatherDescriptions: Record<number, { icon: string; description: string }> = {
  0: { icon: '☀️', description: 'Clear sky' },
  1: { icon: '⛅', description: 'Mainly clear' },
  2: { icon: '⛅', description: 'Partly cloudy' },
  3: { icon: '⛅', description: 'Overcast' },
  45: { icon: '🌫', description: 'Fog' },
  48: { icon: '🌫', description: 'Fog' },
  51: { icon: '🌧', description: 'Light drizzle' },
  53: { icon: '🌧', description: 'Moderate drizzle' },
  55: { icon: '🌧', description: 'Dense drizzle' },
  61: { icon: '🌧', description: 'Slight rain' },
  63: { icon: '🌧', description: 'Moderate rain' },
  65: { icon: '🌧', description: 'Heavy rain' },
  71: { icon: '❄️', description: 'Light snow' },
  73: { icon: '❄️', description: 'Moderate snow' },
  75: { icon: '❄️', description: 'Heavy snow' },
  80: { icon: '🌦', description: 'Rain showers' },
  95: { icon: '⛈️', description: 'Thunderstorm' },
  99: { icon: '⛈️', description: 'Severe thunderstorm' }
};

export class WeatherDashboardMapper {
  static toCityResultModel(dto: CityResultDto): CityResultModel {
    return {
      name: dto.display_name,
      lat: dto.lat,
      lon: dto.lon
    };
  }

  static toWeatherModel(dto: any, city: string): WeatherModel {
    const weather = dto.current_weather;
    const meta = weatherDescriptions[weather.weathercode] || { icon: '❓', description: 'Unknown' };

    const currentTime = weather.time;
    const roundedTime = currentTime.slice(0, 13) + ':00';
    const timeIndex = dto.hourly.time.findIndex((t: string) => t === roundedTime);
    const humidity = timeIndex !== -1 ? dto.hourly.relativehumidity_2m[timeIndex] : null;

    return {
      city,
      temperature: weather.temperature,
      windSpeed: weather.windspeed,
      weatherCode: weather.weathercode,
      weatherIcon: meta.icon,
      weatherDescription: meta.description,
      humidity
    };
  }
}
