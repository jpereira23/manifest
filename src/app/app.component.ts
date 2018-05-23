import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuditorService } from '../pages/auditor.service';

import { RoutesPage } from '../pages/routes/routes';
@Component({
  templateUrl: 'app.html',
  providers: [AuditorService]
})
export class MyApp {
  rootPage:any = RoutesPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auditorService: AuditorService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

