import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Picker } from '../models/picker';
import { Storage } from '@ionic/storage';
import { DataService } from '../data.service';
@Component({
  selector: 'page-add-picker',
  templateUrl: 'addpicker.html'
  })

  export class AddPickerPage{
    name: string = "";
    loaded: boolean = false;
    picker: Picker = new Picker();
    pickers: Array<Picker> = [];
    duplicate: boolean = false;
    constructor(private viewCtrl: ViewController, private storage: Storage, private navParams: NavParams, private dataService: DataService){
    this.dataService.getPickers().subscribe(res => {
      this.pickers = res;
      this.loaded = true;
    });
      console.log(this.pickers);
    }

    dismiss(){
      this.viewCtrl.dismiss();
    }

    submit(){
      this.picker.name = this.name;
      if(this.testForDuplicate() == false){
	this.dataService.addPicker(this.picker).subscribe();
	this.viewCtrl.dismiss(this.picker)
      }
      else{
	this.duplicate = true;
      }
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
