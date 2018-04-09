import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from '../models/route';
import { CartPosition } from '../models/cartPosition';
import { CartPositionPage } from '../cartPosition/cartPosition';
import { Storage } from '@ionic/storage'; 
import { EndOfShift } from '../models/endOfShift'; 
import { ErrorsPage } from '../errors/errors';
import { Item } from '../models/item'; 
import { Stop } from '../models/stop';


@Component({
  selector: 'page-route',
  templateUrl: 'route.html'
  })

export class RoutePage {
  theRoute: Route = new Route();
  selectedStop: Stop;
  filteredCartPositions: Array<CartPosition> = [];
  endOfShift: EndOfShift;

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage){
    this.theRoute = this.navParams.get('aRoute');
    //this.combineStopCartPosition();
    this.endOfShift = this.navParams.get('endOfShift'); 
    this.selectedStop = this.theRoute.statuss[0].stops[0];
    var tmpRoute; 
    
    console.log(this.theRoute);

    storage.get(this.theRoute.routeNumber).then((val) => {
      if(val != null)
      {
	console.log("Its not null");
	this.theRoute = val;
      }
    });
    storage.get('endOfShift').then((val) => {
      if(val == null)
      {
	storage.set('endOfShift', this.endOfShift);
      }
      else
      {
	this.endOfShift = val;
      }
    });
  }

  buns()
  {
    if(this.theRoute.bunsAudited == false)
    {
      this.theRoute.bunsAudited = true;
    }
    else if(this.theRoute.bunsAudited == true)
    {
      this.theRoute.bunsAudited = false;
    }

    this.storage.set(this.theRoute.routeNumber, this.theRoute);
  }

  cartPositionPicked(cartPosition: CartPosition){
    this.navCtrl.push(CartPositionPage, {
      aCartPosition: cartPosition,
      endOfShift: this.endOfShift,
      route: this.theRoute,
      stopNumber: this.selectedStop
    });
  }
  /*
  combineStopCartPosition(){
    for(var i = 0; i < this.theRoute.stops.length; i++)
    {
      for(var j = 0; j < this.theRoute.stops[i].cartPositions.length; j++)
      {
	this.filteredCartPositions.push(this.theRoute.stops[i].cartPositions[j]);
      }
    }
  }
  */

  isAudited(cartPosition: CartPosition)
  {
  //for(var i = 0; i < this.endOfShift.errors.length; i++)
  //{
	console.log("auditedItems: " + cartPosition.auditedItems);
	console.log("items: " + cartPosition.items.length);
	if(cartPosition.auditedItems == cartPosition.items.length)
	{
	  console.log("hello");
	  return 0;
	}
	else if(cartPosition.auditedItems > 0)
	{
	  return 1;
	}
	//}
	console.log("didnt make it");
    return 2; 
  }
  /*
  selectionMade()
  {
    this.checkStorageAgainstCartPositions();
    this.filteredCartPositions = [];
    for(var i  = 0; i < this.theRoute.cartPositions.length; i++)
    {
      if(this.theRoute.cartPositions[i].items[0].stopNumber == this.selectedStop)
      {
	this.filteredCartPositions.push(this.theRoute.cartPositions[i]);
      }
    }
  }   

  checkStorageAgainstCartPositions()
  {
    for(var i = 0; i < this.theRoute.cartPositions.length; i++)
    {
      console.log(this.theRoute.cartPositions[i].auditedItems + " = " + this.theRoute.cartPositions[i].items.length);
      if(this.theRoute.cartPositions[i].auditedItems == this.theRoute.cartPositions[i].items.length)
      {
	this.theRoute.cartPositions.splice(i, 1);
      }
      else if(this.theRoute.cartPositions[i].auditedItems > 0)
      {
	this.theRoute.cartPositions.splice(i, 1, this.theRoute.cartPositions[i]);
      }
    }
  }
  */

  thisHotRoute(selectedStop: string){
    for(var i = 0; i < this.theRoute.hotStops.length; i++)
    {
      if(this.theRoute.hotStops[i] == selectedStop){
	return true;
      }
    }
    return false;
  }
}
