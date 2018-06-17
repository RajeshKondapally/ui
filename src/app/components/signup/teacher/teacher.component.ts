import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Teacher } from './teacher';
import { CommonService } from '../../../services/common.service';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  form: FormGroup;
  newTeacher: Teacher;
  message;
  messageClass;
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private commonservice: CommonService) { }

  ngOnInit() {
  	this.form = this.formBuilder.group({
      tfname: [null, Validators.required],
      tlname: [null, Validators.required],
      tphone: [null, Validators.required],
      temail: [null, Validators.required],
      tuname: [null, Validators.required],
      tpassword: [null, Validators.required],
      skills: [null, Validators.required],
      bio: [null, Validators.required]
    });
    this.newTeacher = new Teacher();
  }

  isFieldValid(field) {
    return this.commonservice.isFieldValid(field, this.form);
  }

  displayFieldCss(field) {
    return this.commonservice.displayFieldCss(field, this.form);
  }

  onSubmit() {    
    if (this.form.valid) {      
    	this.newTeacher['type'] = "TC";
      console.log(this.newTeacher);
      this.apiservice.addTeacher(this.newTeacher).then(response => {
        console.log(response);
        this.messageClass = 'alert alert-success'
        this.message = "User registered successfully.";
      }).catch(err => {
        this.messageClass = 'alert alert-danger'
        this.message = err;
      });
    } else {
      this.commonservice.validateAllFormFields(this.form);
    }
  }

  reset(){
    this.form.reset();
  }

}
