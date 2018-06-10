import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Student } from './student';
import { CommonService } from '../common.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	form: FormGroup;
  newStudent: Student;
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private commonservice: CommonService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],
      uname: [null, Validators.required],
      password: [null, Validators.required],
      dob: [null, Validators.required],
      gender: [null, Validators.required]
    });
    this.newStudent = new Student();
    
  }

  isFieldValid(field) {
    return this.commonservice.isFieldValid(field, this.form);
  }

  displayFieldCss(field) {
    return this.commonservice.displayFieldCss(field, this.form);
  }

  onSubmit() {    
    if (this.form.valid) {      
      this.apiservice.addStudent(this.newStudent).then(response => {
        console.log(response);
      });
    } else {
      this.commonservice.validateAllFormFields(this.form);
    }
  }

  reset(){
    this.form.reset();
  }

}
