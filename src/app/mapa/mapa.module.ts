import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiMapModule } from '@ngui/map';
import { FormsModule } from '@angular/forms';

import { RotasComponent } from './rotas/rotas.component';

import { MapaRoutingComponent } from './mapa-routing.component';
import { MapaRoutingModule } from './mapa-routing.module';


@NgModule({
  imports: [
    CommonModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA1lgTn2BQ2ZDHgvVKeDN174dousm8btkI'}),
    MapaRoutingModule,
    FormsModule
  ],
  declarations: [
    RotasComponent,
    MapaRoutingComponent
  ]
})
export class MapaModule { }
