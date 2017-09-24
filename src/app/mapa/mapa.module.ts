import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiMapModule } from '@ngui/map';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RotasComponent } from './rotas/rotas.component';
import { RotaService } from './services';

import { MapaRoutingComponent } from './mapa-routing.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { ListarRotaComponent } from './listar';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA1lgTn2BQ2ZDHgvVKeDN174dousm8btkI&libraries=visualization,places,drawing'}),
    FormsModule,
    MapaRoutingModule    
  ],
  declarations: [
    RotasComponent,    
    ListarRotaComponent,
    MapaRoutingComponent
  ],
  providers :[
    RotaService
  ]
})
export class MapaModule { }
