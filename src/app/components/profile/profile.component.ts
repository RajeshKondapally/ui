import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Response } from '../../services/resposeconfig';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  constructor(private apiservice: ApiService, private commonService: CommonService) { }

  ngOnInit() {
  	this.apiservice.getProfileData().then((res) => {  	    
  		this.user = res.user;
  	}).catch(err => {
      this.commonService.flashMessageShow(err.message, 'err');   			
  	});
  }

}
