import { Component } from '@angular/core';
import { LoginRequest } from '../Models/login-request.model';
import { LoginService } from '../Services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router
  )
  {
    this.model= {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void{
    this.loginService.login(this.model)
    .subscribe({
      next:(responce)=>{
        //set cookie sevices
        this.cookieService.set('Authorization', `Bearer ${responce.token}`,
          undefined,'/',undefined, true,'Strict');

        //Set user
        this.loginService.setUser({
          email: responce.email,
          roles: responce.roles
        });
        
        
        //Redirect to home page
        this.router.navigateByUrl('/');
      }
    })
  }
}
