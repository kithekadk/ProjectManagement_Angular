import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService, project } from '../../auth/api-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private apiService:ApiServiceService, private router:Router) { }

  myProjects!:project[]
  myProjects2! :project[]
  
  SelectStatus = ['Completed','Uncompleted']
  ngOnInit(): void {
    this.showProjects()
  }

  showProjects(){
    this.apiService.getProjects().subscribe(res=>{
      this.myProjects = res
      this.myProjects2 = res
    })
  }

  filterCategory(status:string){
    this.myProjects2 = this.myProjects.filter(item => {
      let projects = (item.status === status || status == '')
      return projects
    })
    return this.myProjects2
  }

  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
    setTimeout(() => {
      window.location.reload()
    }, 500);
    
  }
}
