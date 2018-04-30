import { Component, Input } from '@angular/core';
import { EndOfShift } from '../models/endOfShift';
import { NavController } from 'ionic-angular';
import { Route } from '../models/route'; 
import { Storage } from '@ionic/storage';
import { Stop } from '../models/stop';

@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
  })

export class ReportView{
  @Input() endOfShift: EndOfShift; 
  @Input() errors: Array<string>;
  @Input() auditedRoutes: Array<Route>;
  constructor(private storage: Storage, private navCtrl: NavController){ 
  } 

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

  startNewShift(){
    this.storage.set('endOfShift', null);
    this.storage.set('pickers', null);
    for(var i = 0; i < this.auditedRoutes.length; i++)
    {	
      this.storage.set(this.auditedRoutes[i].routeNumber, null);
    } 

    this.navCtrl.pop();
  } 


}
