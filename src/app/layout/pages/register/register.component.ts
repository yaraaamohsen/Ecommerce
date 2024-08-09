import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
Router
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  errorMessage: string = '';

  isLoading :boolean = false; 
  
  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  registerForm : FormGroup = new FormGroup({
    name : new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^01(0|1|2|5)[0-9]{8}$/)]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]),
    rePassword : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)])
  }, this.confirmPassword)

  registerSubmit(){
    this.isLoading = true;

    console.log(this.registerForm.value);
    this._AuthService.register(this.registerForm.value).subscribe({
      next :(res) =>{
        this.isLoading = false;
        console.log(res);
        this._Router.navigate(['login'])
      },
      error: (err) =>{
        this.isLoading = false;
        console.log(err.error.message);
        this.errorMessage = err.error.message;
      }
    })
  }

  confirmPassword(g: any){
    if(g.get('password').value === g.get('rePassword').value){
      return null 
    }
    else{
      return {'passwordMatched' : true}
    }
  }
}
