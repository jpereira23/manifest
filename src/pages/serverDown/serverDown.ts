import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'server-down',
  templateUrl: 'serverDown.html'
})

export class ServerDown {
  constructor(private navCtrl: NavController){

  }

  done(){
    this.navCtrl.pop();
  }   
}
