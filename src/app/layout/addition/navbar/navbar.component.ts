import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CartService } from '../../../shared/services/cart.service';
import { Cart } from '../../../shared/models/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLogin !: boolean;
  cartItems: number = 0;
  constructor(private _AuthService:AuthService, private _Router:Router, private _CartService:CartService){}

  ngOnInit(): void{
    this._AuthService.userDecode.subscribe(()=>{
      if(this._AuthService.userDecode.getValue() == null){
        this.isLogin = false;
      }
      else{
        this.isLogin = true;
      }
    })

    console.log(this._CartService.hamada());
    
    this._CartService.hamada()
 
  }

  signout(){
    localStorage.removeItem('userToken');
    this._AuthService.userDecode.next(null);
    this._Router.navigate(['/login'])
  }
}
