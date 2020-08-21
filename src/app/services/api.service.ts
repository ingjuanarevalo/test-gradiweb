import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchBogotaWeather(): Observable<any> {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Bogota,co&APPID=1cb1d436b240616157a45454c9b55f0c&units=metric');
  }

  fetchBogotaForecast(): Observable<any> {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=Bogota,co&APPID=1cb1d436b240616157a45454c9b55f0c&units=metric&cnt=5');
  }

  fetchParisForecast(): Observable<any> {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=Paris,fr&APPID=1cb1d436b240616157a45454c9b55f0c&units=metric&cnt=2');
  }
}
