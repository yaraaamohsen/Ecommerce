import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-verify',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './email-verify.component.html',
  styleUrl: './email-verify.component.scss'
})
export class EmailVerifyComponent {
  constructor(private _AuthService : AuthService, private _Router: Router){}

  isLoading : boolean = false;
  errorMessage!: boolean;
  codeFormFlage: boolean = false
  
  sendEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  emailSubmit(){
    this._AuthService.sendEmailVerify(this.sendEmailForm.value).subscribe({
      next: (res) => {
        this.isLoading = true;
        this._Router.navigate(['/codeVerify']);
        this.isLoading = false;
      },
      error: (err) => {this.errorMessage = err.error.message}
    })

  }
}
