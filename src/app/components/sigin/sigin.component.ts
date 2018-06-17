import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { User } from './user';
@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  form: FormGroup;
  user: User;
  message;
  messageClass;
  newResp: any;
  constructor(private formBuilder: FormBuilder, private apiservice: ApiService, private commonservice: CommonService, private router: Router) { }

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
          this.newResp = response;
        	console.log(response);       
          this.messageClass = 'alert alert-success'
          this.message = this.newResp.message;  
          this.apiservice.storeUserData(this.newResp.token, this.newResp.user);
          setTimeout(() => {
              this.router.navigate(['/home']);
          }, 2000);
      }).catch(err => {
          console.log(err);
          this.messageClass = 'alert alert-danger'
          this.message = err;
      });
    } else {
      this.commonservice.validateAllFormFields(this.form);
    }
  }

}
