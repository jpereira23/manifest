import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from '../models/route';
import { Stop } from '../models/stop';
import { EndOfShift } from '../models/endOfShift';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-endofshift',
  templateUrl: 'endOfShift.html'
  })

export class EndOfShiftPage{
  
  routes: Array<Route> = [];
  endOfShift: EndOfShift;
  eos: number = 1;
  errors: Array<string> = ["Missing Cart Handle", "Damage Cart Handle", "Mis-Picks", "Wrap Issue", "Bun Error", "Shorts", "Wrong Cart", "Overages"];
  auditedRoutes: Array<Route> = [];
  constructor(private navParams: NavParams, private storage: Storage, private navCtrl: NavController){
    this.routes = this.navParams.get('routes');
    this.endOfShift = this.navParams.get('endOfShift');

   this.storage.get('endOfShift').then((val) => {
      this.endOfShift = val;
    });

    var counter = 0;
    for(var i = 0; i < this.routes.length; i++)
    {
      this.storage.get(this.routes[i].routeNumber).then((val) => {
	counter++;
	if(val != null) 
	{
	  
	  this.auditedRoutes.push(val);
	  console.log(val.routeNumber);

	}

	if(i == counter)
	{
	//this.organizePickers();
	}
      }); 

    }
  }


  ionViewWillLeave(){
  //this.pickers = [];
  }

  /*
  organizePickers(){
    for(var i = 0; i < this.auditedRoutes.length; i++)
    {
      var aPicker = new RoutePicker();
      aPicker.routeNumber = this.auditedRoutes[i].routeNumber;
      for(var j = 0; j < this.auditedRoutes[i].statuss.length; j++)
      {
	for(var k = 0; k < this.auditedRoutes[i].statuss[j].stops.length; k++)
	{
	  for(var l = 0; l < this.auditedRoutes[i].statuss[j].stops[k].cartPositions.length; l++)
	  {
	    if(aPicker.isPicker(this.auditedRoutes[i].statuss[j].stops[k].cartPositions[l].picker) != true && this.auditedRoutes[i].statuss[j].stops[k].cartPositions[l].picker != '')
	    {
	      aPicker.pickers.push(this.auditedRoutes[i].statuss[j].stops[k].cartPositions[l].picker + "," + this.auditedRoutes[i].statuss[j].status);
	    }
	  }
	}
      } 
      if(aPicker.pickers.length > 0) 
      {
	this.pickers.push(aPicker);
      }
      aPicker = null;
    }

    console.log(this.pickers.length);
  }
  */
    allStopsComplete(stop: Stop){
    for(var i = 0; i < stop.cartPositions.length; i++)
    {
      if(stop.cartPositions[i].items.length != stop.cartPositions[i].auditedItems)
      {
	return false;
      }
    }
    return true;
  }
}
