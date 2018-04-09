import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../../models/endOfShift';
import { CartPosition } from '../../models/cartPosition';
import { Error } from '../../models/error';
import { Route } from '../../models/route';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-wrapissue',
  templateUrl: 'wrapIssue.html'
  })

export class WrapIssuePage {
  cartPosition: CartPosition;
  endOfShift: EndOfShift;
  route: Route;

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage){
    this.cartPosition = this.navParams.get('cartPosition');
    this.endOfShift = this.navParams.get('endOfShift');
    this.route = this.navParams.get('route');
  }

  generateError(){
    var error = new Error();
    error.errorIndex = 3;
    error.picker = this.cartPosition.picker;
    error.routeNumber = this.route.routeNumber;
    error.cartPosition = this.cartPosition.cartPosition;
    this.endOfShift.errors.push(error);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    this.storage.set('endOfShift', this.endOfShift);
  }
}
