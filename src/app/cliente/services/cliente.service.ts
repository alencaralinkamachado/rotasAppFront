import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Rua, Cliente } from '../shared';



@Injectable()
export class ClienteService {

  private readonly ip_producao = "http://200.132.36.170:8087/";
  private readonly ip_teste = "http://localhost:8080/";
  private readonly BASE_URL = this.ip_producao+"appRotas-1.0";
  private readonly RUA_URL = this.BASE_URL + '/rua/ruas/cidade/1';
  private readonly CLIENTE_URL = this.BASE_URL + '/cliente';
  
  private headers : Headers;

  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type','application/json');
  }

  listarRuas() : Observable<Rua[]>{
    return this.http.get(this.RUA_URL)
    .map(response => response.json() as Rua)
    .catch(error => Observable.throw(error));
  }

 cadastra(cliente : Cliente) : Observable<String>{
   return this.http.post(this.CLIENTE_URL, JSON.stringify(cliente),{headers : this.headers})
   .map( ()=> ("Cliente cadastrado com sucesso") );
 }

 listaClientes() : Observable<Cliente[]>{
   return this.http.get(this.CLIENTE_URL+'/clientes')
   .map(response => response.json() as Cliente)
   .catch(error => Observable.throw(error));
 }

 atualiza_lat_lng(cliente: Cliente) : Observable<String>{
   return this.http.post(this.CLIENTE_URL+'/atualizalatlng', JSON.stringify(cliente), {headers : this.headers})
   .map( () => ("Coordenadas Atualizada com sucesso"))
   .catch(error => ("e"));
 }

}
