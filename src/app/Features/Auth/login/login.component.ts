import { Component } from '@angular/core';
import { LoginRequest } from '../Models/login-request.model';
import { LoginService } from '../Services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';
  isLoading: boolean = false;
  // In your component class
  showPassword = false;
  model: LoginRequest;

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    this.errorMessage = '';
    this.isLoading = true;
    this.loginService.login(this.model).subscribe({
      next: (responce) => {
        //set cookie sevices
        this.cookieService.set(
          'Authorization',
          `Bearer ${responce.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );

        //Set user
        this.loginService.setUser({
          email: responce.email,
          roles: responce.roles,
        });

        setTimeout(() => {
           //Redirect to home page
        this.router.navigateByUrl('/');
        this.isLoading = false;
        }, 1500);
       
      },

      error: (err) => {
        this.isLoading = false;
        if (err.status === 400) {
          this.errorMessage =
            err.error?.errors?.['']?.[0] || 'Invalid login attempt';
        } else {
          this.errorMessage = 'Something went wrong, please try again later';
        }
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
}
