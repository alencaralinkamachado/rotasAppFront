import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {Subscription} from 'rxjs';

import { ClienteService } from '../services';
import { RotaService } from '../../mapa/services';
import { Rua, Cliente, Cidade, Rota } from '../../model';

import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {

  busy: Subscription;

  @ViewChild('formCliente') formCliente: NgForm;

  public ruas : Rua[] = []; 
  public rua : Rua;
  public cliente : Cliente;
  public rotas : Rota[] = [];

  constructor(private clienteService : ClienteService, private rotaService : RotaService, private router : Router, ) { }

  ngOnInit() {

    this.listarRuas();    
    this.iniciaCliente();
    this.listarRotas();
  }


  listarRotas() : void {
      this.rotaService.listarRotasPorCidade().subscribe ( rotas => {
        this.rotas = rotas;
      });
  }

  iniciaCliente(): void{
    this.cliente = new Cliente();
    this.cliente.cpf = '';
    this.cliente.ativo = true;
    this.cliente.rua = new Rua();
    this.cliente.rota = new Rota(1);
    this.cliente.cidade = new Cidade(1, "São Gabriel");
  }

  listarRuas() : void{
  this.busy = this.clienteService.listarRuas().subscribe( ruas => {
      this.ruas = ruas;
      console.log(this.ruas);
    }, erro => console.log(erro));
  }


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

  cadastrar():void{
    console.log('rota selecionada = '+this.cliente.rota.id);
    console.log(' cpf '+this.cliente.cpf);
    console.log(' tel 1'+this.cliente.telefone1)
    console.log(' tel 2'+this.cliente.telefone2)
    console.log(' tel 3'+this.cliente.telefone3)
    console.log(' longitude: '+this.cliente.longitude);
    console.log(' ativo: '+this.cliente.ativo)
    this.cliente.longitude = this.cliente.longitude.trim();
    this.cliente.latitude = this.cliente.latitude.trim();

    if(this.cliente.latitude.toString().charAt(3) != '.' || this.cliente.longitude.toString().charAt(3) != '.'){
      swal("AVISO!", "Dados de localização devem estar no padrão -XX.XXXXXX e ser somente NÚMEROS", "info");
    } else  if(!this.cliente.latitude.startsWith('-') || !this.cliente.longitude.startsWith('-')){
      swal("AVISO!", "Dados de localização devem estar no padrão -XX.XXXXXX e ser somente NÚMEROS", "info");
      }else{
        if(this.formCliente.form.valid){
          console.log(this.cliente);
          this.busy =  this.clienteService.cadastra(this.cliente).subscribe(res =>{
            if(res === 'e'){
              swal("ERRO!", "Cliente não cadastrado! Informe o suporte.", "error");
            }else{
              swal("Sucesso!", res, "success");
              this.iniciaCliente();
              this.router.navigate(['/listar_cliente']);
            }
            
          }); 
       }
      }
    

   
   
  }

  voltar() : void{
    this.router.navigate(['/listar_cliente']);
  }

/*

    if(res === 'e'){
          swal("ERRO!", "Problemas na atulização das coordenadas", "error");
        }else{
          swal('Atualizado!','Coordenadas Atualizada com sucesso','success');
          this.fecharFromAtualizacao();
        }

  showSwal(type){
    if(type == 'basic'){
      swal("Here's a message!");

  }else if(type == 'title-and-text'){
      swal("Here's a message!", "It's pretty, isn't it?")

  }else if(type == 'success-message'){
      swal("Good job!", "You clicked the button!", "success")

  }else if(type == 'warning-message-and-confirmation'){
      swal({  title: "Are you sure?",
              text: "You will not be able to recover this imaginary file!",
              type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-info btn-fill",
                confirmButtonText: "Yes, delete it!",
                cancelButtonClass: "btn btn-danger btn-fill",
                closeOnConfirm: false,
            },function(){
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            });

  }else if(type == 'warning-message-and-cancel'){
      swal({  title: "Are you sure?",
              text: "You will not be able to recover this imaginary file!",
              type: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel plx!",
              closeOnConfirm: false,
              closeOnCancel: false
            },function(isConfirm){
                if (isConfirm){
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                }else{
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });

  }else if(type == 'custom-html'){
      swal({  title: 'HTML example',
                html:
                    'You can use <b>bold text</b>, ' +
                    '<a href="http://github.com">links</a> ' +
                    'and other HTML tags'
            });

  }else if(type == 'auto-close'){
      swal({ title: "Auto close alert!",
             text: "I will close in 2 seconds.",
             timer: 2000,
             showConfirmButton: false
            });
  } else if(type == 'input-field'){
        swal({
              title: 'Input something',
              html: '<p><input id="input-field" class="form-control">',
              showCancelButton: true,
              closeOnConfirm: false,
              allowOutsideClick: false
            },
            function() {
              swal({
                html:
                  'You entered: <strong>' +
                  $('#input-field').val() +
                  '</strong>'
              });
            })
    }
}
*/

}
