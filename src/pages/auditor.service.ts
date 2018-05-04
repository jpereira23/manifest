import { Injectable } from '@angular/core'; 
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Auditor } from './models/auditor';
import { Route } from './models/route';
import { Picker } from './models/picker';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Rx';
import { Error } from './models/error';



@Injectable()
export class AuditorService {
  auditor: Auditor = new Auditor();
  isLoaded = new Subject<boolean>();
  isAuditor = new Subject<boolean>();
  isRoutes = new Subject<boolean>();
  
  constructor(private storage: Storage, private localNotifications: LocalNotifications){
    this.storage.get('firstName').then((val) => {
      if(val == null){
	this.isAuditor.next(false);
      }else{
	this.auditor = new Auditor();
	this.auditor.firstName = val;
	this.storage.get('lastName').then((vals) => {
	  this.auditor.lastName = vals;
	});
	this.storage.get('errors').then((er) => {
	  if(er != null){
	    this.auditor.errors = er;
	  }
	  else{
	    this.auditor.errors = [];
	  }
	});
	this.isAuditor.next(true);
      }
    });
  }

  addError(error: Error){
    this.auditor.errors.push(error);
    this.storage.set('errors', this.auditor.errors);
  }

  checkPotentialErrors(){
    console.log("CHECKING POTENTIAL ERRORS");
    if(this.auditor.potentialErrors.length > 0)
    {
      this.localNotifications.schedule({
	id: 1,
	text: 'You have ' + this.auditor.potentialErrors.length + ' potential errors.',
	sound: null,
	data: {}
      });
    }
  }

  removePotentialError(i: number){
    this.auditor.potentialErrors.splice(i, 1);
  }

  addPotentialError(error: Error){
    this.auditor.potentialErrors.push(error);
  } 

  getPotentialErrors(){
    return this.auditor.potentialErrors;
  }
  setAuditor(auditor: Auditor){
    this.storage.ready().then(() => {
      this.storage.set('firstName', auditor.firstName);
    });

    this.storage.ready().then(() => {
      this.storage.set('lastName', auditor.lastName);
    });
  }

  getPicker(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.auditor.routes[routeIndex].getPicker(statusIndex, stopIndex, cartIndex);
  }
  
  getErrors(){
    return this.auditor.errors;
  }
  
  isRouteAudited(routeIndex: number){
    return this.auditor.routes[routeIndex].isRouteAudited();
  }

  isAudited(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.auditor.routes[routeIndex].isAudited(statusIndex, stopIndex, cartIndex);
  }

  getPickers(){
    return this.auditor.pickers; 
  }

  initializeRoutes(routes: Array<Route>){
    this.auditor.routes = [];
    for(var i = 0; i < routes.length; i++)
    {
      var theRoute = new Route();
      theRoute.convertStorage(routes[i]);
      this.auditor.routes.push(theRoute);
      this.storage.get(theRoute.routeNumber).then((val) => {
	  if(val != null)
	  {
	    console.log(val);
	    var aRoute = new Route();
	    aRoute.convertStorage(val);
	    this.swapRoute(aRoute);
	    this.initiateAuditedRoutes();
	  }
      });
    }
  }

  initiateAuditedRoutes(){
    for(var i = 0; i < this.auditor.routes.length; i++){
      if(this.isRouteAudited(i) == true){
	console.log("SHOULD BE BEFORE"); 
	this.auditor.auditedRoutes.push(this.auditor.routes[i]);
      }
    }
  }

  setPickers(pickers: Array<Picker>){
    this.auditor.pickers = [];
    this.auditor.pickers = pickers;
  }

  addPicker(picker: Picker){
    this.auditor.pickers.push(picker);
    this.storage.set('pickers', this.auditor.pickers);
  }

  swapRoute(route: Route){
    for(var i = 0; i < this.auditor.routes.length; i++)
    {
      if(this.auditor.routes[i].routeNumber == route.routeNumber){
	this.auditor.routes[i] = route;
      }
    }
  } 

  addAuditedRoute(routeIndex: number){
    if(this.auditor.auditedRouteExists(this.auditor.routes[routeIndex]) == false){
      this.auditor.auditedRoutes.push(this.auditor.routes[routeIndex]);
    }
  }

  getAuditedRoutes(){
    console.log("SHOULD BE AFTER");
    return this.auditor.auditedRoutes;
  }

  getRouteIndex(routeNumber:string){
    for(var i = 0; i < this.auditor.routes.length; i++)
    {
      if(this.auditor.routes[i].routeNumber == routeNumber){
	return i;
      }
    }
    return 0;
  }

  getRoutes(){
    return this.auditor.routes;
  }

  misMatch(routes: Array<Route>){
    var isIt = false;
    for(var i = 0; i < routes.length; i++){
      for(var j = 0; j < this.auditor.routes.length; j++){
	if(this.auditor.routes[j].routeNumber == routes[i].routeNumber){
	  isIt = true; 
	}
      }
      if(isIt == false){
	this.auditor.routes.push(routes[i]);
      }
      isIt = false;
    }
  }

  getRoute(index: number){
    return this.auditor.routes[index]; 
  }

  getRouteNumber(index: number){
    return this.auditor.routes[index].routeNumber;
  }

  getIndeces(routeIndex: number, status: string, stopNumber: string, cartPositionName: string){
    return this.auditor.routes[routeIndex].getIndeces(status, stopNumber, cartPositionName);
  }

  getItemSelectedQuantity(routeIndex: number, itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.auditor.routes[routeIndex].getItemSelectedQuantity(itemIndex, statusIndex, stopIndex, cartIndex);  
  }

  getItemQuantity(routeIndex: number, itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.auditor.routes[routeIndex].getItemQuantity(itemIndex, statusIndex, stopIndex, cartIndex);
  }

  getItems(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.auditor.routes[routeIndex].getItems(statusIndex, stopIndex, cartIndex);
  } 

  getItemAudited(routeIndex: number, itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.auditor.routes[routeIndex].getItemAudited(itemIndex, statusIndex, stopIndex, cartIndex);
  }

  getCartPositions(routeIndex: number, statusIndex: number, stopIndex: number){
    return this.auditor.routes[routeIndex].getCartPositions(statusIndex, stopIndex);
  }

  getCartPosition(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex){
    return this.auditor.routes[routeIndex].getCartPosition(statusIndex, stopIndex, cartIndex);
  }

  itemIncrementAuditedItems(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    this.auditor.routes[routeIndex].itemIncrementAuditedItems(statusIndex, stopIndex, cartIndex);
  }

  itemDecrementAuditedItems(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    this.auditor.routes[routeIndex].itemDecrementAuditedItems(statusIndex, stopIndex, cartIndex);
  }

  modifyItemAudited(routeIndex: number, itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number, value: boolean){
    this.auditor.routes[routeIndex].modifyItemAudited(itemIndex, statusIndex, stopIndex, cartIndex, value); 
  }

  modifyItemSelectedQuantity(routeIndex: number, itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number, value: number){
    this.auditor.routes[routeIndex].modifyItemSelectedQuantity(itemIndex, statusIndex, stopIndex, cartIndex, value);
  }

  modifyCartAudited(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex: number, value: boolean){
    this.auditor.routes[routeIndex].modifyCartAudited(statusIndex, stopIndex, cartIndex, value);
  }

  getItemAuditedItems(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.auditor.routes[routeIndex].getItemAuditedItems(statusIndex, stopIndex, cartIndex);
  }

  getItemAuditedItemsLength(routeIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.auditor.routes[routeIndex].getItemAuditedItemsLength(statusIndex, stopIndex, cartIndex);
  }

  saveAudited(routeIndex: number){
    this.storage.ready().then(() => {
      this.storage.set(this.auditor.routes[routeIndex].routeNumber, this.auditor.routes[routeIndex]);
    });
  }
  
  
}
