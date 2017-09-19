import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../cliente';
import { Rua, Cliente, Cidade } from '../../cliente/shared';
import { DrawingManager, NguiMap, NguiMapComponent } from '@ngui/map';

declare var swal:any;

@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css']
})
export class RotasComponent implements OnInit {
  
  //clientes selecionados para montar rota
  private  clientesSelec : Cliente [] = [] ;
  
  //visibilidade da view
  public ativaStreetView = false;
  public ativarAutalizacaoCliente = false;
  public ativarCriacaoRotaClientes = false;
  public larguraMapa : string = '12';
  

  public clientes : Cliente [] = [] ;
  public clienteSelecionado : Cliente;

  // esse Overlay e um polygon
  private selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;
  //@ViewChild(NguiMapComponent) ngUiMap : NguiMapComponent;
  

  //marker clicado/selecionado pelo usuario
  private markerInstanciaSelecionadoMapa : any;

  constructor(private clienteService : ClienteService) { }
  

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
 
  private  clienteTemp : Cliente [] = [] ;
  /**
   * Carrega todos os clientes do backend
   */
  carregaClientes() : void{
    this.clienteService.listaClientes().subscribe( clientes =>{
      this.clienteTemp = clientes;
      console.log(this.clienteTemp);
      
      for(let cli of this.clienteTemp){
        cli.latv = parseFloat(cli.latitude);
        cli.lngv = parseFloat(cli.longitude);
        this.clientes.push(cli);
      }

    });    
  }

  /**
   * utilizado para comparar todos os pontos que existem no mapa com as lat_lng do poligono 
   * criado pelo usuario. Esse metodo compara todas as lat_lng dos clientes existentes no mapa
   * e pergunta individualmente se o cliente esta dentro da poligono
   */
  clientesSelecionadosRota(){
    //var sydneyLoc = new google.maps.LatLng(-30.342013, -54.339090); 
    //console.log(google.maps.geometry.poly.containsLocation(sydneyLoc, this.selectedOverlay));

    for(let cli of this.clientes){            

      var cliLatLng = new google.maps.LatLng( parseFloat(cli.latitude), parseFloat(cli.longitude) );      
      if(google.maps.geometry.poly.containsLocation(cliLatLng, this.selectedOverlay) === true){
        cli.checked = true;
        this.clientesSelec.push(cli);
      }
    }

    console.log('**** clientes selecionados ****');
    for(let cli of this.clientesSelec){
      console.log('Nome: '+cli.nome+' checked? '+cli.checked);
    }
    this.larguraMapa = '8';
    this.ativarAutalizacaoCliente = false;
    this.ativarCriacaoRotaClientes = true;
    
  }

  /**
   * ativa mapa streetView
   */
  ativaStreetViewMap():void{
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
    this.ativarCriacaoRotaClientes = false;
    this.larguraMapa = '12';
  }  
  
 
  // codigo abaixo esta relacionado ao mapa principal

    moveuPonto({target: panorama}){
    
     // let lati = parseFloat(panorama.getPosition().lat());
     // this.clienteSelecionado.latitude = String(lati) ;
     //var myLatlng = new google.maps.LatLng(parseFloat(panorama.getPosition().lat()),parseFloat(panorama.getPosition().lng()));
     
      console.log('novaLat --- >'+panorama.getPosition().lat());
    console.log('novaLng --- >'+ panorama.getPosition().lng());
     
    this.clienteSelecionado.latv = parseFloat(panorama.getPosition().lat());
    this.clienteSelecionado.lngv = parseFloat(panorama.getPosition().lng());
    
    }
    posicao({target: panorama}){
      console.log('posicao ...');
      console.log('posicao --- >'+ panorama.getPosition());
      panorama = new google.maps.StreetViewPanorama(document.getElementById('sv'));
      
    }
   

    permiterMoverPonto({target: marker}){
      marker.setDraggable(true);
     
      this.ativarAutalizacaoCliente = true;
      this.larguraMapa = '8';
      this.ativarCriacaoRotaClientes = false;

     

    }

  // obj marker com informacoes personalizadas
  private marker = {
    display: true,
    lat: null,
    lng: null,
    title : null,       
  };
  clicked({target: marker}, cli: Cliente) {
    this.markerInstanciaSelecionadoMapa = marker;
    this.marker.lat = marker.getPosition().lat();
    this.marker.lng = marker.getPosition().lng();
    this.marker.title = 'Nome: '+cli.nome+' - '+cli.rua.nome+' Nº '+cli.numero;
    
    this.clienteSelecionado = cli;
    console.log('---> '+this.clienteSelecionado.nome);
    //console.log('getTitle() .... '+marker.getTitle());
    //console.log(marker.cli);
    marker.setTitle('teste');
    //marker.setDraggable(true);
    //marker.nguiMapComponent.center = ''+this.marker.lat+','+this.marker.lng+'';
    //marker.nguiMapComponent.zoom = '16';
     
    marker.nguiMapComponent.openInfoWindow('iw', marker);
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
  atualizar() : void{    
       

    // aqui esta tendo um erro na conversao da lat lng para string (LatLngLiteral: in property lat: not a number) TRATAR mais tarde!
    this.clienteSelecionado.latitude = String(this.clienteSelecionado.latv);
    console.log('latitude final ..'+this.clienteSelecionado.latitude);
    this.clienteSelecionado.longitude = String(this.clienteSelecionado.lngv);
    console.log('longitude final ...'+this.clienteSelecionado.longitude);

     this.caixaAtualizacaoCoordenadas();

  /*  swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function () {            
      atualizar = true; 
    })
    console.log('.. atualizar '+atualizar);
    if(atualizar){
      this.caixaAtualizacaoCoordenadas();
    }*/

    

  }

  fecharFromAtualizacao() : void{
    this.ativaStreetView = false;
    this.markerInstanciaSelecionadoMapa.setDraggable(false);
    this.ativarAutalizacaoCliente = false;
    this.larguraMapa = '12';      
  }

  caixaAtualizacaoCoordenadas(): void{

  

    this.clienteService.atualiza_lat_lng(this.clienteSelecionado).subscribe (res =>{
      
        if(res === 'e'){
          swal("ERRO!", "Problemas na atulização das coordenadas", "error");
        }else{
          swal('Atualizado!','Coordenadas Atualizada com sucesso','success');
          this.fecharFromAtualizacao();
        }
      
      });
   
  }

   
  

 selectedCli() { // right now: ['1','3']
 return this.clientesSelec
           .filter(opt => opt.checked)
           .map(opt => opt.id)
}
   
  checkboxsSelecionados() : void{
   
    console.log('clinetes');
    for(let c of this.selectedCli()){
      console.log(c);
    }

  }

}
