import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { afterNextRender, inject } from '@angular/core';



export const authGuard: CanActivateFn = (route, state) => {

  let _AuthService: AuthService = inject(AuthService)
  let _Router: Router = inject(Router)

  if(typeof localStorage !== 'undefined'){
    if (localStorage.getItem('userToken')!= null){
      _AuthService.userData();
      return true;
    }
    else{
      _Router.navigate(['/login'])
      return false
    }
  }
  else{
    return false
  }  
};
