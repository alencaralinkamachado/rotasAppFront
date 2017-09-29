import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';


import { AppRoutingModule } from './app-routing.module';

import { ClienteModule } from './cliente';
import { MapaModule } from './mapa';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClienteModule,
    MapaModule,
    BrowserAnimationsModule,
    BusyModule,
    AppRoutingModule // deixar esse sempre por ultimo
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
