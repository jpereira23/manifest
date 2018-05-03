import { Component, Input } from '@angular/core';
import { EndOfShift } from '../models/endOfShift';
import { NavController } from 'ionic-angular';
import { Route } from '../models/route'; 
import { Error } from '../models/error';
import { Storage } from '@ionic/storage';
import { Stop } from '../models/stop';
import { AuditorService } from '../auditor.service';

@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
  })

export class ReportView{
  auditedRoutes: Array<Route> = [];
  errors: Array<Error> = [];
  errorTypes: Array<string> = ["Missing Cart Handle", "Damage Cart Handle", "Mis-Picks", "Wrap Issue", "Bun Error", "Shorts", "Wrong Cart", "Overages"];
 
  constructor(private storage: Storage, private navCtrl: NavController, private auditorService: AuditorService){ 
    this.auditedRoutes = this.auditorService.getAuditedRoutes(); 
    this.errors = this.auditorService.getErrors();
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
    this.navCtrl.pop();
  } 


}
