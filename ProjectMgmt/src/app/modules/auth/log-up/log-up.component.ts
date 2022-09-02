import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { jituEmailValidator } from './custom-validator';

@Component({
  selector: 'app-log-up',
  templateUrl: './log-up.component.html',
  styleUrls: ['./log-up.component.css']
})
export class LogUpComponent implements OnInit {
  

  constructor(private fb:FormBuilder, private apiService:ApiServiceService, private router:Router) {
   }
  form! : FormGroup;
  ngOnInit(): void {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', [Validators.required, jituEmailValidator()]],
        password: ['', Validators.required]
      })
  }
  
filled=false

  onRegister(){
    const obj={
      form: this.form.value
    }
    this.apiService.addUser(obj.form).subscribe(res=>{
      console.log(res);
      this.router.navigate(['home/auth/2'])
      
    })
  }
}
