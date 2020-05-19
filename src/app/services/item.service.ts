import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemGet } from '../models/items/item-get.model';
import { isNullOrUndefined } from 'util';
import { ItemCreate } from '../models/items/item-create.model';
import { ItemUpdate } from '../models/items/item-update.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  private createParams(itemName: string, pageNumber: number, pageSize: number, categoryId?: number): HttpParams {
    let params = new HttpParams();
    params.set('name', itemName);
    params.set('pageNumber', pageNumber.toString());
    params.set('pageSize', pageSize.toString());
    if (!isNullOrUndefined(categoryId)) {
      params.set('categoryId', categoryId.toString());
    };
    return params;
  }

  searchItems(itemName: string, pageNumber: number = 1, pageSize: number = 10) {
    let params = this.createParams(itemName, pageNumber, pageSize);

    return this.http.get<ItemGet[]>(`${this.baseUrl}/Item/GetAll`, { params: params, observe: 'response' }).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  searchItemsByCategoryId(categoryId: number, itemName: string, pageNumber: number = 1, pageSize: number = 10) {
    let params = this.createParams(itemName, pageNumber, pageSize, categoryId);
    return this.http.get<ItemGet[]>(`${this.baseUrl}/Item/GetAllByCategoryId`, { params: params, observe: 'response' }).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  createItem(item: ItemCreate) {
    return this.http.post(`${this.baseUrl}/Item/CreateItem`, item, { observe: 'response' }).subscribe(
      result => console.log(result.status),
      error => console.log(error)
    );
  }

  updateItem(item: ItemUpdate) {
    return this.http.put(`${this.baseUrl}/Item/UpdateItem`, item, { observe: 'response' }).subscribe(
      result => console.log(result.status),
      error => console.log(error)
    );
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.baseUrl}/DeleteItem/${id}`, { observe: 'response' }).subscribe(
      result => console.log(result.status),
      error => console.log(error)
    );
  }
}
