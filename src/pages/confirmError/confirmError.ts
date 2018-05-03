import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuditorService } from '../auditor.service';
import { Error } from '../models/error';

@Component({
  selector: 'page-error-confirm',
  templateUrl: 'confirmError.html'
})

export class ConfirmErrorPage{
  error: Error;
  constructor(private auditorService: AuditorService, private navCtrl: NavController, private navParams: NavParams){
    this.error = this.navParams.get('error');
    
  }

  submit(){
    console.log(this.error);
    this.auditorService.addError(this.error);
    this.navCtrl.pop();
    this.navCtrl.pop();
    this.navCtrl.pop();
  }


}
