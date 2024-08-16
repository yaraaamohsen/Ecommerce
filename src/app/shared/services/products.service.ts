import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _HttpClient:HttpClient) { }

  getAllProduct() :Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products`)
  }

  getSpecificProduct(pId: string | null): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${pId}`)
  }
}
