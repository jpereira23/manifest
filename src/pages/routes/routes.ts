import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from '../models/route';
import { RoutePage } from '../route/route';
import { EndOfShift } from '../models/endOfShift';
import { Item } from '../models/item';
import { EndOfShiftPage } from '../endOfShift/endOfShift';
 

@Component({ 
  selector: 'page-routes',
  templateUrl: 'routes.html'
})

export class RoutesPage {
  selectedRoutes: Array<Route> = [];
  endOfShift: EndOfShift;
  routes: Array<Route> = [];

  constructor(private navParams: NavParams, private navCtrl: NavController){
    this.selectedRoutes = this.navParams.get('selectedRoutes');
    this.endOfShift = this.navParams.get('endOfShift');
    this.selectedRoutes.sort(function(a, b){
	  var select = +new Date(b.date);
	  return +new Date(a.date) - select;
	}); 
  }

  ionicViewWillEnter(){
    this.selectedRoutes.sort(function(a, b){
	  var select = +new Date(b.date);
	  return +new Date(a.date) - select;
	});   }

  routeSelected(route: Route){
    console.log(route); 
    this.navCtrl.push(RoutePage, { 
      aRoute: route, 
      endOfShift: this.endOfShift
    });
  }

  generateEndOfShift(){
    this.navCtrl.push(EndOfShiftPage, {
      routes: this.selectedRoutes,
      endOfShift: this.endOfShift
    });
  }

}
