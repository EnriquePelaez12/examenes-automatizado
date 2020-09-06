import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase config
import { AngularFireModule } from '@angular/fire'; //Módulo para inicializar y vaya todo bien
import { AngularFirestoreModule } from '@angular/fire/firestore'; //Módulo Firestore(DB)
import { AngularFireStorageModule } from '@angular/fire/storage'; //Módulo de Storage
import { AngularFireAuthModule } from '@angular/fire/auth'; //Módulo de Authentication
import { firebaseConfig } from '../environments/environment'; //Aquí se encuentra una variable de configuración

import { GooglePlus } from '@ionic-native/google-plus/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFirestoreModule, 
    AngularFireStorageModule,
    AngularFireAuthModule 
    ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
