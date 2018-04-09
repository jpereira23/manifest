import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../../models/endOfShift';
import { CartPosition } from '../../models/cartPosition';
import { Item } from '../../models/item';
import { Error } from '../../models/error';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-shorts',
  templateUrl: 'shorts.html'
  })

export class ShortsPage{
  cartPosition: CartPosition;
  endOfShift: EndOfShift;
  correct: Item;
  short: number = 0;
  route: Route;
  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage)
  {
    this.cartPosition = this.navParams.get('cartPosition');
    this.endOfShift = this.navParams.get('endOfShift'); 
    this.correct = this.navParams.get('correct');
    this.route = this.navParams.get('route');
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
  
  generateError(){
    var error = new Error();
    error.errorIndex = 5;
    error.itemShort = this.correct;
    error.routeNumber = this.route.routeNumber;
    error.cartPosition = this.cartPosition.cartPosition;
    error.picker = this.cartPosition.picker;
    error.short = this.short;
    this.endOfShift.errors.push(error);
    this.navCtrl.pop();
  } 

  ionViewWillLeave(){
    this.storage.set('endOfShift', this.endOfShift);
  }

}
