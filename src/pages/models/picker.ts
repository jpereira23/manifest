import { Error } from './error';
import { Route } from './route';
import { CartPosition } from './cartPosition';
import { Stop } from './stop';
import { Status } from './status';

export class Picker{
  name: string;
  errors: Array<Error>;
  routes: Array<Route>;

  constructor(){
    this.name = "";
    this.errors = [];
    this.routes = [];
  }

  convertJSON(aResult: any){
    this.name = aResult.name;
    for(var i = 0; i < aResult.errors.length; i++)
    {
      var aError = new Error();
      aError.convertJSON(aResult.errors[i]);
      this.errors.push(aError);
    }

    for(var j = 0; j < aResult.routes.length; j++)
    {
      var aRoute = new Route();
      aRoute.convertStorage(aResult.routes[j]);
      this.routes.push(aRoute);
    }
  }
  
  public addCartPosition(route: Route, cartPosition: CartPosition, status: Status, stop: Stop)
  {
    /*
    var aRoute;
    if(this.isRoute(route) == true){
      aRoute = new Route();
      aRoute.routeNumber = route.routeNumber;
      aRoute.date = route.date;
      aRoute.hotStops = route.hotStops;
      var aStatus = new Status();
      aStatus.status = status.status;
      var aStop = new Stop();
      aStop.stopNumber = stop.stopNumber;
      aStop.routeNumber = route.routeNumber;
      aStop.cartPositions.push(cartPosition);
      aStatus.stops.push(aStop);
      aRoute.statuss.push(aStatus);
    }
    else
    {
      aRoute = this.getRoute(route);
      if(this.isStatus(aRoute, status) == false)
      {
	var aStatus = new Status();
	aStatus.status = status.status;
	var aStop = new Stop();
	aStop.stopNumber = stop.stopNumber;
	aStop.cartPositions.push(cartPosition);
	aStatus.stops.push(aStop);
      }
      else
      {
      //var aStatus = this.getStatus(status, aRoute);
	if(this.isStop(aRoute, aStatus, stop) == 0)
	{
	  var aStop = new Stop();
	  aStop.stopNumber = stop.stopNumber;
	  aStop.routeNumber = stop.routeNumber;
	  aStop.cartPositions.push(cartPosition);
	  aStatus.stops.push(aStop);
	}
	else 
	{
	//var aStop = this.getStop(aRoute, aStatus, stop);
	  aStop.cartPositions.push(cartPosition);
	}
      }
    }
    this.routes.push(aRoute);
    console.log(this.routes.length);
    */
  }

  private isStop(route: Route, status: Status, stop: Stop){
    /*
    for(var i = 0; i < status.stops.length; i++){
      if(status.stops[i].stopNumber == stop.stopNumber){
	return status.stops[i];
      }
    }
    return null;
    */
  }

  private getStatus(route: Route, status: Status){
  /*
    for(var i = 0; i < route.statuss.length; i++){
      if(route.statuss[i].status == status.status){
	return route.statuss[i];
      }
    }
    return null;
    */
  }

  private isStatus(route: Route, status: Status){
  /*
    for(var i = 0; i < route.statuss.length; i++)
    { 
      if(route.statuss[i].status == status.status)
      {
	return true;
      }
    }
    return false;
    */
  }

  private isRoute(route: Route){
  /*
    for(var i = 0; i < this.routes.length; i++){
      if(this.routes[i].routeNumber == route.routeNumber)
      {
	return false;
      }
    }
    return true;
    */
  }

  private getRoute(route: Route){
  /*
    for(var i = 0; i < this.routes.length; i++){
      if(route.routeNumber == this.routes[i].routeNumber){
	return this.routes[i];
      }
    }

    return null;
    */
  }
}

