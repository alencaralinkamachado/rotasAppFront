import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../model/cliente-model';

@Injectable()
export class NovoBackClienteService {

  public readonly ip_producao = "http://200.132.36.170:8087/";

    public readonly ip_teste = "http://localhost:8180/";
    public readonly ip_testeNote = "http://localhost:8180/";
    public readonly BASE_URL = this.ip_producao+"controleRotasJornal-1.0";
    private readonly CLIENTE_URL = this.BASE_URL + '/api/cliente';

    public headers : Headers;
    protected http : Http;
      constructor(http: Http) { 
          this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type','application/json');
      }

      listaClientes() : Observable<Cliente[]>{
        return this.http.get(this.CLIENTE_URL+'/clientesSemFoto')
        .map(response => response.json() as Cliente)
        .catch(error => Observable.throw(error));
      }

      listar() : Observable<Cliente[]>{
        return this.http.get(this.CLIENTE_URL+'/clientes')
        .map(response => response.json() as Cliente)
        .catch(error => Observable.throw(error));
      }
     

}
