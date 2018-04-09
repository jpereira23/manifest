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
  }
}
