import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services';
import { RotaService } from '../../mapa/services';
import { Cliente, Rua, Rota, Cidade } from '../../model';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  public cliente : Cliente;
  public rotas : Rota[] = [];
  public ruas : Rua[] = []; 

  constructor(private router : Router, private route : ActivatedRoute, private clienteService : ClienteService, private rotaService : RotaService) { }



  ngOnInit() {    
    const id = +this.route.snapshot.params['id'];
    console.log('id cliente ....'+id);    
    this.buscaPorId(id);
    this.listarRotas();
    this.listarRuas();
    this.iniciaCliente();
  }

  iniciaCliente() : void{
    this.cliente = new Cliente();
    this.cliente.rua = new Rua();
    this.cliente.rota = new Rota(1);
    this.cliente.cidade = new Cidade(1, "São Gabriel");
  }

  buscaPorId(id : number) : void {
    this.clienteService.buscaPorId(id).subscribe( res =>{
      this.cliente = res;
      console.log('---> '+this.cliente.nome);
      console.log('id rua '+this.cliente.rua.id);
      console.log('rua '+this.cliente.rua.nome);
      console.log('id rota '+this.cliente.rota.id);
      console.log('rota '+this.cliente.rota.nome);
    })
  }

  listarRotas() : void {
    this.rotaService.listarRotasPorCidade().subscribe ( rotas => {
      this.rotas = rotas;
    });
}

listarRuas() : void{
  this.clienteService.listarRuas().subscribe( ruas => {
    this.ruas = ruas;
    console.log(this.ruas);
  }, erro => console.log(erro));
}

atualizar() : void{
  console.log(' -- atualizar --'+this.cliente);
}

}
