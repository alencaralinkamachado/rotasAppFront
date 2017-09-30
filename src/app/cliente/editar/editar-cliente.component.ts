import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ClienteService } from '../services';
import { RotaService } from '../../mapa/services';
import { Cliente, Rua, Rota, Cidade } from '../../model';

declare var swal: any;

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  @ViewChild('formCliente') formCliente: NgForm;

  busy: Subscription;

  public cliente: Cliente;
  public rotas: Rota[] = [];
  public ruas: Rua[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private clienteService: ClienteService, private rotaService: RotaService) { }



  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    console.log('id cliente ....' + id);
    this.buscaPorId(id);
    this.listarRotas();
    this.listarRuas();
    this.iniciaCliente();
  }

  iniciaCliente(): void {
    this.cliente = new Cliente();
    this.cliente.rua = new Rua();
    this.cliente.rota = new Rota(1);
    this.cliente.cidade = new Cidade(1, "São Gabriel");
  }

  buscaPorId(id: number): void {
    this.busy = this.clienteService.buscaPorId(id).subscribe(res => {
      this.cliente = res;
      console.log('---> ' + this.cliente.nome);
      console.log('id rua ' + this.cliente.rua.id);
      console.log('rua ' + this.cliente.rua.nome);
      console.log('id rota ' + this.cliente.rota.id);
      console.log('rota ' + this.cliente.rota.nome);
      console.log(' cpf '+this.cliente.cpf);
    })
  }

  listarRotas(): void {
    this.rotaService.listarRotasPorCidade().subscribe(rotas => {
      this.rotas = rotas;
    });
  }

  listarRuas(): void {
    this.clienteService.listarRuas().subscribe(ruas => {
      this.ruas = ruas;
      console.log(this.ruas);
    }, erro => console.log(erro));
  }

//tutorial sobre radio button e checkebox
//http://www.concretepage.com/angular-2/angular-2-radio-button-and-checkbox-example

  alteraAssinatura(): void{
  
    this.cliente.ativo = !this.formCliente.controls['ativo'].value;
    var situacao : string;

    if(this.cliente.ativo){
      situacao = "ATIVAR"
    }else{
      situacao = "CANCELAR"
    }
               
   swal({
    title: 'ATENÇÃO!',
    //text: "Você tem certeza que deseja alterar o estado dessa assinatura?",
    html:
    'Você vai <b>'+situacao+'</b> a assinatura do cliente <b>'+this.cliente.nome+'</b>',
    type: 'warning',    
    confirmButtonColor: '#3085d6',    
    confirmButtonText: 'OK'
  });

    
  }
  
  atualizar(): void {
    console.log(' -- atualizar --');
    var cli = this.cliente;
    console.log('id ' + cli.id + ' nome: ' + cli.nome + ' cpf: ' + cli.cpf + ' codCorrreio: ' + cli.codCorreio);
    console.log('ondEixar: ' + cli.ondeDeixar + ' ruaId: ' + cli.rua.id + ' ruaNome: ' + cli.rua.nome + ' N: ' + cli.numero);
    console.log(' idCidade: ' + cli.cidade.id + ' nomeCidade: ' + cli.cidade.nome + ' lat: ' + cli.latitude + ' long: ' + cli.longitude);
    console.log('comp: ' + cli.complemento + ' email: ' + cli.email + ' tel1: ' + cli.telefone1 + ' tel2: ' + cli.telefone2);
    console.log('tel3: ' + cli.telefone3 + ' idRota: ' + cli.rota.id + ' rotaNome: ' + cli.rota.nome)
    console.log(' ativo? ' + this.cliente.ativo)

    this.cliente.longitude = this.cliente.longitude.trim();
    this.cliente.latitude = this.cliente.latitude.trim();

    
    if (this.cliente.latitude.toString().charAt(3) != '.' || this.cliente.longitude.toString().charAt(3) != '.') {
      swal("AVISO!", "Dados de localização devem estar no padrão -XX.XXXXXX e ser somente NÚMEROS", "info");
    } else if (!this.cliente.latitude.startsWith('-') || !this.cliente.longitude.startsWith('-')) {
      swal("AVISO!", "Dados de localização devem estar no padrão -XX.XXXXXX e ser somente NÚMEROS", "info");
    } else {

       this.busy = this.clienteService.update(this.cliente).subscribe(res => {
        if (res === 'e') {
          swal("ERRO!", "Cliente não Atualizado! Informe o suporte.", "error");
        } else {
          swal("Sucesso!", this.cliente.nome + " " + res, "success");
          this.iniciaCliente();
          this.router.navigate(['/listar_cliente']);
        }
      }); 

    }



  }
  voltar(): void {
    this.router.navigate(['/listar_cliente']);
  }

}
