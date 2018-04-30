import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartPosition } from '../../models/cartPosition';
import { EndOfShift } from '../../models/endOfShift';
import { Route } from '../../models/route'; 
import { Error } from '../../models/error';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-damagedcarthandles',
  templateUrl: 'damagedCartHandles.html'
})

export class DamagedCartHandles{
  cartPosition: CartPosition;
  endOfShift: EndOfShift;
  route: Route;
  constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage)
  {
    this.cartPosition = this.navParams.get('cartPosition');
    this.endOfShift = this.navParams.get('endOfShift');
    this.route = this.navParams.get('route');
  }

  generateError(){
    var error = new Error();
    error.errorIndex = 1;
    error.picker = this.cartPosition.picker.name;
    error.routeNumber = this.route.routeNumber;
    error.cartPosition = this.cartPosition.cartPosition; 
    this.endOfShift.errors.push(error);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
	this.storage.set('endOfShift', this.endOfShift);
  }
}

