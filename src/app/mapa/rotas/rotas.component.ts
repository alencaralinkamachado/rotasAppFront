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
    title : null,
    cli : null
  };

  cliente : Cliente;

  teste(){
    console.log('novaLat --- >');
    
    
    }

    moveuPonto({target: panorama}){
    console.log('novaLat --- >');
    console.log('novaLng --- >'+ panorama.getPosition());
    //panorama = new google.maps.StreetViewPanorama(document.getElementById('sv'));
    
    }
    posicao({target: panorama}){
      console.log('posicao ...');
      console.log('posicao --- >'+ panorama.getPosition());
      panorama = new google.maps.StreetViewPanorama(document.getElementById('sv'));
      
      }

    cetarCoordenadas = false;

    atualizar() : void{
      this.cetarCoordenadas = false;
    }

    permiterMoverPonto({target: marker}){
      marker.setDraggable(true);
      this.cetarCoordenadas = true;
    }

  clicked({target: marker}, cli: Cliente) {
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    this.marker.title = marker.getTitle();
    console.log('---> '+cli.nome);
    //console.log('getTitle() .... '+marker.getTitle());
    //console.log(marker.cli);
    marker.setTitle('teste');
    //marker.setDraggable(true);
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }

//https://rawgit.com/ng2-ui/map/master/app/index.html#/custom-marker
 
}
