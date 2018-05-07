import { CartPosition } from './cartPosition';
import { CartRequirements } from './cartRequirements';

export class Stop{
  stopNumber: string;
  cartPositions: Array<CartPosition>;
  routeNumber: string;

  constructor(){
    this.stopNumber = "";
    this.cartPositions = [];
  }

  convertStorage(aStop: Stop){
    this.stopNumber = aStop.stopNumber;
    this.routeNumber = aStop.routeNumber;
    for(var i = 0; i < aStop.cartPositions.length; i++)
    {
      var aCartPosition = new CartPosition();
      aCartPosition.convertStorage(aStop.cartPositions[i]);
      this.cartPositions.push(aCartPosition);
    }
  }

  reSetItems(cartIndex){
    this.cartPositions[cartIndex].reSetItems();
  }

  filterItems(aVal: string, cartIndex: number){
    this.cartPositions[cartIndex].filterItems(aVal);
  }
  
  getCart(cartPosition: string){
    for(var i = 0; i < this.cartPositions.length; i++)
    {
      if(this.cartPositions[i].cartPosition == cartPosition)
      { 
	return this.cartPositions[i];
      }
    }
    return null;
  }

  isRouteAudited(){
    for(var i = 0; i < this.cartPositions.length; i++)
    {
      if(this.cartPositions[i].audited == true) 
      {
	return true;
      }	
    } 
    return false;
  }   

  isAudited(cartIndex: number){
    return this.cartPositions[cartIndex].isAudited();
  }
  getPicker(cartIndex){
    return this.cartPositions[cartIndex].picker.name;
  }

  getCartPosition(cartIndex: number){
    return this.cartPositions[cartIndex].cartPosition;
  }

  getItemSelectedQuantity(itemIndex: number, cartIndex: number){
    return this.cartPositions[cartIndex].getItemSelectedQuantity(itemIndex);
  }

  getItemQuantity(itemIndex: number, cartIndex: number){
    return this.cartPositions[cartIndex].getItemQuantity(itemIndex);
  }

  getItemAudited(itemIndex: number, cartIndex: number){
    return this.cartPositions[cartIndex].getItemAudited(itemIndex);
  }

  getItemAuditedItems(cartIndex: number){
    return this.cartPositions[cartIndex].getItemAuditedItems();
  }

  getItems(cartIndex: number){
    return this.cartPositions[cartIndex].items;
  }

  getItemAuditedItemsLength(cartIndex: number){
    return this.cartPositions[cartIndex].items.length;
  }

  itemIncrementAuditedItems(cartIndex: number){
    this.cartPositions[cartIndex].itemIncrementAuditedItems();
  }

  itemDecrementAuditedItems(cartIndex: number){
    this.cartPositions[cartIndex].itemDecrementAuditedItems();
  }

  modifyItemAudited(itemIndex: number, cartIndex: number, value: boolean){
    this.cartPositions[cartIndex].modifyItemAudited(itemIndex, value);
  }

  modifyCartAudited(cartIndex: number, value: boolean){
    this.cartPositions[cartIndex].audited = value;
  } 

  modifyItemSelectedQuantity(itemIndex: number, cartIndex: number, value: number){
    this.cartPositions[cartIndex].modifyItemSelectedQuantity(itemIndex, value);
  }

  getIndeces(cartPosition: string, aCartRequirements: CartRequirements){
    for(var i = 0; i < this.cartPositions.length; i++)
    {
      if(this.cartPositions[i].cartPosition == cartPosition)
      {
	aCartRequirements.cartIndex = i;
      }
    }
    return aCartRequirements;
  }

  convertJSON(cartPosition){
    var aCartPosition = new CartPosition();
    aCartPosition.convertJSON(cartPosition);
    this.cartPositions.push(aCartPosition);
  }
}
