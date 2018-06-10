import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonService } from '../common.service';
import { User } from './user';
@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  form: FormGroup;
  user: User;
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private commonservice: CommonService) { }

  ngOnInit() {
  	this.form = this.formBuilder.group({      
      uname: [null, Validators.required],
      password: [null, Validators.required]      
    });
    this.user = new User
  }

  isFieldValid(field) {
    return this.commonservice.isFieldValid(field, this.form);
  }

  displayFieldCss(field) {
    return this.commonservice.displayFieldCss(field, this.form);
  }
  secureLogin() {
  	if (this.form.valid) {      
      this.apiservice.authenticateStudent(this.user).then(response => {
        console.log(response);
        var arr = new Array(response);
        console.log(arr.length);
        if(arr.length > 0) {
        	console.log("Authentication Succesfull");
        } else {
        	console.log("Invalid user")
        }
      });
    } else {
      this.commonservice.validateAllFormFields(this.form);
    }
  }

}
