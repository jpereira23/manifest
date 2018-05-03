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
import { CartRequirements } from '../models/cartRequirements';

@Component({
  selector: 'page-errors',
  templateUrl: 'errors.html'
  })

export class ErrorsPage{
  errors: Array<string> = ["Missing Cart Handle", "Damaged Cart Wheels", "Mis-Picks", "Wrap Issues", "Bun Errors", "Shorts", "Wrong Cart", "Overages"];
  correct: Item = new Item();
  routeIndex: number;
  cartRequirements: CartRequirements;
  constructor(private navParams: NavParams, private navCtrl: NavController){
    this.routeIndex = this.navParams.get('routeIndex');
    this.cartRequirements = this.navParams.get('cartRequirements');
    this.correct = this.navParams.get('correct');
  }

  launchErrorPage(i: number)
  {
    switch(i)
    {
      case 0: 
	this.navCtrl.push(CartHandlesPage,{
	  routeIndex: this.routeIndex,
	  cartRequirements: this.cartRequirements,
	});
	break;
      case 1: 
	this.navCtrl.push(DamagedCartHandles,{
	  routeIndex: this.routeIndex,
	  cartRequirements: this.cartRequirements
	});
	break;
      case 2: 
	this.navCtrl.push(MisPickPage, {
	  routeIndex: this.routeIndex,
	  cartRequirements: this.cartRequirements,
	  correct: this.correct
	});
	break;
      case 3: 
	this.navCtrl.push(WrapIssuePage, {
	  routeIndex: this.routeIndex,
	  cartRequirements: this.cartRequirements
	});
	break;
      case 4:
	this.navCtrl.push(BunErrorPage, {
	  routeIndex: this.routeIndex,
	  cartRequirements: this.cartRequirements
	});
	break;
      case 5: 
	this.navCtrl.push(ShortsPage, {
	  routeIndex: this.routeIndex,
	  cartRequirements: this.cartRequirements,
	  correct: this.correct
	});
	break;
      case 6:
      this.navCtrl.push(WrongCartPage, {
	  routeIndex: this.routeIndex,
	  cartRequirements: this.cartRequirements,
	  correct: this.correct
	});
	break;
      case 7:
	this.navCtrl.push(OveragesPage, {
	  routeIndex: this.routeIndex,
	  cartRequirements: this.cartRequirements,
	  correct: this.correct
	});
	break;  
      default: 
	break;
    }
  }
  }
