import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin !: boolean;

  constructor(private _AuthService:AuthService, private _Router:Router){}

  ngOnInit(): void{
    this._AuthService.userDecode.subscribe(()=>{
      if(this._AuthService.userDecode.getValue() == null){
        this.isLogin = false;
      }
      else{
        this.isLogin = true;
      }
    })

    
  }

  signout(){
    localStorage.removeItem('userToken');
    this._AuthService.userDecode.next(null);
    this._Router.navigate(['/login'])
  }
}
