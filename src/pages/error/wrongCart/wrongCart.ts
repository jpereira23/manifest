import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartPosition } from '../../models/cartPosition';
import { EndOfShift } from '../../models/endOfShift';
import { Error } from '../../models/error';
import { Route } from '../../models/route';
import { Item } from '../../models/item';
import { Storage } from '@ionic/storage';
import { CartRequirements } from '../../models/cartRequirements';
import { AuditorService } from '../../auditor.service';
import { ConfirmErrorPage } from '../../confirmError/confirmError';


@Component({
  selector: 'page-wrongcart',
  templateUrl: 'wrongCart.html'
  })

export class WrongCartPage{
  error: Error = new Error();
  routeIndex: number;
  cartRequirements: CartRequirements;
  cartPositions: Array<string>  = [];
  route: Route;
  correct: Item = new Item();

  constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage, private auditorService: AuditorService){
    this.routeIndex = this.navParams.get('routeIndex');
    this.correct = this.navParams.get('correct');
    this.cartRequirements = this.navParams.get('cartRequirements');
    this.route = this.auditorService.getRoute(this.routeIndex);
    
    this.getCartPosition();
    this.error.picked = this.correct;
    this.error.errorIndex = 6;
    this.error.cartPosition = this.auditorService.getCartPosition(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    this.error.routeNumber = this.auditorService.getRouteNumber(this.routeIndex);
    this.error.picker = this.auditorService.getPicker(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);

  }

  potentialError(){
    this.error.message = "Wrong Cart error on route " + this.error.routeNumber + ", cart " + this.error.cartPosition + ", picker " + this.error.picker + " placed a " + this.error.picked.itemName + " on cart " + this.error.wrongCartPosition + " instaed of " + this.error.cartPosition;
    this.auditorService.addPotentialError(this.error);    
    this.navCtrl.pop();
  }

  getCartPosition(){
    for(var i = 0; i < this.route.statuss.length; i++)
    {
      for(var j = 0; j < this.route.statuss[i].stops.length; j++)
      {
	for(var k = 0; k < this.route.statuss[i].stops[j].cartPositions.length; k++)
	{
	  this.cartPositions.push(this.route.statuss[i].stops[j].cartPositions[k].cartPosition);
	}
      }
    }
  }

  generateError(){
   this.error.message = "Wrong Cart error on route " + this.error.routeNumber + ", cart " + this.error.cartPosition + ", picker " + this.error.picker + " placed a " + this.error.picked.itemName + " on cart " + this.error.wrongCartPosition + " instaed of " + this.error.cartPosition;

    this.navCtrl.push(ConfirmErrorPage, {
      error: this.error
    });
  }

  ionViewWillLeave(){
  }

  
}
