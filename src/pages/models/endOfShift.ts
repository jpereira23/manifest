import { CartPosition }  from './cartPosition';
import { Error } from './error';
export class EndOfShift{
  errors: Array<Error>;
  hotRoutes: Array<string>;

  constructor(){
    this.errors = [];
    this.hotRoutes = [];
  }
}


