import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../../models/endOfShift';
import { CartPosition } from '../../models/cartPosition';
import { Error } from '../../models/error';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';
import { CartRequirements } from '../../models/cartRequirements';
import { AuditorService } from '../../auditor.service';
import { ConfirmErrorPage } from '../../confirmError/confirmError';

@Component({
  selector: 'page-carthandles',
  templateUrl: 'cartHandles.html'
  })

export class CartHandlesPage {

  routeIndex: number;
  cartRequirements: CartRequirements;
  error: Error = new Error();

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private auditorService: AuditorService){
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
    this.error.errorIndex = 0;
    this.error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    this.error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    this.error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    this.error.message = "Missing Cart Handle on route " + this.error.routeNumber + " cart " + this.error.cartPosition + ", picked by picker " + this.error.picker;

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
