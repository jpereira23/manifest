import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-clockin',
  templateUrl: 'clockIn.html'
})

export class ClockInModal{
  firstName: string;
  lastName: string;  
  isChangeName: boolean = false;
  constructor(private navParams: NavParams, private viewCtrl: ViewController){
    this.firstName = this.navParams.get('firstName');
    this.lastName = this.navParams.get('lastName');
    if(this.firstName.length == 0)
    {
      this.isChangeName = true;
    }
    console.log(this.firstName);
    console.log(this.lastName); 
  }

  changeName(){
    this.isChangeName = true;
  }

  clockIn(){
    var aDate = new Date();
    console.log("HELLO");
    let data = { 
      firstName: this.firstName,
      lastName: this.lastName,
      aDate: aDate
    };
    this.viewCtrl.dismiss(data);
  } 

}
