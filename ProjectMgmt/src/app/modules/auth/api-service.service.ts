import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface project{
  projectId: number
  projectName: string
  description: string
  deadline: string
  userName: string
  status: string
}

export interface user{
  userName:string
  firstName: string
  lastName: string
  email:string
  password:string
  role: string
}
export interface idleUser{
  userName:string
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  addProject(project:project){
    return this.http.post<project>('http://localhost:5491/project/create', project)
  }

  getProjects(){
    return this.http.get<project[]>('http://localhost:5491/project/allprojects')
    .pipe(map((res)=>{
      return res
    }))
  }

  getIdleUsers(){
    return this.http.get<idleUser[]>('http://localhost:5491/user/idle')
    .pipe(map((res)=>{
      return res
    }))
  }

  addUser(newUser: user){
    return this.http.post<user>('http://localhost:5491/user/create', newUser)
  }
}
