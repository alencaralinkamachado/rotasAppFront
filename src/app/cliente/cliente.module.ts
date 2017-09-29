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
import { KzMaskDirective } from '../shared/directives/masked-input/kz-mask.directive';
import { EditarClienteComponent } from './editar';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    HttpModule,    
    FormsModule, 
    BrowserAnimationsModule,
    BusyModule,
  ],
  declarations: [
    CadastrarClienteComponent,
    ClienteRoutingComponent,
    ListarClienteComponent,
    PesquisarPipe,
    KzMaskDirective,
    EditarClienteComponent    
  ],
  providers : [
    ClienteService
  ],
  exports :[
    KzMaskDirective    
  ]
})
export class ClienteModule { }
