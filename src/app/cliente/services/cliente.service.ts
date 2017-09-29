import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Rua, Cliente, Rota } from '../../model';

import { AbstractService } from '../../abstract.service';

@Injectable()
export class ClienteService extends AbstractService{

  
  private readonly RUA_URL = this.BASE_URL + '/rua/ruas/cidade/1';
  private readonly CLIENTE_URL = this.BASE_URL + '/cliente';
  
  constructor(http: Http) {
    super(http);
  }


  listarRuas() : Observable<Rua[]>{
    return this.http.get(this.RUA_URL)
    .map(response => response.json() as Rua)
    .catch(error => Observable.throw(error));
  }

 cadastra(cliente : Cliente) : Observable<String>{
   return this.http.post(this.CLIENTE_URL, JSON.stringify(cliente),{headers : this.headers})
   .map( ()=> ("Cliente cadastrado com sucesso") )
   .catch(error => ("e"));
 }

 update(cliente : Cliente) : Observable<String>{
   return this.http.put(this.CLIENTE_URL, JSON.stringify(cliente), {headers : this.headers})
   .map( () => ("ATUALIZADO com sucesso"))
   .catch(error =>("e"));
 }

 listaClientes() : Observable<Cliente[]>{
   return this.http.get(this.CLIENTE_URL+'/clientes')
   .map(response => response.json() as Cliente)
   .catch(error => Observable.throw(error));
 }

 atualiza_lat_lng(cliente: Cliente) : Observable<String>{
   return this.http.post(this.CLIENTE_URL+'/atualizalatlngrota', JSON.stringify(cliente), {headers : this.headers})
   .map( () => ("Coordenadas Atualizada com sucesso"))
   .catch(error => ("e"));
 }

 listarClientesPorRota(rota : Rota) : Observable<Cliente[]>{
   return this.http.get(this.CLIENTE_URL+'/clientes/rota/'+rota.id)
   .map(response => response.json() as Cliente)
   .catch(error => Observable.throw(error));
 }

 buscaPorId(id : number) : Observable<Cliente>{
   return this.http.get(this.CLIENTE_URL+'/cliente/'+id)
   .map(response => response.json())
  .catch(error => Observable.throw(error));
 }



}
