import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  form!: FormGroup
  ngOnInit(): void {
    this.form = this.fb.group({
      projectName: [null, [Validators.required]],
      Description: [null, [Validators.required]],
      Deadline: [null, [Validators.required]],
      userName: [null, [Validators.required]],
    })
  }

}
