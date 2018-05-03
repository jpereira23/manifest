import { Component, Input } from '@angular/core';
import { Picker } from '../models/picker';
import { Route } from '../models/route';
import { Storage } from '@ionic/storage';
import { AuditorService } from '../auditor.service';

@Component({
  selector: 'page-picker',
  templateUrl: 'picker.html'
  })

  export class PickerView{
    routes: Array<Route> = [];
    constructor(private storage: Storage, private auditorService: AuditorService){
      this.routes = this.auditorService.getAuditedRoutes();  
      console.log(this.routes); 
    }

}
