import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate() {
    if(localStorage.getItem('isLoggedIn')=='true'){
      return true;
    }else{
      alert('You are not logged in')
      this.router.navigate(['/home/auth/2'])
      return false;
    }
    
  }
  
}
