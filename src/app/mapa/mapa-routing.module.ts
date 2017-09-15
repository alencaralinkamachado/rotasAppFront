import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RotasComponent } from './rotas/rotas.component';
import { MapaRoutingComponent } from './mapa-routing.component';

export const MapaRouter : Routes = [
    {
        path : 'mapa',
        component : MapaRoutingComponent,
        children : [
            {
                path : '',
                component : RotasComponent
            }
        ]

    }
]

@NgModule({
    imports : [
        RouterModule.forChild(MapaRouter)
    ],
    exports : [ RouterModule]
})
export class MapaRoutingModule{ }