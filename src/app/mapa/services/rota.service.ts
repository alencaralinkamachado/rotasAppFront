import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AbstractService } from '../../abstract.service';
import { Rota, Track, Polyline} from '../../model';


@Injectable()
export class RotaService extends AbstractService  {

  private readonly ROTA_URL = this.BASE_URL + '/rota';

  constructor(http: Http) {
    super(http);
   }

   listarRotasPorCidade() : Observable<Rota[]>{
    return this.http.get(this.ROTA_URL+'/rotas/cidade/1')
    .map(response => response.json() as Rota)
    .catch(error => Observable.throw(error));
  }

  incluiClientesRota(rota : Rota) : Observable<String>{
    return this.http.post(this.ROTA_URL+'/rota/clientes', JSON.stringify(rota), {headers : this.headers})
    .map( () => ("Clientes Incluidos na rota: "+rota.nome))
    .catch(error => ("e"));
  }

  alteraClientesRota(rota : Rota) : Observable<String>{
    return this.http.post(this.ROTA_URL+'/rota/clientes/update', JSON.stringify(rota), {headers : this.headers})
    .map( () => ("Clientes ALTERADOS na rota: "))
    .catch(error => ("e"));
  }

  getTraks() : Observable<Polyline[]>{
    return this.http.get(this.BASE_URL+'/track/polilynes')
    .map(res => res.json() as Polyline)
    .catch( error => Observable.throw(error));
  }

  getTraksDirceu() : Observable<Track[]>{
    return this.http.get(this.BASE_URL+'/track/trackDirceu')
    .map(res => res.json() as Track)
    .catch( error => Observable.throw(error));
  }
  
  getTraksEverton() : Observable<Track[]>{
    return this.http.get(this.BASE_URL+'/track/trackEverton')
    .map(res => res.json() as Track)
    .catch( error => Observable.throw(error));
  }
  
  trackDirceuInicio() : Observable<Track[]>{
    return this.http.get(this.BASE_URL+'/track/trackDirceuInicio')
    .map(res => res.json() as Track)
    .catch( error => Observable.throw(error));
  }

  trackHilario() : Observable<Track[]>{
    return this.http.get(this.BASE_URL+'/track/trackHilario')
    .map(res => res.json() as Track)
    .catch( error => Observable.throw(error));
  }

  trackEli() : Observable<Track[]>{
    return this.http.get(this.BASE_URL+'/track/trackEli')
    .map(res => res.json() as Track)
    .catch( error => Observable.throw(error));
  }

  trackLuiz() : Observable<Track[]>{
    return this.http.get(this.BASE_URL+'/track/trackLuiz')
    .map(res => res.json() as Track)
    .catch( error => Observable.throw(error));
  }

  tracktcx() : Observable<Polyline>{
    return this.http.get(this.BASE_URL+'/tracktcx/tcx')
    .map(res => res.json() as Polyline)
    .catch( error => Observable.throw(error));
  }

}


/*
cadastra(cliente : Cliente) : Observable<String>{
   return this.http.post(this.CLIENTE_URL, JSON.stringify(cliente),{headers : this.headers})
   .map( ()=> ("Cliente cadastrado com sucesso") )
   .catch(error => ("e"));
 }
*/