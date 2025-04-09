import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../Models/login-request.model';
import { LoginResponce} from '../Models/login-responce.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  login(request: LoginRequest): Observable<LoginResponce> {
    return this.http.post<LoginResponce>(`${environment.apiBaseUrl}/api/Auth/login`, {
      email : request.email,
      password : request.password
    });
  }

  setUser(user: User): void {

    this.$user.next(user);

    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (!email || !roles) {
      return undefined;
    }

    return {
      email,
      roles: roles.split(',')
    };
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
