import { CartPosition } from './cartPosition';
import { Error } from './error'; 

export class Report{
  errors: Array<Error>;

  constructor(){
    this.errors = [];
  }  
}
