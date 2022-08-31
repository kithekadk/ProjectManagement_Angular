import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService, idleUser, project, user } from '../../auth/api-service.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})

export class NewProjectComponent implements OnInit {

  constructor(private fb:FormBuilder, private apiService:ApiServiceService, private router:Router) { }
  
  userNames!:idleUser[]

  getidleUsers(){
    return this.apiService.getIdleUsers().subscribe(res=>{
      this.userNames = res.filter((el)=>{      
        return el.userName
      })
       return this.userNames
    })
  }
  form!: FormGroup
  ngOnInit(): void {
    this.form = this.fb.group({
      projectName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      deadline: [null, [Validators.required]],
      userName: [null, [Validators.required]],
    })

    this.getidleUsers()
  }

  disclaimer = false

  addProject(){
    let object={
      form: this.form.value
    }
    this.apiService.addProject(object.form).subscribe(res=>{
      console.log(res);
      this.disclaimer=true
      setTimeout(() => {
        this.router.navigate(['admin/dashboard'])
      }, 1500);     
    })

  }

}
