import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from '../models/route';
import { CartPosition } from '../models/cartPosition';
import { Storage } from '@ionic/storage';
import { EndOfShift } from '../models/endOfShift';
import { Report } from '../models/report';
import { ErrorsPage } from '../errors/errors';
import { Item } from '../models/item';
import { Stop } from '../models/stop';

@Component({
  selector: 'page-cartPosition',
  templateUrl: 'cartPosition.html'
  })

export class CartPositionPage {
  theCartPosition: CartPosition = new CartPosition();
  storedCartPosition: Array<CartPosition> = [];
  endOfShift: EndOfShift;
  backUpItems: Array<Item> = [];
  stopNumber: string;
  theRoute: Route;
  showCompleted = false;
  constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage){
    this.theCartPosition = this.navParams.get('aCartPosition');
    this.backUpItems = this.theCartPosition.items;
    this.endOfShift = this.navParams.get('endOfShift');
    this.theRoute = this.navParams.get('route'); 
    this.stopNumber = this.navParams.get('stopNumber');
    this.storage.get('cartPositions').then((val) => {
      this.storedCartPosition = val;
    });
    /*
    for(var i = 0; i < this.theRoute.statuss.length; i++)
    {
      for(var j = 0; j < this.theRoute.statuss[i].stops.length; j++)
      {
	for(var k = 0; k < this.theRoute.statuss[i].stops[j].cartPositions.length; k++)
	{
	  if(this.theRoute.statuss[i].stops[j].cartPositions[k].cartPosition == this.theCartPosition.cartPosition)
	  {
	    console.log(this.theRoute.statuss[i].stops[j].cartPositions[k]);
	  }
	}
      }
    } 
    */


  }

  initializeItems(){
    this.theCartPosition.items = this.backUpItems;
  } 
  
  getItems(ev: any){
    this.initializeItems();

    let val = ev.target.value;
    /*
    for(var i = 0; i < this.theCartPosition.items.length; i++)
    { 
      this.theCartPosition.items[i].wrin.indexOf(val));
    }
    */
    if(val && val.trim() != ''){
      this.theCartPosition.items = this.theCartPosition.items.filter((item) => {
	console.log(item.wrin.indexOf(val));
	return (item.wrin.indexOf(val) > -1);
      }); 
    } 
  }
  isAudited(i: number){
    console.log(this.theCartPosition.items[i].selectedQuantity);
    console.log(this.theCartPosition.items[i].quantity);
    if(this.theCartPosition.items[i].selectedQuantity >= this.theCartPosition.items[i].quantity)
    {
      setTimeout(() => {
	console.log("Hello This should work"); 
	this.theCartPosition.items[i].audited = true;
	this.theCartPosition.auditedItems++;
      }, 500);
    }
    else if(this.theCartPosition.items[i].audited == true && this.theCartPosition.items[i].selectedQuantity < this.theCartPosition.items[i].quantity)
    {
      this.theCartPosition.items[i].audited = false;
      this.theCartPosition.auditedItems--;
    }
  }

  ionViewWillLeave(){
    if(this.theCartPosition.auditedItems == this.theCartPosition.items.length)
    {
      this.storage.set(this.theRoute.routeNumber, this.theRoute);
    }
  }   

  logErrors(i: number){
    this.navCtrl.push(ErrorsPage, {
      endOfShift: this.endOfShift,
      cartPosition: this.theCartPosition,
      route: this.theRoute,
      correct: this.theCartPosition.items[i]
    });
  }

  toggle(){
    if(this.showCompleted == false){
      this.showCompleted = true;
    }
    else if(this.showCompleted == true){
      this.showCompleted = false;
    }
  } 
  itemClicked(i: number){
    setTimeout(() =>{  
	if(this.theCartPosition.items[i].audited == true){
	  console.log("is true"); 
	  this.theCartPosition.items[i].audited = false;
	  this.theCartPosition.auditedItems--;
	  this.theCartPosition.items[i].selectedQuantity = 0;
	}
	else if(this.theCartPosition.items[i].audited == false){
	  this.theCartPosition.items[i].audited = true;
	  this.theCartPosition.auditedItems++;
	}
	console.log(this.theCartPosition.auditedItems + " == " + this.theCartPosition.items.length);
      }, 500);
   }
  
  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
