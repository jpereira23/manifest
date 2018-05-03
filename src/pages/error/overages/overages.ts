import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../../models/endOfShift';
import { CartPosition } from '../../models/cartPosition';
import { Error } from '../../models/error'; 
import { Item } from '../../models/item';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';
import { CartRequirements } from '../../models/cartRequirements';
import { ConfirmErrorPage } from '../../confirmError/confirmError';
import { AuditorService } from '../../auditor.service';

@Component({
  selector: 'page-overages',
  templateUrl: 'overages.html'
  })

export class OveragesPage{
  correct: Item;
  overage: number = 0;
  routeIndex: number;
  cartRequirements: CartRequirements; 

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private auditorService: AuditorService)
  {
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
  }

  subtract(){
    if(this.overage > 0){
      this.overage--;
    }
  }

  add(){
    this.overage++;
  }

  confirmError(){
    var error = new Error();
    error.errorIndex = 7;
    error.overage = this.overage;
    error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.itemOverage = this.correct;
    this.navCtrl.push(ConfirmErrorPage, {
      error: error
    });
  }

  ionViewWillLeave(){
  }
  
}
