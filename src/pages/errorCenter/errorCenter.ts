import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuditorService } from '../auditor.service';
import { Error } from '../models/error';
import { ConfirmErrorPage } from '../confirmError/confirmError';

@Component ({
  selector: 'page-error-center',
  templateUrl: 'errorCenter.html'
})

export class ErrorCenterPage{
  potentialErrors: Array<Error> = [];
  constructor(private auditorService: AuditorService, private navCtrl: NavController){
    this.potentialErrors = this.auditorService.getPotentialErrors();
  }

  confirm(i: number){
    this.auditorService.addError(this.potentialErrors[i]);
    this.auditorService.removePotentialError(i);
    this.potentialErrors = [];
    this.potentialErrors = this.auditorService.getPotentialErrors();

  }

  remove(i: number){
    this.auditorService.removePotentialError(i);
    this.potentialErrors = [];
    this.potentialErrors = this.auditorService.getPotentialErrors();
  }

  edit(i: number){
    this.navCtrl.push(ConfirmErrorPage, {
      error: this.potentialErrors[i]
    });
  }
}
