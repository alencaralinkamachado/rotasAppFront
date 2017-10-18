import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapaRoutingComponent,  } from './mapa-routing.component';
import { ListarRotaComponent } from './listar';
import { RotasComponent } from './rotas';
import { TrackComponent } from './track';

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