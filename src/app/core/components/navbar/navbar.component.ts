import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/Features/Auth/Models/user.model';
import { LoginService } from 'src/app/Features/Auth/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user ?: User;
  constructor(private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginService.user().subscribe({
      next: (responce) => {
        this.user = responce;
      }
    });

    this.user = this.loginService.getUser();
  }

  OnLogout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/');
    
  }

}
