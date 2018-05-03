import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../../models/endOfShift';
import { CartPosition } from '../../models/cartPosition';
import { Item } from '../../models/item';
import { Route } from '../../models/route';
import { Error } from '../../models/error';
import { Storage } from '@ionic/storage';
import { CartRequirements } from '../../models/cartRequirements';
import { AuditorService } from '../../auditor.service';
import { ConfirmErrorPage } from '../../confirmError/confirmError';

@Component({
  selector: 'page-mispick',
  templateUrl: 'misPick.html'
  })

export class MisPickPage {
  error: Error = new Error();
  routeIndex: number;
  cartRequirements: CartRequirements;
  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private auditorService: AuditorService){
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
    this.error.correct = this.navParams.get('correct');
    this.error.picked = new Item();
  }

  generateRoutes(){
    this.error.errorIndex = 2;
    this.error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    this.error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    this.error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    this.error.message = "Mis Pick on route " + this.error.routeNumber + " on cart " + this.error.cartPosition + ", " + this.error.picker + " selected a " + this.error.picked.itemName + " instead of a " + this.error.correct.itemName;
    this.navCtrl.push(ConfirmErrorPage, {
      error: this.error
    });
  }

  ionViewWillLeave(){
  }

  
}
