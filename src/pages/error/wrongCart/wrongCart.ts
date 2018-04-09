import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartPosition } from '../../models/cartPosition';
import { EndOfShift } from '../../models/endOfShift';
import { Error } from '../../models/error';
import { Route } from '../../models/route';
import { Item } from '../../models/item';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-wrongcart',
  templateUrl: 'wrongCart.html'
  })

export class WrongCartPage{
  cartPosition: CartPosition;
  endOfShift: EndOfShift;
  route: Route;
  cartPositions: Array<CartPosition> = [];
  error: Error = new Error();
  correct: Item = new Item();

  constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage){
    this.cartPosition = this.navParams.get('cartPosition');
    this.endOfShift = this.navParams.get('endOfShift');
    this.route = this.navParams.get('route');    
    this.correct = this.navParams.get('correct'); 

    this.getCartPosition();
  }

  getCartPosition(){
    for(var i = 0; i < this.route.statuss.length; i++)
    {
      for(var j = 0; j < this.route.statuss[i].stops.length; j++)
      {
	for(var k = 0; k < this.route.statuss[i].stops[j].cartPositions.length; k++)
	{
	  this.cartPositions.push(this.route.statuss[i].stops[j].cartPositions[k]);
	}
      }
    }
  }

  generateError(){
    this.error.errorIndex = 6;
    this.error.cartPosition = this.cartPosition.cartPosition;
    this.error.routeNumber = this.route.routeNumber;
    this.error.cartPosition = this.cartPosition.cartPosition;
    this.error.picker = this.cartPosition.picker;
    this.endOfShift.errors.push(this.error);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    this.storage.set('endOfShift', this.endOfShift);
  }

  
}
