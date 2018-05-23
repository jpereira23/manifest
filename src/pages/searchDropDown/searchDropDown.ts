import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from './searchPage/searchPage';
import { Picker } from '../models/picker';
import { AuditorService } from '../auditor.service';


@Component({
  selector: 'search-drop-down',
  templateUrl: 'searchDropDown.html'
})

export class SearchDropDown{
  @Input() picker: Array<Picker> = [];
  selectedPicker: Picker = new Picker();
  constructor(private navCtrl: NavController, private auditorService: AuditorService){
    this.pickers = this.auditorService.getPickers();
  }

  search(){
    this.navCtrl.push(SearchPage, {
      pickers: this.pickers,
      callback: this.getData
    });
  }  

  getData = (data) => {
    return new Promise((resolve, reject) => {
      this.selectedPicker = data;
      resolve();
    });
  };
}

