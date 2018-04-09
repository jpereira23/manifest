import { Stop } from './stop';

export class Status{
  status: string; 
  stops: Array<Stop>;

  constructor(){
    this.status = "";
    this.stops = [];
  }

  convertJSON(carts){
    for(var i = 0; i < carts.length; i++)
    {
      this.locateAndInsert(carts[i]);
    }
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
