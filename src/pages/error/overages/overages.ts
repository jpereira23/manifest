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
  error: Error = new Error();

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private auditorService: AuditorService)
  {
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
    this.correct = this.navParams.get('correct');
    this.error.errorIndex = 7;
    this.error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    this.error.itemOverage = this.correct;
    this.error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    this.error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);

  }

  subtract(){
    if(this.overage > 0){
      this.overage--;
    }
  }

  add(){
    this.overage++;
  }


  potentialError(){
    this.error.overage = this.overage;
    this.error.message = "Overage on route " + this.error.routeNumber + ", cart " + this.error.cartPosition + ", picker " + this.error.picker + " was over " + this.overage + " " + this.error.itemOverage.itemName;
    this.auditorService.addPotentialError(this.error); 
    this.navCtrl.pop();
  }

  confirmError(){
    this.error.overage = this.overage;
    this.error.message = "Overage on route " + this.error.routeNumber + ", cart " + this.error.cartPosition + ", picker " + this.error.picker + " was over " + this.overage + " " + this.error.itemOverage.itemName;

    this.navCtrl.push(ConfirmErrorPage, {
      error: this.error
    });
  }

  ionViewWillLeave(){
  }
  
}
