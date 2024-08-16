import { Cart, Data } from './../../../shared/models/cart';
import { CartService } from './../../../shared/services/cart.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  myCart!: Cart;
  cartData!: Data;

  constructor(private _CartService:CartService, private _ToastrService: ToastrService){}
  
  ngOnInit(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage' , '/cart')
    }

    this._CartService.getCartApi().subscribe({
      next: (res)=>{
        this.myCart = res;
        console.log(this.myCart);
        this.cartData= this.myCart.data;

      }
    })  
  }

  updatedCound(currentCount: number, pId: string){
    if(currentCount <= 0){
      this.removeItem(pId)    
    }
    else{
      this._CartService.updateQuantity(currentCount.toString(), pId).subscribe({
        next: (res)=>{
          console.log(res);
          this._ToastrService.success("item count updated successfully");
          this.myCart = res;
          this.cartData= res.data;
        }
      })
    }
  }
 
  removeItem(pId : string){
    this._CartService.deleteItem(pId).subscribe((res)=>{
      console.log(res);
      
      this._ToastrService.warning('item cleared');
      this.myCart = res;
          this.cartData= res.data;

    })
  }
}
