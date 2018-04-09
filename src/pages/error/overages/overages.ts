import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../../models/endOfShift';
import { CartPosition } from '../../models/cartPosition';
import { Error } from '../../models/error'; 
import { Item } from '../../models/item';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-overages',
  templateUrl: 'overages.html'
  })

export class OveragesPage{
  cartPosition: CartPosition;
  endOfShift: EndOfShift;
  route: Route;
  correct: Item;
  overage: number = 0;
  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage)
  {
    this.cartPosition = this.navParams.get('cartPosition');
    this.endOfShift = this.navParams.get('endOfShift');
    this.route = this.navParams.get('route');
    this.correct = this.navParams.get('correct');
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
    error.routeNumber = this.route.routeNumber;
    error.cartPosition = this.cartPosition.cartPosition;
    error.picker = this.cartPosition.picker;
    error.itemOverage = this.correct;
    this.endOfShift.errors.push(error);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    this.storage.set('endOfShift', this.endOfShift);
  }
  
}
