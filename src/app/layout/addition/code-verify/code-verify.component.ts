import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-verify',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './code-verify.component.html',
  styleUrl: './code-verify.component.scss'
})
export class CodeVerifyComponent {
  constructor(private _AuthService : AuthService, private _Router: Router){}

  isLoading : boolean = false;
  errorMessage!: boolean;

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  })

  codeSubmit(){
    this._AuthService.sendCode(this.codeForm.value).subscribe({
      next: (res) => {
        this.isLoading = true;
        this._Router.navigate(['/resetPassword']);
        this.isLoading= false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;        
      }
    })
  }
}
