import { Http, Headers } from '@angular/http';

export  class AbstractService{

    public readonly ip_producao = "http://200.132.36.170:8087/";

    public readonly ip_teste = "http://localhost:8180/";
    public readonly ip_testeNote = "http://localhost:8180/";
    public readonly BASE_URL = this.ip_producao+"appRotas-1.2.1_mobile";


    public headers : Headers;
    protected http : Http;
      constructor(http: Http) { 
          this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type','application/json');
      }

}