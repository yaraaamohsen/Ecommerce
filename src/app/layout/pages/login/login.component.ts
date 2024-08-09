import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  isLoading: boolean = false

  errorMessage: string = '';

  isUser: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)])
  })

  loginSubmit() {
    this.isLoading = true;
    console.log(this.loginForm.value);
    this._AuthService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.userData();
        this._Router.navigate(['home']);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoading = false;
      }
    })
  }
}
