import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Condition } from '../models/items/condition.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  private baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  getConditions(): Observable<Condition[]> {
    return this.http.get<Condition[]>(`${this.baseUrl}/Condition/GetConditions`);
  }
}
