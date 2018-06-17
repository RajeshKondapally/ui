import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule }     from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { SiginComponent } from './components/sigin/sigin.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';
import { StudentComponent } from './components/signup/student/student.component';
import { TeacherComponent } from './components/signup/teacher/teacher.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { TeachercardComponent } from './components/teachercard/teachercard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    SiginComponent,
    FieldErrorDisplayComponent,
    ProfileComponent,
    StudentComponent,
    TeacherComponent,
    CarouselComponent,
    TeachercardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    ReactiveFormsModule	,
    NgbModule.forRoot()
  ],
  providers: [
  ApiService,
  FlashMessagesService,
  CommonService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
