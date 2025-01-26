import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {  LoginService } from '../Services/login.service'; // Adjust the path as necessary
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  
  
  //inject services
  const cookieService = inject(CookieService);
  const router = inject(Router);
  const loginService = inject(LoginService);
  const user = loginService.getUser();
 //check jwt token
 let token = cookieService.get('Authorization');

 if(token){
  token = token.replace('Bearer ', '');
  const decodedToken: any = jwtDecode(token);

  //check token expiry
  const expiryDate = decodedToken.exp * 1000;
  const currentTime = new Date().getTime();

  if(expiryDate < currentTime){
    //Logout user
    loginService.logout();
    router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }else{
    if(user?.roles.includes('Writer')){
      return true;
    }else{
      alert('You are not authorized to access this page');
      return false;
    }
  }

   return true;
 }else{
  //Logout user
  // authServices.logout();
  loginService.logout();
  router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
 }

  return false;

};
