import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AbstractService } from '../../abstract.service';
import {  Rota} from '../../model';

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

}
