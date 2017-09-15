import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../cliente';
import { Rua, Cliente, Cidade } from '../../cliente/shared';

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css']
})
export class RotasComponent implements OnInit {
   
   
  private clientes : Cliente [] = [] ;

  constructor(private clienteService : ClienteService) { }

  ngOnInit() {
     this.carregaClientes();
  }

  carregaClientes() : void{
      this.clienteService.listaClientes().subscribe( clientes =>{
        this.clientes = clientes;
        console.log(this.clientes);
      });

  }

  marker = {
    display: true,
    lat: null,
    lng: null,
    cli : null
  };

  cliente : Cliente;

  clicked({target: marker}) {
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    
    console.log(marker.cli);
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }

//https://rawgit.com/ng2-ui/map/master/app/index.html#/custom-marker
 
}
