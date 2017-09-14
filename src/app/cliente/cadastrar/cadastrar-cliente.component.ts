import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../services';
import { Rua, Cliente, Cidade } from '../shared';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {

  @ViewChild('formCliente') formCliente: NgForm;

  private ruas : Rua[] = []; 
  private rua : Rua;
  private cliente : Cliente;

  constructor(private clienteService : ClienteService) { }

  ngOnInit() {

    this.listarRuas();    
    this.cliente = new Cliente();
    this.cliente.rua = new Rua();
    this.cliente.cidade = new Cidade(1, "São Gabriel");    
  }

  listarRuas() : void{
    this.clienteService.listarRuas().subscribe( ruas => {
      this.ruas = ruas;
      console.log(this.ruas);
    }, erro => console.log(erro));
  }

  cadastrar():void{
    
    if(this.formCliente.form.valid){
      console.log(this.cliente);
    }

  }

}
