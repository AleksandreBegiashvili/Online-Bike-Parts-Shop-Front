import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/Location/GetLocations`);
  }
}

