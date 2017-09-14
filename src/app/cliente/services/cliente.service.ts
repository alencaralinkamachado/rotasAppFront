import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Rua } from '../shared';



@Injectable()
export class ClienteService {

  private readonly BASE_URL = "http://localhost:8080/appRotas-1.0/rua/ruas/cidade/1";
  

  constructor(private http: Http) { }

  listarRuas() : Observable<Rua[]>{
    return this.http.get(this.BASE_URL)
    .map(response => response.json() as Rua)
    .catch(error => Observable.throw(error));
  }

}
