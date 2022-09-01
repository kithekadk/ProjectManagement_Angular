import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService, project } from '../../auth/api-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  myProjects!: project[]
  constructor(private apiService:ApiServiceService, private router:Router) { }

  ngOnInit(): void {
    
    
    this.apiService.getMyTask().subscribe(res=>{
      const newResult = res.filter((el)=>{
        return el.userName ==localStorage.getItem('userName')
      })
      
      this.myProjects = newResult
      console.log(res);
    })
  }

}
