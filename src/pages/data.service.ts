import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Route } from './models/route';
import { Item } from './models/item'; 

@Injectable()
export class DataService {
  url: string = "http://172.124.232.210:443/api/";
  headers = new Headers();
  result: any;
  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/json');
  }

  getManifests(){
    return this._http.get(this.url + 'obtainManifest').map(result => this.result = this.manifestConvert(result.json().data));
  }
  /*
  getItems(routes: Array<Route>)
  {
    var theItems: Array<Item> = [];
    for(var i = 0; i < routes.length; i++)
    {
      for(var j = 0; j < routes[i].statuss.length; j++)
      {
	for(var k = 0; k < routes[i].statuss[j].stops.length; k++)
	{
	for(var l = 0; l < routes[i].statuss[j].stops[k].cartPositions.length; l++){

	  var isIt = false;
	  for(var l = 0; l < theItems.length; l++)
	  {
	    if(routes[i].cartPositions[j].items[k].itemName == theItems[l].itemName)
	    {
	      var isIt = true;
	      break;
	    }
	  }
	  if(isIt == false) 
	  {
	    theItems.push(routes[i].cartPositions[j].items[k]);
	  }
	  isIt = false;
	}
      }
    } 
    return theItems;
  }
    */
  manifestConvert(aResult: Array<any>)
  {
    var routes: Array<Route> = [];
    for(var i = 0; i < aResult.length; i++)
    {
      var aRoute = new Route();
      aRoute.convertJSON(aResult[i]);
      console.log(aRoute); 
      routes.push(aRoute);
    }

    
    return routes;
  }
}
