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

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';
import { TrackComponent } from './track/track.component';
import { TrackDirceuComponent } from './track/track-dirceu/track-dirceu.component';
import { TrackPauloComponent } from './track/track-paulo/track-paulo.component';
import { TrackEliComponent } from './track/track-eli/track-eli.component';
import { TrackHilarioComponent } from './track/track-hilario/track-hilario.component';
import { TrackPauloHilarioComponent } from './track/track-paulo-hilario/track-paulo-hilario.component';
import { TrackLuizComponent } from './track/track-luiz/track-luiz.component';
import { TracksTcxComponent } from './track/tracks-tcx/tracks-tcx.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA1lgTn2BQ2ZDHgvVKeDN174dousm8btkI&libraries=visualization,places,drawing'}),
    FormsModule,
    BrowserAnimationsModule,
    BusyModule,
    MapaRoutingModule    
  ],
  declarations: [
    RotasComponent,    
    ListarRotaComponent,
    MapaRoutingComponent,
    TrackComponent,
    TrackDirceuComponent,
    TrackPauloComponent,
    TrackEliComponent,
    TrackHilarioComponent,
    TrackPauloHilarioComponent,
    TrackLuizComponent,
    TracksTcxComponent
  ],
  providers :[
    RotaService
  ]
})
export class MapaModule { }
