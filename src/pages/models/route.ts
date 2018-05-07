import { CartPosition } from './cartPosition';
import { Stop } from './stop'; 
import { Status } from './status';
import { RouteDate } from './routeDate'; 
import { CartRequirements } from './cartRequirements';

export class Route{
  routeNumber: string;
  date: RouteDate;
  statuss: Array<Status> = [];
  bunsAudited: boolean;
  hotStops: Array<string> = [];

  constructor(){
    this.routeNumber = "";
    this.statuss = [];
    this.date = new RouteDate();
    this.bunsAudited = false;
    this.hotStops = []; 
  }

  getIndeces(status: string, stopNumber: string, cartPositionName: string){
    var aCartRequirement = new CartRequirements();
    for(var i = 0; i < this.statuss.length; i++)
    {
      if(this.statuss[i].status == status){
	aCartRequirement.statusIndex = i;
	aCartRequirement = this.statuss[i].getIndeces(stopNumber, cartPositionName, aCartRequirement);
      }
    }
    return aCartRequirement;
  } 

  reSetItems(statusIndex, stopIndex, cartIndex){
    this.statuss[statusIndex].reSetItems(stopIndex, cartIndex);
  } 

  filterItems(aVal: string, statusIndex: number, stopIndex: number, cartIndex: number){
    this.statuss[statusIndex].filterItems(aVal, stopIndex, cartIndex);
  }

  isRouteAudited(){
    for(var i = 0; i < this.statuss.length; i++){
      if(this.statuss[i].isRouteAudited() == true){
	return true;
      }
    } 
    return false;
  }

  getCartPositions(statusIndex: number, stopIndex: number){
    return this.statuss[statusIndex].getCartPositions(stopIndex);
  } 
  isAudited(statusIndex: number, stopIndex: number, cartIndex: number){
    return this.statuss[statusIndex].isAudited(stopIndex, cartIndex);
  }

  getPicker(statusIndex: number, stopIndex: number, cartIndex: number){
    return this.statuss[statusIndex].getPicker(stopIndex, cartIndex);
  }

  getCartPosition(statusIndex: number, stopIndex, cartIndex: number){
    return this.statuss[statusIndex].getCartPosition(stopIndex, cartIndex);
  }

  getItems(statusIndex: number, stopIndex: number, cartIndex: number){
    return this.statuss[statusIndex].getItems(stopIndex, cartIndex);
  }

  getItemSelectedQuantity(itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.statuss[statusIndex].getItemSelectedQuantity(itemIndex, stopIndex, cartIndex);
  }

  getItemQuantity(itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.statuss[statusIndex].getItemQuantity(itemIndex, stopIndex, cartIndex); 
  } 

  getItemAudited(itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number){
    return this.statuss[statusIndex].getItemAudited(itemIndex, stopIndex, cartIndex);
  }

  getItemAuditedItems(statusIndex: number, stopIndex: number, cartIndex: number){
    return this.statuss[statusIndex].getItemAuditedItems(stopIndex, cartIndex); 
  }

  getItemAuditedItemsLength(statusIndex: number, stopIndex: number, cartIndex: number){
    return this.statuss[statusIndex].getItemAuditedItemsLength(stopIndex, cartIndex);
  }

  itemIncrementAuditedItems(statusIndex: number, stopIndex: number, cartIndex: number){
    this.statuss[statusIndex].itemIncrementAuditedItems(stopIndex, cartIndex);
  }

  itemDecrementAuditedItems(statusIndex: number, stopIndex: number, cartIndex: number){
    this.statuss[statusIndex].itemDecrementAuditedItems(stopIndex, cartIndex);
  }

  modifyItemAudited(itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number, value: boolean){
    this.statuss[statusIndex].modifyItemAudited(itemIndex, stopIndex, cartIndex, value);
  }

  modifyItemSelectedQuantity(itemIndex: number, statusIndex: number, stopIndex: number, cartIndex: number, value: number){
    this.statuss[statusIndex].modifyItemSelectedQuantity(itemIndex, stopIndex, cartIndex, value);
  }

  modifyCartAudited(statusIndex: number, stopIndex: number, cartIndex: number, value: boolean){
    this.statuss[statusIndex].modifyCartAudited(stopIndex, cartIndex, value);
  }

  convertStorage(anResult){
    this.routeNumber = anResult.routeNumber;
    this.date.day = anResult.date.day; 
    this.date.year = anResult.date.year;
    this.date.month = anResult.date.month;
    this.date.hour = anResult.date.hour;
    this.date.minute = anResult.date.minute;

    var section1 = new Status();
    section1.status = "DRY";
    var section2 = new Status();
    section2.status = "REF";
    var section3 = new Status();
    section3.status = "FRZ";
    this.statuss.push(section1);
    this.statuss.push(section2);
    this.statuss.push(section3);
    for(var i = 0; i < anResult.statuss.length; i++)
    {
      switch(anResult.statuss[i].status)
      {
	case 'DRY':
	  this.statuss[0].convertStorage(anResult.statuss[i]);
	  break;
	case 'REF':
	  this.statuss[1].convertStorage(anResult.statuss[i]);
	  break;
	case 'FRZ': 
	  this.statuss[2].convertStorage(anResult.statuss[i]);
	  break;
	default: 
	  console.log("DEFAULT");
	  break;
      }
    }
  }
  convertJSON(anResult){
    this.routeNumber = anResult.routeNumber;
    this.date.day = anResult.date.day; 
    this.date.year = anResult.date.year; 
    this.date.month = anResult.date.month;
    this.date.hour = anResult.date.hour; 
    this.date.minute = anResult.date.minute;

    var section1 = new Status();
    section1.status = "DRY"; 
    this.statuss.push(section1);
    var section2 = new Status();
    section2.status = "REF";
    this.statuss.push(section2);
    var section3 = new Status();
    section3.status = "FRZ";
    this.statuss.push(section3);
    var dryCarts = [];
    var refCarts = [];
    var frzCarts = [];

    for(var i = 0; i < anResult.cartPositions.length; i++)
    {
      if(anResult.cartPositions[i].items[0].type == "DRY")
      {
	dryCarts.push(anResult.cartPositions[i]);	
      }
      else if(anResult.cartPositions[i].items[0].type == "REF")
      {
	refCarts.push(anResult.cartPositions[i]);
      }
      else if(anResult.cartPositions[i].items[0].type == "FRZ")
      {
	frzCarts.push(anResult.cartPositions[i]);
      }	        
    }

    for(var j = 0; j < anResult.hotStops.length; j++)
    {
      this.hotStops.push(anResult.hotStops[j]);
    }
    this.statuss[0].convertJSON(dryCarts);
    this.statuss[1].convertJSON(refCarts);
    this.statuss[2].convertJSON(frzCarts);
  }

}
