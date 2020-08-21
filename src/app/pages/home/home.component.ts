import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();

  bogotaCurrentWeather: any;
  bogotaForecast: any;
  parisForecast: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.fetchWeather();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchWeather(): void {
    this.api.fetchBogotaWeather()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.bogotaCurrentWeather = {
          type: res.weather[0].main,
          icon: res.weather[0].icon,
          temp: res.main.temp,
          name: res.name
        };
      }, (errorResponse) => {
        alert('Hubo un error consultando clima de Bogotá.');
      });

    this.api.fetchBogotaForecast()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.createForecastObject(res);
      }, (errorResponse) => {
        alert('Hubo un error consultando clima de los siguientes días de Bogotá.');
      });

    this.api.fetchParisForecast()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        console.log('res: ', res);
        this.parisForecast = res;
      }, (errorResponse) => {
        alert('Hubo un error consultando clima de los siguientes días de Paris.');
      });
  }

  createForecastObject(response: any): void {
    if (response) {
      this.bogotaForecast = {
        daysQuantity: response.cnt,
        list: []
      };

      for (const forecast of response.list) {
        this.bogotaForecast.list.push({
          date: this.calculateDay(forecast.dt_txt),
          temp_max: forecast.main.temp_max,
          temp_min: forecast.main.temp_min,
          type: forecast.weather[0].main,
          icon: forecast.weather[0].icon
        });
      }
      console.log(this.bogotaForecast);
    }
  }

  calculateDay(dateText: string): string {
    const date = moment(dateText, 'YYYY-MM-DD HH:mm:ss');
    const dayNumber = date.get('day');

    let dayText = '';
    switch (dayNumber) {
      case 0:
        dayText = 'Domingo';
        break;
      case 1:
        dayText = 'Lunes';
        break;
      case 2:
        dayText = 'Martes';
        break;
      case 3:
        dayText = 'Miércoles';
        break;
      case 4:
        dayText = 'Jueves';
        break;
      case 5:
        dayText = 'Viernes';
        break;
      case 6:
        dayText = 'Sábado';
        break;
      default:
        break;
    }
    return `${dayText} ${date.format('HH:mm')}`;
  }
}
