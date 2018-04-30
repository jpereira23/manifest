import { Component, Input } from '@angular/core';
import { Picker } from '../models/picker';
import { Route } from '../models/route';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-picker',
  templateUrl: 'picker.html'
  })

  export class PickerView{
    pickers: Array<Picker> = [];
    @Input() route: Array<Route> = [];
    constructor(private storage: Storage){
      this.storage.get('pickers').then((val) => {
	if(val != null){
	  this.pickers = val;
	  console.log(val);
	}
      }); 
    }

  checkPickerRouteStatusSequence(){
    for(var i = 0; i < this.route.length; i++)
    {
    
    }  
  }

}
