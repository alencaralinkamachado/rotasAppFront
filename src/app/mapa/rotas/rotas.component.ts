import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../cliente';
import { Rua, Cliente, Cidade } from '../../cliente/shared';
import { DrawingManager } from '@ngui/map';

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css']
})
export class RotasComponent implements OnInit {
  
  
  //visibilidade da view
  ativaStreetView = false;
  ativarAutalizacaoCliente = false;
  ativarCriacaoRotaClientes = false;

  private clientes : Cliente [] = [] ;
  private clienteSelecionado : Cliente;

  constructor(private clienteService : ClienteService) { }

  selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;

  ngOnInit() {
    this.drawingManager['initialized$'].subscribe(dm => {
      google.maps.event.addListener(dm, 'overlaycomplete', event => {
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          dm.setDrawingMode(null);
          google.maps.event.addListener(event.overlay, 'click', e => {
            this.selectedOverlay = event.overlay;
            this.selectedOverlay.setEditable(true);
          });
          this.selectedOverlay = event.overlay;
          var coordinates = (this.selectedOverlay.getPath().getArray().toString());
          console.log(coordinates);
          
          this.clientesSelecionadosRota();
        }
      });
    });
    this.carregaClientes();
  }
private  clientesSelec : Cliente [] = [] ;
  clientesSelecionadosRota(){

    //var sydneyLoc = new google.maps.LatLng(-30.342013, -54.339090); 
    //console.log(google.maps.geometry.poly.containsLocation(sydneyLoc, this.selectedOverlay));
    

    for(let cli of this.clientes){
      var cliLatLng = new google.maps.LatLng( parseFloat(cli.latitude) , parseFloat(cli.longitude) );
      if(google.maps.geometry.poly.containsLocation(cliLatLng, this.selectedOverlay) === true){
        this.clientesSelec.push(cli);
      }
    }

    console.log('**** clientes selecionados ****');
    for(let cli of this.clientesSelec){
      console.log('Nome: '+cli.nome)
    }
    this.ativarCriacaoRotaClientes = true;
    this.ativarAutalizacaoCliente = false;
  }
  //google.maps.geometry.poly.containsLocation
  /*
  latitude
:
"-30.342013"
longitude
:
"-54.339090"
  
  */

  deleteSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
    }
    this.clientesSelec = [];
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

      private markerInstanciaSelecionadaMapa : any;

    atualizar() : void{
      this.ativaStreetView = false;
      this.markerInstanciaSelecionadaMapa.setDraggable(false);
    }

    permiterMoverPonto({target: marker}){
      marker.setDraggable(true);
     
      this.ativarAutalizacaoCliente = true;
      this.ativarCriacaoRotaClientes = false;
    }

  clicked({target: marker}, cli: Cliente) {
    this.markerInstanciaSelecionadaMapa = marker;
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    this.marker.title = 'Nome: '+cli.nome+' Cod Rua: '+cli.rua.id+' Nº '+cli.numero;
    this.marker.cli = cli;
    this.clienteSelecionado = cli;
    console.log('---> '+cli.nome);
    //console.log('getTitle() .... '+marker.getTitle());
    //console.log(marker.cli);
    marker.setTitle('teste');
    //marker.setDraggable(true);
    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  ativaStreetViewMap():void{
    console.log('ativaStreetView() ... ');
    this.ativaStreetView = true;
  }

  /*hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }*/

//https://rawgit.com/ng2-ui/map/master/app/index.html#/custom-marker
 
}
