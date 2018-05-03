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
  selector: 'page-wrapissue',
  templateUrl: 'wrapIssue.html'
  })

export class WrapIssuePage {
  routeIndex: number;
  cartRequirements: CartRequirements;

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private auditorService: AuditorService){
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
  }

  generateError(){
    var error = new Error();
    error.errorIndex = 3;
    error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.message = "Route " + error.routeNumber + ", cart " + error.cartPosition + " has a wrapIssue, it was picked by " + error.picker;
    this.navCtrl.push(ConfirmErrorPage, {
      error: error
    });	    
  }

  ionViewWillLeave(){
  }
}
