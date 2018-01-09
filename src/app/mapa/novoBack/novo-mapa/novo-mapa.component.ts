import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';

import { NovoBackClienteService } from '../../../mapa/novoBack/service/novo-back-cliente.service';
import { Cliente } from '../model/cliente-model';
@Component({
  selector: 'app-novo-mapa',
  templateUrl: './novo-mapa.component.html',
  styleUrls: ['./novo-mapa.component.css']
})
export class NovoMapaComponent implements OnInit {
  
  busy: Subscription;
  public larguraMapa: string = '12';
  public clientes: Cliente[] = [];

  constructor(private clienteService: NovoBackClienteService) { }

  ngOnInit() {
    this.carregaClientes();
  }

  /**
   * Carrega todos os clientes do backend
   */
  carregaClientes(): void {
    console.log('***** carregaClientes ****');
    this.busy = this.clienteService.listaClientes().subscribe(clientes => {
      //this.clientes = clientes;

      for( let cli of clientes){
          if(cli.latitude != null ){
            //if(cli.latitude != null &&  cli.rota.id_legado == 7){
            console.log(cli.end1)
            this.clientes.push(cli);
          }
      }


      console.log('qtd Clientes',this.clientes.length)
      // var str = "-53.65656"; var n = str.startsWith("-");
      

      /*  this.clienteTemp = clientes;
        console.log(this.clienteTemp);
  
        for (let cli of this.clienteTemp) {
          cli.latv = parseFloat(cli.latitude);
          cli.lngv = parseFloat(cli.longitude);
          this.clientes.push(cli);
        }*/
      console.log('terminou de carregar clientes ...');
    });

  }

   // obj marker com informacoes personalizadas
   private marker = {
    display: true,
    lat: null,
    lng: null,
    title: null,
    nome: null,
    end1: null,
    nomeRota: null,
    foto : null
  };


   //marker clicado/selecionado pelo usuario
   private markerInstanciaSelecionadoMapa: any;
   public clienteSelecionado: Cliente;

  clicked({ target: marker }, cli: Cliente) {
    this.markerInstanciaSelecionadoMapa = marker;
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    this.marker.title = 'Nome: ' + cli.nome + ' - ' + cli.end1 + ' Rota: ' + cli.area;
    this.marker.nome = cli.nome;
    this.marker.end1 = cli.end1;
    this.marker.foto = cli.foto;
    this.marker.nomeRota = cli.rota.nome;
    this.clienteSelecionado = cli;
    //this.clienteSelecionado.latv = parseFloat(this.clienteSelecionado.latitude);
    //this.clienteSelecionado.lngv = parseFloat(this.clienteSelecionado.longitude);
    console.log('--->' + this.clienteSelecionado.nome);
    console.log('--->' + this.clienteSelecionado.latitude);
    //console.log('---> cpf' + this.clienteSelecionado.cpf);
    console.log('--->' + this.clienteSelecionado.rota.nome);
    //console.log('getTitle() .... '+marker.getTitle());
    //console.log(marker.cli);
    marker.setTitle(cli.rota.nome);


    //marker.setDraggable(true);
    //marker.nguiMapComponent.center = ''+this.marker.lat+','+this.marker.lng+'';
    //marker.nguiMapComponent.zoom = '16';



    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  onCustomMarkerInit(customMarker, c: Cliente) {

    
    if (c.rota.img != 'semRota') {
      var image = {
        url: '../../assets/img/' + c.rota.img + '.png',
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 16),
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(52, 52),
        //The size of the entire image after scaling, if any. Use this property to stretch/shrink an image or a sprite.
        scaledSize: new google.maps.Size(42, 42),
        // The origin for this image is (0, 0).
        //origin: new google.maps.Point(1, 1),
      };
      //anchor: [16,16],
      //size: [52,52],
      //scaledSize: [52,52]
      //var image1 = '../../assets/img/'+c.rota.img+'.png';
      //marker.setIcon(image);
      customMarker.setIcon(image);
      //marker.setDraggable(true);
      //marker.nguiMapComponent.center = ''+this.marker.lat+','+this.marker.lng+'';
      //marker.nguiMapComponent.zoom = '16';

      //marker.nguiMapComponent.openInfoWindow('iw', marker);
    }

  }
}
