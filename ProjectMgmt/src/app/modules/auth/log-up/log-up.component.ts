import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-up',
  templateUrl: './log-up.component.html',
  styleUrls: ['./log-up.component.css']
})
export class LogUpComponent implements OnInit {
  

  constructor(private fb:FormBuilder) { }
  form! : FormGroup;
  ngOnInit(): void {
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
        // confirmPassword: ['', Validators.required]  
      })
  }

  onRegister(){

  }
}
