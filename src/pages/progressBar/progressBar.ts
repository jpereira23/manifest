import { Component, Input } from '@angular/core';

@Component({
  selector: 'progressBar',
  templateUrl: 'progressBar.html'
})

export class ProgressBarComponent{
  @Input('progress') progress; 

  constructor(){
    
  }
}
