import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
@Injectable()
export class CommonService {

  constructor( private flashMessageService: FlashMessagesService) { }

  isFieldValid(field: string, form: any) {    
    return !form.get(field).valid && form.get(field).touched;    
  }

  displayFieldCss(field: string, form: any) {
    return {
      'has-error': this.isFieldValid(field, form),
      'has-feedback': this.isFieldValid(field, form)
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  flashMessageShow(mesg, type) {
    if(type === 'err') {
      this.flashMessageService.show(mesg, {cssClass: 'alert-danger'});   
    } else {
      this.flashMessageService.show(mesg, {cssClass: 'alert-info'}); 
    }
    
  }
}
