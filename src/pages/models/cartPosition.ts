import { Item } from './item';
import { Picker } from './picker';

export class CartPosition{
  cartPosition: string;
  items: Array<Item>;
  backUpItems: Array<Item>;
  audited: boolean;
  auditedItems: number;
  picker: Picker;

  constructor(){
    this.cartPosition = "";
    this.items = [];
    this.picker = new Picker();
    this.audited = false;
    this.auditedItems = 0;
    this.backUpItems = [];
  }

  convertStorage(aCartPosition: CartPosition){
    this.cartPosition = aCartPosition.cartPosition
    this.audited = aCartPosition.audited;
    this.auditedItems = aCartPosition.auditedItems;
    for(var i = 0; i < aCartPosition.items.length; i++)
    {
      var aItem = new Item();
      aItem.convertStorage(aCartPosition.items[i])
      this.items.push(aItem);
      this.backUpItems.push(aItem);
    }

    this.picker.name = aCartPosition.picker.name;
    /** please finish errors and routes when we get to it **/
  }

  reSetItems(){
    this.items = this.backUpItems;
  }

  filterItems(aVal: string){
    this.items = this.items.filter((item) => {
      return (item.wrin.indexOf(aVal) > -1);
    });
  }

  isAudited(){
    return this.audited;
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
      this.backUpItems.push(anItem);
    }
  }
}
