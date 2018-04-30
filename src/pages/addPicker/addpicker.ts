import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Picker } from '../models/picker';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-add-picker',
  templateUrl: 'addpicker.html'
  })

  export class AddPickerPage{
    name: string = "";
    picker: Picker = new Picker();
    pickers: Array<Picker> = [];
    duplicate: boolean = false;
    constructor(private viewCtrl: ViewController, private storage: Storage, private navParams: NavParams){
      this.pickers = this.navParams.get('pickers');
    }

    dismiss(){
      this.viewCtrl.dismiss();
    }

    submit(){
      this.picker.name = this.name;
      if(this.testForDuplicate() == false){
	this.viewCtrl.dismiss(this.picker)
      }
      this.duplicate = true;
      //this.viewCtrl.dismiss(this.picker);

    }

    testForDuplicate(){
      for(var i = 0; i < this.pickers.length; i++){
	if(this.pickers[i].name == this.name)
	{
	  return true;
	}
      }
      return false;
    }

 
  }
