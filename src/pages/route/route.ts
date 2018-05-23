import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Route } from '../models/route';
import { CartPosition } from '../models/cartPosition';
import { CartPositionPage } from '../cartPosition/cartPosition';
import { Storage } from '@ionic/storage'; 
import { EndOfShift } from '../models/endOfShift'; 
import { ErrorsPage } from '../errors/errors';
import { Item } from '../models/item'; 
import { Picker } from '../models/picker';
import { Stop } from '../models/stop';
import { AddPickerPage } from '../addPicker/addpicker';
import { Status } from '../models/status';
import { AuditorService } from '../auditor.service';
import { DataService } from '../data.service';


@Component({
  selector: 'page-route',
  templateUrl: 'route.html'
  })

export class RoutePage {
  routeNumber: string = "";
  theRoute: Route = new Route();
  selectedStop: Stop;
  filteredCartPositions: Array<CartPosition> = [];
  endOfShift: EndOfShift;
  routeIndex: number;
  pickers: Array<Picker> = [];

  constructor(private navParams: NavParams, private navCtrl: NavController, private storage: Storage, private modalCtrl: ModalController, private auditorService: AuditorService, private dataService: DataService){
    this.routeNumber = this.navParams.get('routeNumber');
    this.routeIndex = this.auditorService.getRouteIndex(this.routeNumber);
    this.theRoute = this.auditorService.getRoute(this.routeIndex);
    this.endOfShift = this.navParams.get('endOfShift'); 
    this.selectedStop = this.theRoute.statuss[0].stops[0];
    var tmpRoute; 
    console.log(this.auditorService.getPickers());
  }
  
  ionViewWillEnter(){
    //this.storage.set('pickers', this.pickers);
  }

  assignPicker(event, cartPosition){
    cartPosition.picker = event;
  }

  addPicker(){
    let addPickerModal = this.modalCtrl.create(AddPickerPage, {
      pickers: this.pickers 
    });
    addPickerModal.present();
    addPickerModal.onDidDismiss(data => {
      if(data != null){
	this.auditorService.addPicker(data);
      }
    });	
  }

  buns()
  {
    if(this.theRoute.bunsAudited == false)
    {
      this.theRoute.bunsAudited = true;
    }
    else if(this.theRoute.bunsAudited == true)
    {
      this.theRoute.bunsAudited = false;
    }

    /** 
     * Please check below since we will be conflicting with the data service.
     * 
     */
    //this.storage.set(this.theRoute.routeNumber, this.theRoute);
  }

  cartPositionPicked(cartPosition: CartPosition, stop: Stop, status: Status){
    console.log(cartPosition);
    this.navCtrl.push(CartPositionPage, {
      cartPositionName: cartPosition.cartPosition,
      endOfShift: this.endOfShift,
      routeIndex: this.routeIndex,
      stopNumber: this.selectedStop,
      stop: stop,
      status: status.status, 
      pickers: this.pickers
    });
  }

  isAudited(statusIndex: number, stopIndex: number, cartIndex: number)
  {
    if(this.auditorService.getItemAuditedItems(this.routeIndex, statusIndex, stopIndex, cartIndex) == this.auditorService.getItemAuditedItemsLength(this.routeIndex, statusIndex, stopIndex, cartIndex))
    {
      return 0;
    }
    else if(this.auditorService.getItemAuditedItems(this.routeIndex, statusIndex, stopIndex, cartIndex) > 0)
    {
      return 1;
    }
    return 2; 
  }

  thisHotRoute(selectedStop: string){
    for(var i = 0; i < this.theRoute.hotStops.length; i++)
    {
      if(this.theRoute.hotStops[i] == selectedStop){
	return true;
      }
    }
    return false;
  }
}
