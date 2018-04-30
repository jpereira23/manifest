export class Item{
  itemName: string;
  wrin: string;
  quantity: number;
  selectedQuantity: number;
  stopNumber: number;
  audited: boolean;
  auditedItems: number;

  constructor(){
    this.itemName = "";
    this.wrin = "";
    this.quantity = 0;
    this.selectedQuantity = 0;
    this.stopNumber = 0;
    this.audited = false; 
  }

  convertStorage(aItem: Item){
    this.itemName = aItem.itemName;
    this.wrin = aItem.wrin;
    this.quantity = aItem.quantity;
    this.selectedQuantity = aItem.selectedQuantity;
    this.stopNumber = aItem.stopNumber;
    this.audited = aItem.audited;
  }

  convertJSON(anResult){
    this.itemName = anResult.itemName;
    this.wrin = anResult.wrin;
    this.quantity = +anResult.quantity
    this.stopNumber = +anResult.stopNumber;
  }
}
