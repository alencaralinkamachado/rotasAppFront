import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from '../../model';
import { ClienteService } from '../services';
import { PesquisarPipe } from '../pipes';

@Component({
  selector: 'app-listar-cliente',  
  templateUrl: './listar-cliente.component.html',  
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  public clientes : Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    
   
    
    this.listar();
  }

  
  listar() : void {
    this.clienteService.listaClientes().subscribe(clientes =>{
      this.clientes = clientes;
    });
  }

}
