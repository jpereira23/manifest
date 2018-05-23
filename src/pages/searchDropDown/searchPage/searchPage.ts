import { Component } from '@angular/core';
import { Picker } from '../../models/picker';
import { NavController, NavParams, Keyboard } from 'ionic-angular';


@Component({
  selector: 'search-page',
  templateUrl: 'searchPage.html'
})

export class SearchPage{
  pickers: Array<Picker> = [];
  arrayOfPick: Array<any> = [];
  callback: any = null;
  constructor(private navCtrl: NavController, private navParams: NavParams, private keyboard: Keyboard){
    this.pickers = this.navParams.get('pickers'); 
    this.callback = this.navParams.get('callback');
    for(var i = 0; i < this.pickers.length; i++)
    {
      var pick = {
	picker: this.pickers[i],
	selected: false
      };
      this.arrayOfPick.push(pick);
    }
  }

  hideDaKeyboard(){
    this.keyboard.close();
  }

  selectPicker(i: number){

    this.arrayOfPick[i].selected = true;
    for(var j = 0; j < this.arrayOfPick.length; j++)
    {
      if(j != i)
      {
	this.arrayOfPick[j].selected = false;
      }	
    } 
  } 

  filterPicker(event){
    var arrayOfTmp: Array<any> = [];
    for(var i = 0; i < this.pickers.length; i++)
    {
      var pick = {
	picker: this.pickers[i],
	selected: false
      };
      arrayOfTmp.push(pick);
    } 
    this.arrayOfPick = arrayOfTmp;

    let val = event.target.value;
    if(val && val.trim() != ''){
      this.arrayOfPick = this.arrayOfPick.filter((item) => {
	return(item.picker.name.indexOf(val) > -1);
      });
    }
  }

  finished(){
    var selectedPicker = new Picker();
    for(var i = 0; i < this.arrayOfPick.length; i++)
    {
      if(this.arrayOfPick[i].selected == true){
	selectedPicker = this.arrayOfPick[i].picker;
      }
    }

    this.callback(selectedPicker).then(() => { this.navCtrl.pop() });
  }
}
