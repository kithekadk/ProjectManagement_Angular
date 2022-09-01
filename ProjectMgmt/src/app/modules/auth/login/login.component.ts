import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiServiceService, role, user } from '../api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  role!:role
  constructor(private apiService:ApiServiceService, private router:Router) { }

  ngOnInit(): void {
  }


  login(data: user){
    this.apiService.loginUser(data).subscribe(res=>{
      localStorage.setItem("token", res.token)
    })
    setTimeout(() => {
      this.checkRole()
      this.redirect() 
    }, 500);
  }

  checkRole(){
      this.apiService.checkUserRole().subscribe(res=>{
      console.log(res)

  })
}

  redirect(){
    let role = localStorage.getItem('role')
    if ( role == 'user'){
      this.router.navigate(['/home/user/dashboard']);

    }else if(role == 'admin'){
      this.router.navigate(['/admin/dashboard']);
    }
  }

}

