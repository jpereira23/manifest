import { Injectable } from '@angular/core'; 
import { Auditor } from './models/auditor';
import { Route } from './models/route';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs/Rx';



@Injectable()
export class AuditorService {
  auditor: Auditor = new Auditor();
  isLoaded = new Subject<boolean>();
  isAuditor = new Subject<boolean>();
  isRoutes = new Subject<boolean>();
  
  constructor(private storage: Storage){
    this.storage.get('firstName').then((val) => {
      if(val == null){
	this.isAuditor.next(false);
      }else{
	this.auditor = new Auditor();
	this.auditor.firstName = val;
	this.storage.get('lastName').then((vals) => {
	  this.auditor.lastName = vals;
	});
      }
    });
  }

  setAuditor(auditor: Auditor){
    this.storage.ready().then(() => {
      this.storage.set('firstName', auditor.firstName);
    });

    this.storage.ready().then(() => {
      this.storage.set('lastName', auditor.lastName);
    });
  }

  initializeRoutes(routes: Array<Route>){
    this.auditor.routes = [];
    for(var i = 0; i < routes.length; i++)
    {
      var theRoute = new Route();
      theRoute.convertStorage(routes[i]);
      this.auditor.routes.push(theRoute);
      console.log(theRoute.routeNumber);
      this.storage.get(theRoute.routeNumber).then((val) => {
	  if(val != null)
	  {
	    var aRoute = new Route();
	    aRoute.convertStorage(val);
	    console.log(aRoute);
	    this.swapRoute(aRoute);
	  }
      });
    }
  }

  swapRoute(route: Route){
    for(var i = 0; i < this.auditor.routes.length; i++)
    {
      if(this.auditor.routes[i].routeNumber == route.routeNumber){
	this.auditor.routes[i] = route;
	console.log(this.auditor.routes[i]);
	console.log(route);
      }
    }
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
    console.log("mismatching");
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
      console.log(this.auditor.routes[routeIndex].routeNumber);
      this.storage.set(this.auditor.routes[routeIndex].routeNumber, this.auditor.routes[routeIndex]);
    });
  }
  
  
}
