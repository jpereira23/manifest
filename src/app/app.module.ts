import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoutesPage } from '../pages/routes/routes';
import { RoutePage } from '../pages/route/route';
import { CartPositionPage } from '../pages/cartPosition/cartPosition';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorsPage } from '../pages/errors/errors';
import { CartHandlesPage } from '../pages/error/cartHandles/cartHandles';
import { DamagedCartHandles } from '../pages/error/damagedCartHandles/damagedCartHandles';
import { MisPickPage } from '../pages/error/misPick/misPick';
import { WrapIssuePage } from '../pages/error/wrapIssue/wrapIssue';
import { ShortsPage } from '../pages/error/shorts/shorts';
import { OveragesPage } from '../pages/error/overages/overages';
import { EndOfShiftPage } from '../pages/endOfShift/endOfShift'; 
import { BunErrorPage } from '../pages/error/bunError/bunError';
import { WrongCartPage } from '../pages/error/wrongCart/wrongCart';
import { ReportView } from '../pages/reportView/report';
import { PickerView } from '../pages/pickerView/picker';
import { AddPickerPage } from '../pages/addPicker/addpicker';
import { LoginPage } from '../pages/login/login'; 


import { DataService } from '../pages/data.service';
import { AuditorService } from '../pages/auditor.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RoutesPage,
    RoutePage,
    CartPositionPage,
    ErrorsPage,
    CartHandlesPage,
    DamagedCartHandles,
    MisPickPage, 
    WrapIssuePage,
    ShortsPage, 
    OveragesPage,
    EndOfShiftPage,
    BunErrorPage,
    WrongCartPage,
    ReportView,
    PickerView,
    AddPickerPage, 
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp), 
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoutesPage,
    RoutePage,
    CartPositionPage,
    ErrorsPage,
    CartHandlesPage,
    DamagedCartHandles,
    MisPickPage,
    WrapIssuePage,
    ShortsPage,
    OveragesPage,
    EndOfShiftPage,
    BunErrorPage,
    WrongCartPage,
    ReportView,
    PickerView,
    AddPickerPage,
    LoginPage
  ],
  providers: [
    DataService,
    AuditorService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
