import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import { Cliente } from '../model/cliente-model';
import { NovoBackClienteService } from '../service/novo-back-cliente.service';
import { PequisaClientesPipePipe } from '../pipe/pequisa-clientes-pipe.pipe';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  busy: Subscription;

  public clientes : Cliente[] = [];
  public qtdClientesAtivos : number = 0;
  constructor(private clienteService: NovoBackClienteService) { }

  ngOnInit() {

    this.listar();
  }

  
  listar() : void {
    this.busy = this.clienteService.listaClientes().subscribe(clientes =>{
      this.clientes = clientes;
      //this.contadorClientesAtivos();
    });
  }

 /* contadorClientesAtivos() : void{
    for(let cli of this.clientes){
      if(cli.ativo){
        this.qtdClientesAtivos++;
      }
    }
  } */

}
