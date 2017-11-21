import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapaRoutingComponent,  } from './mapa-routing.component';
import { ListarRotaComponent } from './listar';
import { RotasComponent } from './rotas';
import { TrackComponent } from './track';
import { TrackDirceuComponent,TrackPauloComponent, 
    TrackEliComponent, TrackHilarioComponent, 
    TrackPauloHilarioComponent, TrackLuizComponent, TracksTcxComponent } from '../mapa/track';

export const MapaRouter : Routes = [
    {
        path : 'mapa',
        component : MapaRoutingComponent,
        children : [
            {
                path : '', component : RotasComponent
            },
            {
                path : 'listarrotas', component : ListarRotaComponent
            },
            {
                path : 'track', component : TrackComponent
            },
            {
                path : 'trackDirceu', component : TrackDirceuComponent
            },
            {
                path : 'trackPaulo', component : TrackPauloComponent
            },
            {
                path : 'trackEli', component : TrackEliComponent
            },
            {
                path : 'trackHilario', component : TrackHilarioComponent
            },
            {
                path : 'trackPauloHilario', component : TrackPauloHilarioComponent
            },
            {
                path : 'trackLuiz', component : TrackLuizComponent
            },
            {
                path : 'tracktcx', component : TracksTcxComponent 
            }
        ]

    }
];

@NgModule({
    imports : [
        RouterModule.forChild(MapaRouter)
    ],
    exports : [ RouterModule]
})
export class MapaRoutingModule{ }