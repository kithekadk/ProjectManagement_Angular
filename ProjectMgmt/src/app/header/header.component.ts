import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../modules/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, public auth:AuthServiceService) { }

  ngOnInit(): void {
  }


  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
