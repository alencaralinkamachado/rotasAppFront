import { Http, Headers } from '@angular/http';

export  class AbstractService{

    public readonly ip_producao = "http://200.132.36.170:8087/";
    public readonly ip_teste = "http://localhost:8080/";
    public readonly BASE_URL = this.ip_teste+"appRotas-1.0";

    public headers : Headers;
    protected http : Http;
      constructor(http: Http) { 
          this.http = http;
        this.headers = new Headers();
        this.headers.append('Content-Type','application/json');
      }

}