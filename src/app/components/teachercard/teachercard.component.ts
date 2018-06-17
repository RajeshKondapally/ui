import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CommonService } from '../../services/common.service';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-teachercard',
  templateUrl: './teachercard.component.html',
  styleUrls: ['./teachercard.component.css']
})
export class TeachercardComponent implements OnInit {
  teachers: any = [];
  constructor(private apiservice: ApiService, private commonService: CommonService) { }

  ngOnInit() {
  	this.apiservice.getHomeData().then((res) => {  	    
  		this.teachers = res.user;
  	}).catch(err => {
      this.commonService.flashMessageShow(err.message, 'err');   			
  	});
  }

}
