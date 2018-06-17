import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private apiservice: ApiService, private router: Router, private flashMessageService: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogout() {  	
  	
  	this.flashMessageService.show('You have successfully loggedout', {cssClass: 'alert-info'}); 
  	this.apiservice.logout();
  	this.router.navigate(['/']);  	  
  } 
}
