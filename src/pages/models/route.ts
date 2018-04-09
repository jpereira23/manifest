import { CartPosition } from './cartPosition';
import { Stop } from './stop'; 
import { Status } from './status';

export class Route{
  routeNumber: string;
  date: Date;
  statuss: Array<Status> = [];
  bunsAudited: boolean;
  hotStops: Array<string> = [];

  constructor(){
    this.routeNumber = "";
    this.statuss = [];
    this.date = new Date();
    this.bunsAudited = false;
    this.hotStops = []; 
  }

  convertJSON(anResult){
    this.routeNumber = anResult.routeNumber;
    this.date = new Date(anResult.date);
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
