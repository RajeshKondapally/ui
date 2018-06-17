import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './resposeconfig';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ApiService {
	httpOptions; 
  authToken;
  user;
  options;
  domain = "http://localhost:4000/";
  constructor(private http: Http) { 
  	
  }

  createAuthenticationHeaders() {
    this.loadToken();
    this.httpOptions = {
      headers: new Headers({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };    
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;    
  }

  httpPostPromise(url: string, reqBody: any) {    
      return this.http.post(url, reqBody, this.httpOptions).toPromise().then(res => res.json()).catch(this.handleError);
  }

  httpGetPromise(url, options?: object) {        
      return this.http.get(url, options).toPromise().then(res => res.json()).catch(this.handleError);
  }

  //add contact
  addStudent(newStudent) {
    return this.httpPostPromise(this.domain+ 'api/' + 'studentregister', newStudent);    
  }

  addTeacher(newTeacher) {
    return this.httpPostPromise(this.domain+ 'api/' + 'teacherregister', newTeacher);    
  }

  authenticateStudent(user) {    
    return this.httpPostPromise(this.domain + 'api/' + 'login', user);    
  }

  getProfileData() {
    this.createAuthenticationHeaders();
    return this.httpGetPromise(this.domain + 'post/' + 'profile', this.httpOptions);
  }

  getHomeData() {
    this.createAuthenticationHeaders();
    if(this.authToken) {
      return this.httpGetPromise(this.domain + 'post/' + 'getteachers', this.httpOptions);
    } else {
      return this.httpGetPromise(this.domain + 'api/' + 'getteacherspre');
    }
  }

  isUserNameAvailable(username) {
    return this.httpGetPromise(this.domain + 'api/' + 'useravailable/'+ username); 
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {    
    localStorage.clear();
    this.authToken = null;
    this.user = null;
  }

  loggedIn() {    
    return tokenNotExpired();
  }

  private handleError(error: any): Promise<any> {        
      error = error.json();
      return Promise.reject(error.message || error);
  }
  
}
