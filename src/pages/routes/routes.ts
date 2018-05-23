import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Route } from '../models/route';
import { RoutePage } from '../route/route';
import { EndOfShift } from '../models/endOfShift';
import { Item } from '../models/item';
import { EndOfShiftPage } from '../endOfShift/endOfShift';
import { AuditorService } from '../auditor.service';
import { DataService } from '../data.service';
import { ErrorCenterPage } from '../errorCenter/errorCenter';
import { Auditor } from '../models/auditor';
import { Picker } from '../models/picker';
import { ClockInModal } from '../clockIn/clockIn';
import { ServerDown } from '../serverDown/serverDown'; 

 

@Component({ 
  selector: 'page-routes',
  templateUrl: 'routes.html'
})

export class RoutesPage {
  selectedRoutes: Array<Route> = [];
  endOfShift: EndOfShift;
  routes: Array<Route> = [];
  routeLoading: boolean = false;
  
  constructor(private navParams: NavParams, private navCtrl: NavController, private auditorService: AuditorService, public modalCtrl: ModalController, private dataService: DataService){
    this.selectedRoutes = this.auditorService.getRoutes(); 
    this.endOfShift = this.navParams.get('endOfShift');

    let modal = this.modalCtrl.create(ClockInModal, { firstName: this.auditorService.getFirstName(), lastName: this.auditorService.getLastName()});
    modal.onDidDismiss(data => {
      var auditor = new Auditor();
      auditor.firstName = data.firstName;
      auditor.lastName = data.lastName;
      auditor.clockIn = data.aDate;
      this.auditorService.setAuditor(auditor);
    });
    this.auditorService.isClockedIn.subscribe(val => {
      if(val == false){	
	modal.present(); 
      }
    });

    this.dataService.getPickers().subscribe(res => this.convertPickers(res));
  }

  convertPickers(res){
      var thePickers = res;
      var pickers: Array<Picker> = [];
      for(var i = 0; i < thePickers.length; i++)
      {
	var aPicker = new Picker();
	aPicker.convertJSON(thePickers[i]);
	pickers.push(aPicker);
      }

      this.auditorService.setPickers(pickers);
    
  }

  generate(){
    this.routeLoading = true;
    this.dataService.getManifests()
      .subscribe(res => {
	this.delegateForManifests(res)
	  }, error => {
	    let modal = this.modalCtrl.create(ServerDown);
	    modal.present();

	  }, () => {
	    console.log("SOOOOOMETHING");
      });
  }

  delegateForManifests(res)
  {
    var manifests = res.json().data;

    this.selectedRoutes = this.convertJSONToRoutes(manifests);
    this.auditorService.initializeRoutes(this.selectedRoutes);
    this.routeLoading = false;
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

  ionViewWillEnter(){
    console.log("HELLO WORLD");
    this.auditorService.checkPotentialErrors();    
    this.selectedRoutes = [];
    this.selectedRoutes = this.auditorService.getRoutes();
  }

  ionViewWillLeave(){
  }

  routeSelected(route: Route){
    this.navCtrl.push(RoutePage, { 
      routeNumber: route.routeNumber, 
      endOfShift: this.endOfShift
    });
  }

  errorCenter(){
    this.navCtrl.push(ErrorCenterPage);
  }

  generateEndOfShift(){
    this.navCtrl.push(EndOfShiftPage, {
      routes: this.selectedRoutes,
      endOfShift: this.endOfShift
    });
  }

}
