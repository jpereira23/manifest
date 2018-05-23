import { Error } from './error';
import { Route } from './route';
import { Picker } from './picker';

export class Auditor{
  firstName: string;
  lastName: string;
  routes: Array<Route>; 
  auditedRoutes: Array<Route>;
  errors: Array<Error>;
  potentialErrors: Array<Error>;
  pickers: Array<Picker>;
  clockIn: Date;

  constructor(){
    this.firstName = "";
    this.lastName = "";
    this.routes = [];
    this.potentialErrors = [];
    this.auditedRoutes = [];
    this.errors = [];
    this.pickers = [];
    this.clockIn = new Date();
  }

  auditedRouteExists(route: Route){
    for(var i = 0; i < this.auditedRoutes.length; i++)
    {
      if(route.routeNumber == this.auditedRoutes[i].routeNumber){
	return true;
      }
    }
    return false;
  }
}
