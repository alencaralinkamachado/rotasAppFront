import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastrarClienteComponent } from './cadastrar';
import { ClienteRoutingComponent } from './cliente-routing.component';


export const ClienteRoutes : Routes = [

    {
        path : 'cliente',
        component : ClienteRoutingComponent,
        children : [
            {
                path : '',
                component : CadastrarClienteComponent
            }

        ]
    }

];

@NgModule({
    imports : [
        RouterModule.forChild(ClienteRoutes)
    ],
    exports : [
        RouterModule
    ]
})
export class ClienteRoutingModule{

}