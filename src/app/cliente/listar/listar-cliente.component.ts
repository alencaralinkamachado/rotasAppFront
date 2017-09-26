import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from '../../model';
import { ClienteService } from '../services';
import { PesquisarPipe } from '../pipes';

@Component({
  selector: 'app-listar-cliente',  
  templateUrl: './listar-cliente.component.html',  
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  public clientes : Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  records: Array<any>;
  

  ngOnInit() {
    
    this.records= [
      { CategoryID: 1,  CategoryName: "Beverages", Description: "Coffees, teas" },
      { CategoryID: 2,  CategoryName: "Condiments", Description: "Sweet and savory sauces" },
      { CategoryID: 3,  CategoryName: "Confections", Description: "Desserts and candies" },
      { CategoryID: 4,  CategoryName: "Cheeses",  Description: "Smetana, Quark and Cheddar Cheese" },
      { CategoryID: 5,  CategoryName: "Grains/Cereals", Description: "Breads, crackers, pasta, and cereal" },
      { CategoryID: 6,  CategoryName: "Beverages", Description: "Beers, and ales" },
      { CategoryID: 7,  CategoryName: "Condiments", Description: "Selishes, spreads, and seasonings" },
      { CategoryID: 8,  CategoryName: "Confections", Description: "Sweet breads" },
      { CategoryID: 9,  CategoryName: "Cheeses",  Description: "Cheese Burger" },
      { CategoryID: 10, CategoryName: "Grains/Cereals", Description: "Breads, crackers, pasta, and cereal" }
     ];
    
    this.listar();
  }

  
  listar() : void {
    this.clienteService.listaClientes().subscribe(clientes =>{
      this.clientes = clientes;
    });
  }

}
