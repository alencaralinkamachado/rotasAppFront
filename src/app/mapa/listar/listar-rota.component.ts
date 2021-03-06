import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';

import { Rota, Cliente } from '../../model';
import { RotaService } from '../services';
import { ClienteService } from '../../cliente';

@Component({
  selector: 'app-listar-rota',
  templateUrl: './listar-rota.component.html',
  styleUrls: ['./listar-rota.component.css']
})
export class ListarRotaComponent implements OnInit {

  busy: Subscription;

  public rotas: Rota[] = [];
  public rotaSelecionada: Rota = new Rota();
  public clientes : Cliente[] = [];


  constructor(private rotaService: RotaService, private clienteService : ClienteService) { }

  ngOnInit() {
    this.busy = this.rotaService.listarRotasPorCidade().subscribe( rotas =>{
      this.rotas = rotas;
    });
  }

  buscaClientesPorRota(): void{
    this.busy = this.clienteService.listarClientesPorRota(this.rotaSelecionada).subscribe(clientes =>{
      this.clientes = clientes;
    });
  }

}
