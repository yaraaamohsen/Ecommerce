import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../base/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private _HttpClient:HttpClient) { }
 
  getAllCategories(): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/categories`)
  }

  getSpecificCategory(cId : string | null): Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/categories/${cId}`)
  }
}
