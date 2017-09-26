import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { CadastrarClienteComponent } from './cadastrar';
import { ClienteRoutingComponent } from './cliente-routing.component';
import { ClienteRoutingModule } from './cliente-routing.module';

import { ClienteService } from './services';
import { ListarClienteComponent } from './listar';
import { PesquisarPipe } from './pipes';


@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    CadastrarClienteComponent,
    ClienteRoutingComponent,
    ListarClienteComponent,
    PesquisarPipe
  ],
  providers : [
    ClienteService
  ]
})
export class ClienteModule { }
