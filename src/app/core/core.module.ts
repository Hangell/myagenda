import {NgModule} from '@angular/core';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {Clipboard} from '@ionic-native/clipboard/ngx';

@NgModule({
  declarations: [],
  imports: [
    IonicModule.forRoot(),
  ],
  exports: [
    BrowserModule,
    IonicModule
  ],
  providers: [Clipboard, {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}]
})
export class CoreModule {
}
