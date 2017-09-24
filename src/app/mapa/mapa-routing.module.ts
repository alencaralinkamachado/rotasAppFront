import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapaRoutingComponent,  } from './mapa-routing.component';
import { ListarRotaComponent } from './listar';
import { RotasComponent } from './rotas';

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