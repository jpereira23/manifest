import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataService } from '../data.service';
import { Route } from '../models/route';
import { RoutesPage } from '../routes/routes';
import { EndOfShift } from '../models/endOfShift';
import { Item } from '../models/item';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  routes: Array<any> = [];
  dates: Array<Date> = [];
  endOfShift: EndOfShift;
  
  theDate: Date;
  selectedRoutes: Array<Route> = [];
  constructor(public navCtrl: NavController, private dataService: DataService, private storage: Storage) {
      this.endOfShift = new EndOfShift();

  }

  delegateForManifests(manifests)
  {
    this.routes = manifests;

    this.selectedRoutes = this.routes;
    //this.theDate = new Date(this.routes[0].date);
    for(var i = 0; i < this.routes.length; i++)
    {
      this.storage.get(this.routes[i].routeNumber).then((val) => {
	if(val != null)
	{
	  this.eliminateAddedRoute(val);
	  this.selectedRoutes.unshift(val); 
	}
	this.selectedRoutes.sort(function(a, b){
	  var select = +new Date(b.date);
	  return +new Date(a.date) - select;
	});

      }); 
    }

        this.navCtrl.push(RoutesPage, {
      selectedRoutes: this.selectedRoutes,
      endOfShift: this.endOfShift,
      routes: this.routes
    });

  }

  eliminateAddedRoute(route: Route)
  {
    for(var i = 0; i < this.selectedRoutes.length; i++)
    {
      if(route.routeNumber == this.selectedRoutes[i].routeNumber)
      {
	this.selectedRoutes.splice(i, 1);
      }
    }  
  }

  generateRoutes(){
    this.selectedRoutes = [];
    this.dataService.getManifests()
      .subscribe(res => this.delegateForManifests(res));
  }

}
