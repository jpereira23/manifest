import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Route } from './models/route';
import { Item } from './models/item'; 

@Injectable()
export class DataService {
  //url: string = "http://172.124.232.210:443/api/";
  url: string = "http://192.168.1.71:3000/api/";
  headers = new Headers();
  result: any;
  constructor(private _http: Http){
    this.headers.append('Content-Type', 'application/json');
  }

  getManifests(){

  return this._http.get(this.url + 'obtainManifest').map(res => { return res.json().data });
    /*
    return this._http.get(this.url + 'obtainManifest').map(res => {
      console.log(res.json().data);
      return this.manifestConvert(res.json().data);
    });
    */
  }
  
  manifestConvert(aResult: any)
  {
    var routes: Array<Route> = [];
    for(var i = 0; i < aResult.length; i++)
    {
      var aRoute = new Route();
      aRoute.convertJSON(aResult[i]);
      routes.push(aRoute);
    }
    console.log(routes); 
    return routes; 
  }

  removeAll()
  {
    var request = {
      stuff: ""
    };
    return this._http.post(this.url + 'removeAll', JSON.stringify(request), { headers: this.headers}).map(res => res.json());
  }
}
