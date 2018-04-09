export class Item{
  itemName: string;
  wrin: string;
  quantity: number;
  selectedQuantity: number;
  stopNumber: number;
  audited: boolean;

  constructor(){
    this.itemName = "";
    this.wrin = "";
    this.quantity = 0;
    this.selectedQuantity = 0;
    this.stopNumber = 0;
    this.audited = false; 
  }

  convertJSON(anResult){
    this.itemName = anResult.itemName;
    this.wrin = anResult.wrin;
    this.quantity = +anResult.quantity
    this.stopNumber = +anResult.stopNumber;
  }
}
