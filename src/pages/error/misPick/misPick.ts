import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../../models/endOfShift';
import { CartPosition } from '../../models/cartPosition';
import { Item } from '../../models/item';
import { Route } from '../../models/route';
import { Error } from '../../models/error';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-mispick',
  templateUrl: 'misPick.html'
  })

export class MisPickPage {
  cartPosition: CartPosition;
  endOfShift: EndOfShift;
  route: Route;
  error: Error = new Error();

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage){
    this.cartPosition = this.navParams.get('cartPosition');
    this.endOfShift = this.navParams.get('endOfShift');
    this.error.correct = this.navParams.get('correct');
    this.route = this.navParams.get('route'); 
    this.error.picked = new Item();
    console.log(this.error.correct);
  }

  generateRoutes(){
    this.error.errorIndex = 2;
    this.error.picker = this.cartPosition.picker.name
    this.error.routeNumber = this.route.routeNumber;
    this.error.cartPosition = this.cartPosition.cartPosition;
    this.endOfShift.errors.push(this.error);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    this.storage.set('endOfShift', this.endOfShift);
  }

  
}
