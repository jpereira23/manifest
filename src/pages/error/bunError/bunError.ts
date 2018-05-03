import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartPosition } from '../../models/cartPosition';
import { EndOfShift } from '../../models/endOfShift';
import { Error } from '../../models/error';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';
import { CartRequirements } from '../../models/cartRequirements';
import { AuditorService } from '../../auditor.service';
import { ConfirmErrorPage } from '../../confirmError/confirmError';

@Component({
  selector: 'page-bunerror',
  templateUrl: 'bunError.html'
})

export class BunErrorPage {
  routeIndex: number;
  cartRequirements: CartRequirements;

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private auditorService: AuditorService){
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
  }

  generateError(){
    var error = new Error();
    error.errorIndex = 4;
    error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.message = "Bun Error on route " + error.routeNumber;
    this.navCtrl.push(ConfirmErrorPage, {
      error: error
    });
  }
  
  ionViewWillLeave(){
  }

}
