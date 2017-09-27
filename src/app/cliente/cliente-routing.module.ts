import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastrarClienteComponent } from './cadastrar';
import { ListarClienteComponent } from './listar';
import { EditarClienteComponent } from './editar';
import { ClienteRoutingComponent } from './cliente-routing.component';


export const ClienteRoutes : Routes = [

    {
        path : 'listar_cliente',
        component : ClienteRoutingComponent,
        children : [
            {
                path : '',
                component : ListarClienteComponent
            },
            {
                path : 'cadastrar_cliente',
                component : CadastrarClienteComponent
            },
            {
                path: 'editar_cliente/:id',
                component : EditarClienteComponent
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