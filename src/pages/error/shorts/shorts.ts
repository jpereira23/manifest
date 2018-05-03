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
  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private auditorService: AuditorService)
  {
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
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
    
  }

  generateError(){
    var error = new Error();
    error.errorIndex = 5;
    error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    error.short = this.short;
    error.message = error.picker + " was short " + error.short + " some short";
    this.navCtrl.push(ConfirmErrorPage, {
      error: error
    });
  } 

  ionViewWillLeave(){
  }

}
