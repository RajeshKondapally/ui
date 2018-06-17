import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Student } from '../student';
import { CommonService } from '../../../services/common.service';
import { ApiService } from '../../../services/api.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  form: FormGroup;
  newStudent: Student;
  message;
  messageClass;
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private commonservice: CommonService) { }

  ngOnInit() {
  	this.form = this.formBuilder.group({
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],
      uname: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.newStudent = new Student();
  }

  isFieldValid(field) {
    return this.commonservice.isFieldValid(field, this.form);
  }

  displayFieldCss(field) {
    return this.commonservice.displayFieldCss(field, this.form);
  }

  checkUserAvailable() {
    if(this.newStudent.username) {
      this.apiservice.isUserNameAvailable(this.newStudent.username).then(response => {
        console.log(response);
        this.commonservice.flashMessageShow("Sorry! User name already taken.", 'err');
      }).catch(err => {
        console.log(err);
      });
    } 
    
  }

  onSubmit() {    
    if (this.form.valid) {
      this.newStudent['type'] = "ST";         
      this.apiservice.addStudent(this.newStudent).then(response => {
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
