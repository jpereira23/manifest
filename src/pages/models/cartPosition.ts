import { Item } from './item';

export class CartPosition{
  cartPosition: string;
  items: Array<Item>;
  picker: string;
  audited: boolean;
  auditedItems: number;

  constructor(){
    this.cartPosition = "";
    this.items = [];
    this.picker = "";
    this.audited = false;
    this.auditedItems = 0;
  }

  convertJSON(cartPosition){
    this.cartPosition = cartPosition.cartPosition;
    for(var i = 0; i < cartPosition.items.length; i++)
    {
    //for(var j = 0; j < cartPosition.items[i].quantity; j++)
    //{
	var anItem = new Item();
	anItem.convertJSON(cartPosition.items[i]);

	this.items.push(anItem);
	//}
    }
  }
}
