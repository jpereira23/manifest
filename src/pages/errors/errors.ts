import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndOfShift } from '../models/endOfShift';
import { CartPosition } from '../models/cartPosition';
import { CartHandlesPage } from '../error/cartHandles/cartHandles';
import { DamagedCartHandles } from '../error/damagedCartHandles/damagedCartHandles';
import { MisPickPage } from '../error/misPick/misPick';
import { WrapIssuePage } from '../error/wrapIssue/wrapIssue';
import { BunErrorPage } from '../error/bunError/bunError';
import { ShortsPage } from '../error/shorts/shorts';
import { OveragesPage } from '../error/overages/overages';
import { WrongCartPage } from '../error/wrongCart/wrongCart';
import { Item } from '../models/item';
import { Route } from '../models/route';

@Component({
  selector: 'page-errors',
  templateUrl: 'errors.html'
  })

export class ErrorsPage{
  endOfShift: EndOfShift;
  cartPosition: CartPosition;
  route: Route;
  errors: Array<string> = ["Missing Cart Handle", "Damaged Cart Wheels", "Mis-Picks", "Wrap Issues", "Bun Errors", "Shorts", "Wrong Cart", "Overages"];
  correct: Item = new Item();
  
  constructor(private navParams: NavParams, private navCtrl: NavController){
    this.endOfShift = this.navParams.get('endOfShift'); 
    this.cartPosition = this.navParams.get('cartPosition'); 
    this.route = this.navParams.get('route');
    this.correct = this.navParams.get('correct');
  }

  launchErrorPage(i: number)
  {
    switch(i)
    {
      case 0: 
	this.navCtrl.push(CartHandlesPage,{
	  cartPosition: this.cartPosition,
	  endOfShift: this.endOfShift,
	  route: this.route
	});
	break;
      case 1: 
	this.navCtrl.push(DamagedCartHandles,{
	  cartPosition: this.cartPosition,
	  endOfShift: this.endOfShift,
	  route: this.route
	});
	break;
      case 2: 
	this.navCtrl.push(MisPickPage, {
	  cartPosition: this.cartPosition,
	  endOfShift: this.endOfShift,
	  route: this.route,
	  correct: this.correct
	});
	break;
      case 3: 
	this.navCtrl.push(WrapIssuePage, {
	  cartPosition: this.cartPosition,
	  endOfShift: this.endOfShift,
	  route: this.route
	});
	break;
      case 4:
	this.navCtrl.push(BunErrorPage, {
	  cartPosition: this.cartPosition,
	  endOfShift: this.endOfShift,
	  route: this.route
	});
	break;
      case 5: 
	this.navCtrl.push(ShortsPage, {
	  cartPosition: this.cartPosition,
	  endOfShift: this.endOfShift,
	  route: this.route,
	  correct: this.correct
	});
	break;
      case 6:
      this.navCtrl.push(WrongCartPage, {
	  cartPosition: this.cartPosition,
	  endOfShift: this.endOfShift,
	  route: this.route,
	  correct: this.correct
	});
	break;
      case 7:
	this.navCtrl.push(OveragesPage, {
	  cartPosition: this.cartPosition,
	  endOfShift: this.endOfShift,
	  route: this.route,
	  correct: this.correct
	});
	break;  
      default: 
	break;
    }
  }
  }
