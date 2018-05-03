import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartPosition } from '../../models/cartPosition';
import { EndOfShift } from '../../models/endOfShift';
import { Route } from '../../models/route'; 
import { Error } from '../../models/error';
import { Storage } from '@ionic/storage';
import { AuditorService } from '../../auditor.service';
import { ConfirmErrorPage } from '../../confirmError/confirmError'; 
import { CartRequirements } from '../../models/cartRequirements'; 

@Component({
  selector: 'page-damagedcarthandles',
  templateUrl: 'damagedCartHandles.html'
})

export class DamagedCartHandles{
    routeIndex: number;
    cartRequirements: CartRequirements;

    constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage, private auditorService: AuditorService)
  {
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
  }

  generateError(){
    var error = new Error();
    error.errorIndex = 1;
    error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex); 
    error.message = "Damaged Cart Handles on route " + error.routeNumber + ", the cart was picked by " + error.picker;
    this.navCtrl.push(ConfirmErrorPage, {
      error: error
    });
  }

  ionViewWillLeave(){
  }
}

