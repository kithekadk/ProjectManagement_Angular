import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }


 isLoggedIn(){
  return (localStorage.getItem('isLoggedIn')=='true')
 }
 
}
