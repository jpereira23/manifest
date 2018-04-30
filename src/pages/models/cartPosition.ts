import { Item } from './item';
import { Picker } from './picker';

export class CartPosition{
  cartPosition: string;
  items: Array<Item>;
  audited: boolean;
  auditedItems: number;
  picker: Picker;

  constructor(){
    this.cartPosition = "";
    this.items = [];
    this.picker = new Picker();
    this.audited = false;
    this.auditedItems = 0;
  }

  convertStorage(aCartPosition: CartPosition){
    for(var i = 0; i < aCartPosition.items.length; i++)
    {
      var aItem = new Item();
      aItem.convertStorage(aCartPosition.items[i])
      this.items.push(aItem);
    }
  }

  getItemQuantity(itemIndex: number){
    return this.items[itemIndex].quantity;
  }

  getItemSelectedQuantity(itemIndex: number){
    return this.items[itemIndex].selectedQuantity;
  }

  getItemAudited(itemIndex: number){
    return this.items[itemIndex].audited;
  }

  getItemAuditedItems(){
    return this.auditedItems;
  }

  itemIncrementAuditedItems(){
    this.auditedItems++;
  }

  itemDecrementAuditedItems(){
    this.auditedItems--;
  }

  modifyItemAudited(itemIndex: number, value: boolean){
    this.items[itemIndex].audited = value;
  }

  modifyItemSelectedQuantity(itemIndex: number, value: number){
    this.items[itemIndex].selectedQuantity = value;
  }

  convertJSON(cartPosition){
    this.cartPosition = cartPosition.cartPosition;
    for(var i = 0; i < cartPosition.items.length; i++)
    {
    
      var anItem = new Item();
      anItem.convertJSON(cartPosition.items[i]);

      this.items.push(anItem);
    }
  }
}
