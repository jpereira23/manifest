import { Item } from './item';
export class Error {
  typeOfError: Array<string>;
  errorIndex: number;
  picked: Item;
  correct: Item; 
  wrongCartPosition: string; 
  short: number; 
  overage: number; 
  itemOverage: Item;
  itemShort: Item;
  routeNumber: string;
  cartPosition: string;
  picker: string;
  message: string;
  constructor(){
    this.typeOfError = ["Missing Cart Handle", "Damage Cart Handle", "Mis-Picks", "Wrap Issue", "Bun Error", "Shorts", "Wrong Cart", "Overages"];
    this.errorIndex = 0;
    this.picked = new Item();
    this.correct = new Item();
    this.wrongCartPosition = "";
    this.short = 0;
    this.overage = 0;
    this.itemOverage = new Item();
    this.itemShort = new Item();
    this.routeNumber = "";
    this.cartPosition = "";
    this.picker = "";
    this.message = "";
  }

  convertJSON(aResult: any){
    this.errorIndex = aResult.errorIndex;
    if(aResult.picked != null){
      var anItem = new Item();
      anItem.convertJSON(aResult.picked);
      this.picked = anItem
    }

    if(aResult.correct != null){
      var anItem = new Item();
      anItem.convertJSON(aResult.correct);
      this.correct = anItem;
    }

    this.wrongCartPosition = aResult.wrongCartPosition;
    this.short = aResult.short;
    this.overage = aResult.overage;
    if(aResult.itemOverage != null){
      var anItem = new Item();
      anItem.convertJSON(aResult.itemOverage);
      this.itemOverage = anItem;
    }

    if(aResult.itemShort != null)
    {
      var anItem = new Item();
      anItem.convertJSON(aResult.itemShort);
      this.itemShort = anItem;
    }

    this.routeNumber = aResult.routeNumber;
    this.cartPosition = aResult.cartPosition;
    this.picker = aResult.picker;
    this.message = aResult.message;
  }
}
