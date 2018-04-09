import { CartPosition } from './cartPosition';

export class Stop{
  stopNumber: string;
  cartPositions: Array<CartPosition>;
  routeNumber: string;

  constructor(){
    this.stopNumber = "";
    this.cartPositions = [];
  }
  
  convertJSON(cartPosition){
    var aCartPosition = new CartPosition();
    aCartPosition.convertJSON(cartPosition);
    this.cartPositions.push(aCartPosition);
  }
}
