import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Route } from '../models/route';
import { RoutePage } from '../route/route';
import { EndOfShift } from '../models/endOfShift';
import { Item } from '../models/item';
import { EndOfShiftPage } from '../endOfShift/endOfShift';
import { AuditorService } from '../auditor.service';
 

@Component({ 
  selector: 'page-routes',
  templateUrl: 'routes.html'
})

export class RoutesPage {
  selectedRoutes: Array<Route> = [];
  endOfShift: EndOfShift;
  routes: Array<Route> = [];

  constructor(private navParams: NavParams, private navCtrl: NavController, private auditorService: AuditorService){
    this.selectedRoutes = this.auditorService.getRoutes(); 
    this.endOfShift = this.navParams.get('endOfShift');
  }

  ionicViewWillEnter(){
    
  }

  ionViewWillLeave(){
    this.auditorService.saveAudited();  
  }

  routeSelected(route: Route){
    this.navCtrl.push(RoutePage, { 
      routeNumber: route.routeNumber, 
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
