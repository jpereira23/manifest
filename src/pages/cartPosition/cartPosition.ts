import { Component } from '@angular/core';
import { NavController, NavParams, Keyboard } from 'ionic-angular';
import { Route } from '../models/route';
import { CartPosition } from '../models/cartPosition';
import { Storage } from '@ionic/storage';
import { EndOfShift } from '../models/endOfShift';
import { Report } from '../models/report';
import { ErrorsPage } from '../errors/errors';
import { Item } from '../models/item';
import { Stop } from '../models/stop';
import { Status } from '../models/status';
import { Picker } from '../models/picker';
import { AuditorService } from '../auditor.service'; 
import { CartRequirements } from '../models/cartRequirements';

@Component({
  selector: 'page-cartPosition',
  templateUrl: 'cartPosition.html'
  })

export class CartPositionPage {
  theCartPosition: CartPosition = new CartPosition();
  storedCartPosition: Array<CartPosition> = [];
  endOfShift: EndOfShift;
  backUpItems: Array<Item> = [];
  stopNumber: string;
  status: string;
  stop: Stop;
  routeIndex: number;
  routeNumber: string;
  showCompleted = false;
  pickers: Array<Picker> = [];
  cartRequirements: CartRequirements = new CartRequirements();
  constructor(private navCtrl: NavController, private navParams: NavParams, private storage: Storage, private keyboard: Keyboard, private auditorService: AuditorService){
    var cartPositionName = this.navParams.get('cartPositionName');
    this.routeIndex = this.navParams.get('routeIndex'); 
    this.routeNumber = this.auditorService.getRouteNumber(this.routeIndex); 
    this.endOfShift = this.navParams.get('endOfShift');
    this.stopNumber = this.navParams.get('stopNumber');
    this.stop = this.navParams.get('stop');
    this.status = this.navParams.get('status');
    this.cartRequirements = this.auditorService.getIndeces(this.routeIndex, this.status, this.stopNumber, cartPositionName); 
    this.backUpItems = this.auditorService.getItems(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex); 
    this.pickers = this.navParams.get('pickers');
  }

  initializeItems(){
    this.theCartPosition.items = this.backUpItems;
  } 

  swipe(event, i){
    if(event.direction === 2){
      this.navCtrl.push(ErrorsPage, {
      routeIndex: this.routeIndex,
      cartRequirements: this.cartRequirements,
      itemIndex: i,
      correct: this.auditorService.getItems(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex)[i]
    });
      console.log("2 it is");
    }
  } 
  

  /** 
   * getItems function is used for the search bar in the cartPosition.html 
   *
   *
   */
  getItems(ev: any){
    this.initializeItems();

    let val = ev.target.value;
    if(val && val.trim() != ''){
      this.theCartPosition.items = this.theCartPosition.items.filter((item) => {
	console.log(item.wrin.indexOf(val));
	return (item.wrin.indexOf(val) > -1);
      }); 
    } 
  }

  /** 
   * isAudited function is used to help determine if an item with more than one quantity
   * is fully audited or partially audited
   *
   */
  isAudited(i: number){
    if(this.auditorService.getItemSelectedQuantity(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex) >= this.auditorService.getItemQuantity(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex))
    {
      setTimeout(() => {
	this.auditorService.modifyItemAudited(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex, true);
	this.auditorService.itemIncrementAuditedItems(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
      }, 500);
    }
    else if(this.auditorService.getItemAudited(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex) == true && this.auditorService.getItemSelectedQuantity(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex) < this.auditorService.getItemQuantity(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex))
    {
	this.auditorService.modifyItemAudited(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex, false);
	this.auditorService.itemDecrementAuditedItems(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
    }
  }

  ionViewWillLeave(){
    if(this.auditorService.getItemAuditedItems(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex) == this.auditorService.getItemAuditedItemsLength(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex))
    {
      this.auditorService.modifyCartAudited(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex, true);
      this.auditorService.addAuditedRoute(this.routeIndex);
      this.auditorService.saveAudited(this.routeIndex);  
    }
    else 
    {
      this.auditorService.modifyCartAudited(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex, false);
      this.auditorService.saveAudited(this.routeIndex);  
    }
  }   

  /**
   *
   * logErrors function is used to navigate to the error page 
   *
   */
  logErrors(i: number){
    
  }

  /**
   * toggle function is navigate between viewing checked off items and non-checked off items 
   *
   */
  toggle(){
    if(this.showCompleted == false){
      this.showCompleted = true;
    }
    else if(this.showCompleted == true){
      this.showCompleted = false;
    }
  } 

  /**
   *
   *  itemClicked function is used to physically switch on or off if an item is audited.
   *
   */
  itemClicked(i: number){
    setTimeout(() =>{  
	if(this.auditorService.getItemAudited(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex) == false){
	  this.auditorService.modifyItemAudited(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex, true);
	  this.auditorService.itemIncrementAuditedItems(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
	  this.auditorService.modifyItemSelectedQuantity(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex, 0);
	}
	else if(this.auditorService.getItemAudited(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex) == true){
	  this.auditorService.modifyItemAudited(this.routeIndex, i, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex, false);
	  this.auditorService.itemDecrementAuditedItems(this.routeIndex, this.cartRequirements.statusIndex, this.cartRequirements.stopIndex, this.cartRequirements.cartIndex);
	}
      }, 500);
   }
  
  delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  hideDaKeyboard(){
    this.keyboard.close();    
  }
}
