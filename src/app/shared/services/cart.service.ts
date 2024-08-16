import { BehaviorSubject, observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../base/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userTokenHeader!: any;
  x!: any;
  noOfCartItems : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) {
    if(typeof localStorage !== 'undefined'){
      this. userTokenHeader = {token: localStorage.getItem('userToken')}
    }
   }

  addProduct(pId: string) : Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart`, {productId :pId}, {headers: this.userTokenHeader})
  }

  updateQuantity( count: string, pId: string) : Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${pId}`, {'count' : count}, {headers: this.userTokenHeader})
  }

  deleteItem(pId: string) : Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${pId}`, {headers: this.userTokenHeader})
  }

  getCartApi() : Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`, {headers: this.userTokenHeader})
  }

  clearCart(pId: string) : Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`, {headers: this.userTokenHeader})
  }

  hamada(){
    this.getCartApi().subscribe((res)=>{
      this.noOfCartItems.next(res.numOfCartItems);
      console.log(this.noOfCartItems.getValue());
      this.noOfCartItems.getValue();
  })
}
}


