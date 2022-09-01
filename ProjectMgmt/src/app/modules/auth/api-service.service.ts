import { HttpClient, HttpHeaders } from '@angular/common/http';
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

export interface role{
  email:string
  role:string
  userName: string
}
export interface idleUser{
  userName:string
}

export interface loginMessage{
  message:string
  token:string
}

interface token{
  token:string
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


  loginUser(logins:user){
    this.checkUserRole()
    return this.http.post<loginMessage>('http://localhost:5491/user/login', logins)
  }

  

  checkUserRole(){
    let token = localStorage.getItem('token') as string
    return this.http.get<role>('http://localhost:5491/user/check',{
      headers: new HttpHeaders({
        "token": token
      })
      
    }).pipe(map((res)=>{
      localStorage.setItem('role', res.role)      
      localStorage.setItem('userName', res.userName)
    return res.role
  }))
  }


  getMyTask(){
    return this.http.get<project[]>('http://localhost:5491/user/assigned')
    .pipe(map((res)=>{
      return res
    })
    )
  }
}
