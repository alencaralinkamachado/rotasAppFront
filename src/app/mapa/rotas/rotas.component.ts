import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrawingManager, NguiMap, NguiMapComponent } from '@ngui/map';
import { Router} from '@angular/router';

import {Subscription} from 'rxjs';

import { ClienteService } from '../../cliente';
import { Rua, Cliente, Cidade, Rota } from '../../model';
import { RotaService } from '../services';


declare var swal: any;

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css']
})
export class RotasComponent implements OnInit {

  busy: Subscription;

  //clientes selecionados para montar rota
  private clientesSelec: Cliente[] = [];
  //clientes selecionados para ALTERAR rota
  private clientesSelecAlterar : Cliente[] = [];

  //visibilidade da view
  public ativaStreetView = false;
  public ativarAutalizacaoCliente = false;
  public ativarCriacaoRotaClientes = false;
  public larguraMapa: string = '12';


  public clientes: Cliente[] = [];
  public rotas: Rota[] = [];
  public rotaSelecionada: Rota = new Rota();
  public clienteSelecionado: Cliente;

  // esse Overlay e um polygon
  private selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;
  //@ViewChild(NguiMapComponent) ngUiMap : NguiMapComponent;


  //marker clicado/selecionado pelo usuario
  private markerInstanciaSelecionadoMapa: any;

  constructor(private clienteService: ClienteService, private rotaService: RotaService, private router : Router) { }


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
    this.carregaRotas();
  }

  carregaRotas(): void {
    this.rotaService.listarRotasPorCidade().subscribe(rotas => {
      this.rotas = rotas;
      console.log(rotas);
    });
  }


  private clienteTemp: Cliente[] = [];
  /**
   * Carrega todos os clientes do backend
   */
  carregaClientes(): void {
    this.busy = this.clienteService.listaClientes().subscribe(clientes => {
      this.clientes = clientes;
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



  map: any;
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;


  /*onMapReady(map) {
    this.map = map;
    console.log('this.map', map);
    
    this.clienteService.listaClientes().subscribe(clientes => {
      //this.clienteTemp = clientes;
      this.clientes = clientes;
      //console.log(this.clienteTemp);

     /* for (let cli of this.clienteTemp) {
        cli.latv = parseFloat(cli.latitude);
        cli.lngv = parseFloat(cli.longitude);
        this.clientes.push(cli);
      }*/
  /*  console.log('terminou de carregar clientes ...');

    for (let c of this.clientes) {
      console.log('vai interar nos clientes...');

      var cliLatLng = new google.maps.LatLng(parseFloat(c.latitude), parseFloat(c.longitude));

      var marker = new google.maps.Marker({
        position: cliLatLng,
        title: c.rota.nome+' - '+c.nome
      });

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
        marker.setIcon(image);
        //marker.setDraggable(true);
        //marker.nguiMapComponent.center = ''+this.marker.lat+','+this.marker.lng+'';
        //marker.nguiMapComponent.zoom = '16';

        //marker.nguiMapComponent.openInfoWindow('iw', marker);
      }

     marker.addListener('click', function () {
        
        var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">' + c.nome + '</h1>' +
        '<div id="bodyContent">' +
        '<p><img style="max-height: 100px; max-width: 100px;" class="resize" src="../../assets/img/cliente.jpg" align="left" />O cliente <b>' +
        c.nome + '</b>, reside na rua  <b>' + c.rua.nome + '</b>, Nº <b>' + c.numero + '</b> <br />' +
        'colocar aqui mais informações importântes .... ' +
        ' Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Link do Facebook: , <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';
        
        
        var infowindow = new google.maps.InfoWindow({
          content: contentString,
          position : cliLatLng
        });          
        infowindow.open(map, this.marker);
      });

      marker.addListener('dblclick', function () {
        console.log('clique duplo ' + c.nome);
        this.marker.setDraggable(true);
        
            this.ativarAutalizacaoCliente = true;
            this.larguraMapa = '8';
            this.ativarCriacaoRotaClientes = false;
        
      });


      marker.setMap(this.map);
    }

  });

}*/

  permiterMoverPonto1({ target: marker }) {
    marker.setDraggable(true);

    this.ativarAutalizacaoCliente = true;
    this.larguraMapa = '8';
    this.ativarCriacaoRotaClientes = false;



  }
 public ativarTabelaIncluirClientesNovosRota : boolean = false;
 public ativarTabela_Alterar_ClientesRota : boolean = false;
  /**
   * utilizado para comparar todos os pontos que existem no mapa com as lat_lng do poligono 
   * criado pelo usuario. Esse metodo compara todas as lat_lng dos clientes existentes no mapa
   * e pergunta individualmente se o cliente esta dentro da poligono
   */
  clientesSelecionadosRota() {

    console.log('chamou clientes Selecioandso rodas ....');

    //var sydneyLoc = new google.maps.LatLng(-30.342013, -54.339090); 
    //console.log(google.maps.geometry.poly.containsLocation(sydneyLoc, this.selectedOverlay));

    for (let cli of this.clientes) {

      if (cli.rota.img == 'semRota') {        
        
        var cliLatLng = new google.maps.LatLng(parseFloat(cli.latitude), parseFloat(cli.longitude));
        if (google.maps.geometry.poly.containsLocation(cliLatLng, this.selectedOverlay) === true) {
          cli.checked = true;
          //console.log('qtd clientesSelec ****'+this.clientesSelec.length);
          var encontrado = false;
          //laco for para testar no momento de faze varios poligonos no mapa
          //nao sera colocado mais de 1x o cliente na lista
          for (let client of this.clientesSelec) {
            if (client.id === cli.id) {
              encontrado = true
            }
          }
          if (encontrado) {
            console.log('cliente já existe dentro do poligono')
          } else {
            this.ativarTabelaIncluirClientesNovosRota = true;
            this.clientesSelec.push(cli);
          }
        }

      } else {
       
        
        var cliLatLng = new google.maps.LatLng(parseFloat(cli.latitude), parseFloat(cli.longitude));
        if (google.maps.geometry.poly.containsLocation(cliLatLng, this.selectedOverlay) === true) {
          cli.checked = true;
          //console.log('qtd clientesSelec ****'+this.clientesSelec.length);
          var encontrado = false;
          //laco for para testar no momento de faze varios poligonos no mapa
          //nao sera colocado mais de 1x o cliente na lista
          for (let client of this.clientesSelecAlterar) {
            if (client.id === cli.id) {
              encontrado = true
            }
          }
          if (encontrado) {
            console.log('cliente já existe dentro do poligono')
          } else {
            this.ativarTabela_Alterar_ClientesRota = true;
            this.clientesSelecAlterar.push(cli);
          }
        }
        console.log('cliente já tem rota... ' + cli.rota.nome);

      }


    }


    //this.achaClientesVindosBackend_e_que_nao_marcados_mapa();

    console.log('********************************');
    console.log('**** clientes selecionados ****' + this.clientesSelec.length);
    for (let cli of this.clientesSelec) {
      console.log('Nome: ' + cli.nome + ' checked? ' + cli.checked);
    }
    this.larguraMapa = '8';
    this.ativarAutalizacaoCliente = false;
    this.ativarCriacaoRotaClientes = true;

  }

  /**
   laço de repedicao usado para idt clientes q nao foram 
   marcados no mapa mas vieram do backend
   */

  achaClientesVindosBackend_e_que_nao_marcados_mapa(): void {

    for (let cliT of this.clientes) {
      let cod = false;
      for (let cli of this.clientesSelec) {
        if (cliT.nome == cli.nome) {
          cod = true;
        }
      }
      if (!cod) {
        console.log('&&&&');
        console.log('&&&& clientes q não apareceram no mapa' + cliT.nome);
      }

    }
  }




  /**
   * ativa mapa streetView
   */
  ativaStreetViewMap(): void {
    console.log('ativaStreetView() ... ');
    this.ativaStreetView = true;
  }

  /**
   * Apaga o poligono criado pelo usuario, zera o conjunto de clientes selecionados
   * esconde a coluna para insercao dos clientes na rota
   * aumenta a largura do mapa para 12 colunas
   */
  deleteSelectedOverlay() {


    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
    }
    this.clientesSelec = [];
    this.clientesSelecAlterar = [];
    this.ativarTabela_Alterar_ClientesRota = false;
    this.ativarCriacaoRotaClientes = false;
    this.larguraMapa = '12';
   // console.log('vai navegar para /mapa ...');
   // this.router.navigate(['/mapa']);
  }


  // codigo abaixo esta relacionado ao mapa principal

  moveuPonto({ target: panorama }) {

    // let lati = parseFloat(panorama.getPosition().lat());
    // this.clienteSelecionado.latitude = String(lati) ;
    //var myLatlng = new google.maps.LatLng(parseFloat(panorama.getPosition().lat()),parseFloat(panorama.getPosition().lng()));

    console.log('novaLat --- >' + panorama.getPosition().lat());
    console.log('novaLng --- >' + panorama.getPosition().lng());

    this.clienteSelecionado.latv = parseFloat(panorama.getPosition().lat());
    this.clienteSelecionado.lngv = parseFloat(panorama.getPosition().lng());

  }
  posicao({ target: panorama }) {
    console.log('posicao ...');
    console.log('posicao --- >' + panorama.getPosition());
    panorama = new google.maps.StreetViewPanorama(document.getElementById('sv'));

  }


  dbClikPermiterMoverPonto({ target: marker }) {
    
    if(this.clienteSelecionado.rota.img == 'semRota'){
      swal("AVISO!", "Cliente sem rota! Adicione o cliente em alguma ROTA para ter permissão de alterar seus dados", "info");
    }else{
      marker.setDraggable(true);
      
          this.ativarAutalizacaoCliente = true;
          this.larguraMapa = '8';
          this.ativarCriacaoRotaClientes = false;
    }
 
  }

  // obj marker com informacoes personalizadas
  private marker = {
    display: true,
    lat: null,
    lng: null,
    title: null,
    nome: null,
    nomeRua: null,
    numero: null,
    nomeRota: null
  };
  clicked({ target: marker }, cli: Cliente) {
    this.markerInstanciaSelecionadoMapa = marker;
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    this.marker.title = 'Nome: ' + cli.nome + ' - ' + cli.rua.nome + ' Nº ' + cli.numero + ' Rota: ' + cli.rota.nome;
    this.marker.nome = cli.nome;
    this.marker.nomeRua = cli.rua.nome;
    this.marker.numero = cli.numero;
    this.marker.nomeRota = cli.rota.nome;
    this.clienteSelecionado = cli;
    this.clienteSelecionado.latv = parseFloat(this.clienteSelecionado.latitude);
    this.clienteSelecionado.lngv = parseFloat(this.clienteSelecionado.longitude);
    console.log('--->' + this.clienteSelecionado.nome);
    console.log('--->' + this.clienteSelecionado.latitude);
    console.log('--->' + this.clienteSelecionado.rota.nome);
    //console.log('getTitle() .... '+marker.getTitle());
    //console.log(marker.cli);
    marker.setTitle(cli.rota.nome);


    //marker.setDraggable(true);
    //marker.nguiMapComponent.center = ''+this.marker.lat+','+this.marker.lng+'';
    //marker.nguiMapComponent.zoom = '16';



    marker.nguiMapComponent.openInfoWindow('iw', marker);
  }

  /* private customMarker = {
      display: true,
      lat: null,
      lng: null,
      title: null,
    };*/

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

  /*hideMarkerInfo() {
    this.marker.display = !this.marker.display;
  }*/

  //https://rawgit.com/ng2-ui/map/master/app/index.html#/custom-marker



  // codigo abaixo esta relacionado ao formulario para atualizacao de clientes

  /**
   * Atualiza cliente com o backend
   * 
   */
  atualizar(): void {


    // aqui esta tendo um erro na conversao da lat lng para string (LatLngLiteral: in property lat: not a number) TRATAR mais tarde!
    console.log('... Dados q serão atualizados ....');
    this.clienteSelecionado.latitude = String(this.clienteSelecionado.latv);
    console.log('latitude final ..' + this.clienteSelecionado.latitude);
    this.clienteSelecionado.longitude = String(this.clienteSelecionado.lngv);
    console.log('longitude final ...' + this.clienteSelecionado.longitude);
    console.log(' rota id ...' + this.clienteSelecionado.rota.id);
    console.log(' rota ...' + this.clienteSelecionado.rota.nome);


    var rotaImg: Rota;

    for (let rot of this.rotas) {
      //console.log('testando rotas... '+rot.id+ ' - '+this.clienteSelecionado.rota.id);
      if (rot.id == this.clienteSelecionado.rota.id) {
        //console.log(' rota img selecionada ...'+rot.img);
        rotaImg = rot;
      }
    }

    var image = {
      url: '../../assets/img/' + rotaImg.img + '.png',
      anchor: new google.maps.Point(0, 16),
      size: new google.maps.Size(52, 52),
      scaledSize: new google.maps.Size(42, 42),
    };
    this.markerInstanciaSelecionadoMapa.setIcon(image);

    this.busy =  this.clienteService.atualiza_lat_lng(this.clienteSelecionado).subscribe(res => {

      if (res === 'e') {
        swal("ERRO!", "Problemas na atulização das coordenadas", "error");
      } else {
        swal('Atualizado!', 'Coordenadas Atualizada com sucesso', 'success');
        this.fecharFromAtualizacao();
      }

    });

  }

  fecharFromAtualizacao(): void {
    this.ativaStreetView = false;
    this.markerInstanciaSelecionadoMapa.setDraggable(false);
    this.ativarAutalizacaoCliente = false;
    this.larguraMapa = '12';
   
  }




  incluirSelectedCli() { // right now: ['1','3']
    return this.clientesSelec
      .filter(opt => opt.checked)
      .map(opt => opt.id)
  }

  incluirClientesRota(): void {
    console.log('Rota selecionada : ' + this.rotaSelecionada.id);
    if (typeof this.rotaSelecionada.id === 'undefined') {
      swal("ERRO!", "Selecione uma ROTA para incluir os CLIENTES", "error");
    } else {
      //this.rotaSelecionada = new Rota();
      console.log('clinetes');
      let clien: Cliente[] = [];
      for (let c of this.incluirSelectedCli()) {
        clien.push(new Cliente(c))
        console.log(c);
      }

      this.rotaSelecionada.clientes = clien;
      this.busy = this.rotaService.incluiClientesRota(this.rotaSelecionada).subscribe(res => {
        if (res === 'e') {
          swal("ERRO!", "Clientes não incluídos na ROTA! Informe o suporte", "error")
        } else {
          swal("Sucesso", res, "success")
        }
      });

      //for( let cl of this.rotaSelecionada.clientes){
      // console.log('clientes serão enviados -> '+cl.nome+' id: '+cl.id);
      //}
    }

    this.ativarTabelaIncluirClientesNovosRota = false;

    if(!this.ativarTabela_Alterar_ClientesRota){
      this.deleteSelectedOverlay()
    }

  }

  /**
   atualizar rotas dos clientes selecionados no poligono
   */

  alterarSelectedCli() { // right now: ['1','3']
  return this.clientesSelecAlterar
    .filter(opt => opt.checked)
    .map(opt => opt.id)
}

alterarClientesRota(): void {
  console.log('Rota selecionada : ' + this.rotaSelecionada.id);
  if (typeof this.rotaSelecionada.id === 'undefined') {
    swal("ERRO!", "Selecione uma ROTA para alterar os CLIENTES", "error");
  } else {
    //this.rotaSelecionada = new Rota();
    console.log('clinetes');
    let clien: Cliente[] = [];
    for (let c of this.alterarSelectedCli()) {
      clien.push(new Cliente(c))
      console.log(c);
    }

    this.rotaSelecionada.clientes = clien;
    this.busy = this.rotaService.alteraClientesRota(this.rotaSelecionada).subscribe(res => {
      if (res === 'e') {
        swal("ERRO!", "Clientes não incluídos na ROTA! Informe o suporte", "error")
      } else {
        swal("Sucesso", res+' '+this.rotaSelecionada.nome, "success")
      }
    });

    //for( let cl of this.rotaSelecionada.clientes){
    // console.log('clientes serão enviados -> '+cl.nome+' id: '+cl.id);
    //}
  }
  this.ativarTabela_Alterar_ClientesRota = false;

  if(!this.ativarTabelaIncluirClientesNovosRota){
    this.deleteSelectedOverlay()
  }
}

}
 