import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../services';
import { Cliente } from '../../model';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  public cliente : Cliente;

  constructor(private router : Router, private route : ActivatedRoute, private serviceCliente : ClienteService) { }



  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    console.log('id cliente ....'+id);
    this.buscaPorId(id);
    
  }

  buscaPorId(id : number) : void {
    this.serviceCliente.buscaPorId(id).subscribe( res =>{
      this.cliente = res;
      console.log('---> '+this.cliente.nome);
    })
  }


}
