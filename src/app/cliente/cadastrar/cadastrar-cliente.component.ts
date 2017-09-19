import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../services';
import { Rua, Cliente, Cidade } from '../shared';

import { NgForm } from '@angular/forms';

declare var $:any;
declare var swal:any;

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css']
})
export class CadastrarClienteComponent implements OnInit {

  @ViewChild('formCliente') formCliente: NgForm;

  public ruas : Rua[] = []; 
  public rua : Rua;
  public cliente : Cliente;

  constructor(private clienteService : ClienteService) { }

  ngOnInit() {

    this.listarRuas();    
    this.iniciaCliente();
  }

  iniciaCliente(): void{
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
      this.clienteService.cadastra(this.cliente).subscribe(res =>{
        swal("Sucesso!", res, "success");
      });
    }
    this.iniciaCliente();
  }

/*
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
