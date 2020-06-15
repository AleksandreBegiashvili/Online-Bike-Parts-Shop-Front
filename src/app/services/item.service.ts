import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemGet } from '../models/items/item-get.model';
import { isNullOrUndefined } from 'util';
import { ItemCreate } from '../models/items/item-create.model';
import { ItemUpdate } from '../models/items/item-update.model';
import { Condition } from '../models/items/condition.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  private createParams(itemName: string, pageNumber: number, pageSize: number, categoryId?: number) {
    let params = {
      name: itemName,
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      categoryId: !isNullOrUndefined(categoryId) ? categoryId.toString() : null
    };
    return params;
  }

  searchItems(itemName: string, pageNumber: number, pageSize: number) {
    let parameters = this.createParams(itemName, pageNumber, pageSize);
    return this.http.get<any>(`${this.baseUrl}/Item/GetAll`, { params: parameters });
  }

  searchItemsByCategoryId(categoryId: number, itemName: string, pageNumber: number = 1, pageSize: number = 10) {
    let params = this.createParams(itemName, pageNumber, pageSize, categoryId);
    return this.http.get<any>(`${this.baseUrl}/Item/GetAllByCategoryId`, { params: params });
  }

  createItem(item: ItemCreate) {
    return this.http.post(`${this.baseUrl}/Item/CreateItem`, item);
  }

  updateItem(item: ItemUpdate) {
    return this.http.put(`${this.baseUrl}/Item/UpdateItem`, item);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.baseUrl}/Item/DeleteItem/${id}`);
  }



}
