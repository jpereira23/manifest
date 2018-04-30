import { Error } from './error';
import { Route } from './route';

export class Auditor{
  firstName: string;
  lastName: string;
  routes: Array<Route>; 
  errors: Array<Error>;

  constructor(){
    this.firstName = "";
    this.lastName = "";
    this.routes = [];
    this.errors = [];
  }
}
