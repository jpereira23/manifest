import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';  
import { Storage } from '@ionic/storage';
import { Auditor } from '../models/auditor';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
  })

export class LoginPage{
  auditor: Auditor = new Auditor();
  constructor(private viewCtrl: ViewController, private storage: Storage){

  }
  
  submit(){
    this.viewCtrl.dismiss(this.auditor);
  }
}
