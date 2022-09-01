import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { ApiServiceService, project } from '../../auth/api-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private apiService:ApiServiceService, private router:Router) { }

  list$: Observable<any> = new Observable();

  myProjects:Observable<project[]> = new Observable();
  myProjects2: Observable<project[]> = new Observable();
  deleteResp$: Observable<any> = new Observable();
  
  SelectStatus = ['Completed','Uncompleted']
  ngOnInit(): void {
    this.showProjects()
  }

  // Search(){
  //   this.apiService.activate.emit(this.project)
  // }
  showProjects(){
    this.myProjects= this.apiService.getProjects()
    this.myProjects2= this.apiService.getProjects()
  }

  filterCategory(status:string){
    this.myProjects2 = this.myProjects.pipe(map(item => {
      let projects = item.filter(el=>el.status=== status || el.status==' ')
      // let projects = (item === status || status == '')
      return projects
    }))
    return this.myProjects2
  }

  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
    setTimeout(() => {
      window.location.reload()
    }, 500);
    
  }

  onDelete(projectname:any){
    this.deleteResp$ = this.apiService.deleteProject(projectname)
    .pipe(
      tap(val => { 
        setTimeout(() => {
          window.location.reload()
        }, 500);}))}
}
