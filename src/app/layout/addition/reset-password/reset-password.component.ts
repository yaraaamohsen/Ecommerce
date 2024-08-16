import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  constructor(private _AuthService : AuthService, private _Router: Router){}

  isLoading : boolean = false;
  errorMessage!: boolean;
  codeFormFlage: boolean = false
  
  resetPassword: FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)])
  })

  newPassword(){
    this._AuthService.sendNewPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        this.isLoading = true;
        this._Router.navigate(['/login']);
        this.isLoading = false;

      },
      error: (err)=> {
        this.errorMessage= err.error.message;
      },
      
      
    })
  }
}
