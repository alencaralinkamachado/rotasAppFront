import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';

import { Cliente } from '../../model';
import { ClienteService } from '../services';
import { PesquisarPipe } from '../pipes';

@Component({
  selector: 'app-listar-cliente',  
  templateUrl: './listar-cliente.component.html',  
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  busy: Subscription;

  public clientes : Cliente[] = [];
  public qtdClientesAtivos : number = 0;
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {

    this.listar();
  }

  
  listar() : void {
    this.busy = this.clienteService.listaClientes().subscribe(clientes =>{
      this.clientes = clientes;
      this.contadorClientesAtivos();
    });
  }

  contadorClientesAtivos() : void{
    for(let cli of this.clientes){
      if(cli.ativo){
        this.qtdClientesAtivos++;
      }
    }
  }

}
