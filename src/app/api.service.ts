import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ApiService {
	httpOptions;
  constructor(private http: HttpClient) { 
  	
  }

  //add contact
  addStudent(newStudent) {  	
  	return this.http.post('http://localhost:4000/api/studentregister', newStudent)
  	.toPromise().then(res => res);
  }

  authenticateStudent(user) {
  	return this.http.post('http://localhost:4000/api/slogin', user)
  	.toPromise().then(res => res);
  }
}
