import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../../models/endOfShift';
import { CartPosition } from '../../models/cartPosition';
import { Item } from '../../models/item';
import { Error } from '../../models/error';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';
import { CartRequirements } from '../../models/cartRequirements';
import { AuditorService } from '../../auditor.service';
import { ConfirmErrorPage } from '../../confirmError/confirmError';

@Component({
  selector: 'page-shorts',
  templateUrl: 'shorts.html'
  })

export class ShortsPage{
  short: number = 0;
  routeIndex: number;
  cartRequirements: CartRequirements;
  error: Error = new Error();
  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private auditorService: AuditorService)
  {
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
    this.error.errorIndex = 5;
    this.error.itemShort = this.navParams.get('correct');
    this.error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    this.error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    this.error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
  }   

  subtract(){
    if(this.short > 0)
    {
      this.short--;
    }
  }

  add(){
    this.short++;
  }
  
  potentialError(){
    this.error.short = this.short;
    this.error.message = "Short on route " + this.error.routeNumber + ", cart " + this.error.cartPosition + ", picker " + this.error.picker + " shorted " + this.error.short + " " + this.error.itemShort.itemName;
    this.auditorService.addPotentialError(this.error);   
    this.navCtrl.pop();
  }

  generateError(){
    this.error.short = this.short;
    this.error.message = "Short on route " + this.error.routeNumber + ", cart " + this.error.cartPosition + ", picker " + this.error.picker + " shorted " + this.error.short + " " + this.error.itemShort.itemName;

    this.navCtrl.push(ConfirmErrorPage, {
      error: this.error
    });
  } 

  ionViewWillLeave(){
  }

}
