import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ItemGet } from '../models/items/item-get.model';
import { Observable } from 'rxjs';
import { UserGet } from '../models/account/user-get.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  getItemsBySeller(pageNumber: number, pageSize: number): Observable<any> {
    let params = {
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    };
    return this.http.get<ItemGet[]>(`${this.baseUrl}/Dashboard/GetItemsBySeller`, {params: params});
  }

  getCurrentUserDetails(): Observable<UserGet> {
    return this.http.get<UserGet>(`${this.baseUrl}/Dashboard/GetCurrentUserDetails`);
  }

}
