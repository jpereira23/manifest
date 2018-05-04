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
    error: Error = new Error();

    constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage, private auditorService: AuditorService)
  {
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
    this.error.errorIndex = 1;
    this.error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    this.error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    this.error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex); 
    this.error.message = "Damaged Cart Handles on route " + this.error.routeNumber + ", cart " + this.error.cartPosition + ", picked by picker " + this.error.picker;

  }

  generateError(){
    this.navCtrl.push(ConfirmErrorPage, {
      error: this.error
    });
  }

  potentialError(){
    this.auditorService.addPotentialError(this.error);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
  }
}

