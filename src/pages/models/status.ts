import { Stop } from './stop';
import { CartRequirements } from './cartRequirements';

export class Status{
  status: string; 
  stops: Array<Stop>;

  constructor(){
    this.status = "";
    this.stops = [];
  }

  convertStorage(aStatus: Status){
    this.status = aStatus.status;
    for(var i = 0; i < aStatus.stops.length; i++)
    {
      var aStop = new Stop();
      aStop.convertStorage(aStatus.stops[i]);
      this.stops.push(aStop);
    }
  }

  convertJSON(carts){
    for(var i = 0; i < carts.length; i++)
    {
      this.locateAndInsert(carts[i]);
    }
  }

  getCart(stopNumber:string, cartPosition: string){
    for(var i = 0; i < this.stops.length; i++){
      if(this.stops[i].stopNumber == stopNumber)
      {
	return this.stops[i].getCart(cartPosition);
      }
    }
  }

  isRouteAudited(){
  console.log("2");
    for(var i = 0; i < this.stops.length; i++){
      if(this.stops[i].isRouteAudited() == true)
      {
	return true;
      }
    }
    return false;
  }

  isAudited(stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].isAudited(cartIndex);
  }

  getCartPosition(stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].getCartPosition(cartIndex);
  }   

  getPicker(stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].getPicker(cartIndex);
  }
  
  getItems(stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].getItems(cartIndex);
  }

  getItemSelectedQuantity(itemIndex: number, stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].getItemSelectedQuantity(itemIndex, cartIndex);
  }

  getItemQuantity(itemIndex: number, stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].getItemQuantity(itemIndex, cartIndex);  
  }

  getItemAudited(itemIndex: number, stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].getItemAudited(itemIndex, cartIndex);
  }

  getItemAuditedItems(stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].getItemAuditedItems(cartIndex);
  }
  
  getItemAuditedItemsLength(stopIndex: number, cartIndex: number){
    return this.stops[stopIndex].getItemAuditedItemsLength(cartIndex);
  }

  getIndeces(stopNumber: string, cartPosition: string, aCartRequirement: CartRequirements){
    for(var i = 0; i < this.stops.length; i++)
    {
      if(this.stops[i].stopNumber == stopNumber)
      {      
	aCartRequirement.stopIndex = i;
	aCartRequirement = this.stops[i].getIndeces(cartPosition, aCartRequirement);
      }
    }
    return aCartRequirement;
  } 

  itemIncrementAuditedItems(stopIndex: number, cartIndex: number){
    this.stops[stopIndex].itemIncrementAuditedItems(cartIndex);
  }   

  itemDecrementAuditedItems(stopIndex: number, cartIndex: number){
    this.stops[stopIndex].itemDecrementAuditedItems(cartIndex);
  }

  modifyItemAudited(itemIndex: number, stopIndex: number, cartIndex: number, value: boolean){
    this.stops[stopIndex].modifyItemAudited(itemIndex, cartIndex, value);
  }

  modifyCartAudited(stopIndex: number, cartIndex: number, value: boolean){
    this.stops[stopIndex].modifyCartAudited(cartIndex, value);
  }

  modifyItemSelectedQuantity(itemIndex: number, stopIndex: number, cartIndex: number, value: number){
    this.stops[stopIndex].modifyItemSelectedQuantity(itemIndex, cartIndex, value);
  }

  locateAndInsert(cartPosition)
  {
    if(this.stops.length == 0)
    {
      var stop = new Stop();
      stop.stopNumber = cartPosition.items[0].stopNumber;
      stop.convertJSON(cartPosition);
      this.stops.push(stop);
    }
    else
    {
      var inserted = false;
      for(var i = 0; i < this.stops.length; i++)
      {
	if(cartPosition.items[0].stopNumber == this.stops[i].stopNumber)
	{
	  this.stops[i].convertJSON(cartPosition);
	  inserted = true;
	}
      }
      if(inserted == false)
      {
	var aStop = new Stop();
	aStop.stopNumber = cartPosition.items[0].stopNumber;
	aStop.convertJSON(cartPosition);
	this.stops.push(aStop); 
      }
    }
  }
}
