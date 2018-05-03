import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { DataService } from '../data.service';
import { Route } from '../models/route';
import { RoutesPage } from '../routes/routes';
import { EndOfShift } from '../models/endOfShift';
import { Item } from '../models/item';
import { LoginPage } from '../login/login';
import { Picker } from '../models/picker';
import { AuditorService } from '../auditor.service';
import { Auditor } from '../models/auditor';
import { RouteDate } from '../models/routeDate';
import { Storage  } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  routes: Array<any> = [];
  dates: Array<Date> = [];
  endOfShift: EndOfShift;
  modal: any; 
  theDate: Date;
  selectedRoutes: Array<Route> = [];
  auditor: Auditor = new Auditor();
  
  constructor(public navCtrl: NavController, private dataService: DataService, private modalCtrl: ModalController, private auditorService: AuditorService, private storage: Storage) 
  {
    this.endOfShift = new EndOfShift();
    this.auditorService.isAuditor.subscribe(val => {
      if(val == false)
      {

	  this.modal = this.modalCtrl.create(LoginPage);
	  this.modal.present();
	  this.modal.onDidDismiss((data) => {
	    if(data != null){	
	      this.auditor = data;
	      console.log("WTF");
	      this.auditorService.setAuditor(this.auditor);
	    }
       });
      }

      this.dataService.getPickers().subscribe(res => this.convertPickers(res));
    });
    
  }

  convertPickers(thePickers){
    var pickers: Array<Picker> = [];
    for(var i = 0; i < thePickers.length; i++)
    {
      var aPicker = new Picker();
      aPicker.convertJSON(thePickers[i]);
      pickers.push(aPicker);
    }
    this.auditorService.setPickers(pickers);
  }



  ionViewWillEnter(){
  }

  delegateForManifests(manifests)
  {
    this.selectedRoutes = this.convertJSONToRoutes(manifests);
    /*
    for(var i = 0; i < this.routes.length; i++)
    {
      this.storage.get(this.routes[i].routeNumber).then((val) => {
	if(val != null)
	{
	  this.eliminateAddedRoute(val);
	  this.selectedRoutes.unshift(val); 
	}
      }); 
    }
    */
    this.auditorService.initializeRoutes(this.selectedRoutes);

    this.navCtrl.push(RoutesPage, {
      selectedRoutes: this.selectedRoutes,
      endOfShift: this.endOfShift,
      routes: this.routes
    });

  }

  convertJSONToRoutes(aResult: any){
    var routes: Array<Route> = [];
    for(var i = 0; i < aResult.length; i++)
    {
      var aRoute = new Route();
      aRoute.convertJSON(aResult[i]);
      routes.push(aRoute);
    }
    console.log(routes); 
    return routes; 
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
  
  getDayOfWeek()
  {
    var aDate = Date();
    var dateString = aDate.toString();
    var day = dateString.slice(0, 3);
    var num = 0; 
    switch(day){
      case 'Sun':
	num = 200;
	break;
      case 'Mon': 
	num = 300;
	break;
      case 'Tue': 
	num = 400; 
	break;
      case 'Wed': 
	num = 500;
	break; 
      case 'Thu': 
	num = 600; 
	break; 
      case 'Fri': 
	num = 700;
	break;
      case 'Sat': 
	num = 100;
	break;
      default: 
	num = 0;
	break; 
    }    
    return num;  
  }
}
