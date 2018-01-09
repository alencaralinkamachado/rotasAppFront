import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pequisaClientesPipe'
})
export class PequisaClientesPipePipe implements PipeTransform {

  transform(categories: any, searchText: any): any {
    if(searchText == null) return categories;

   return categories.filter(function(category){
     //return category.CategoryName.toLowerCase().indexOf(searchText) > -1;
     if(category.nome.toLowerCase().indexOf(searchText) > -1){
       return category;
     }else if(category.end1.toLowerCase().indexOf(searchText) > -1){
       return category;
     }
     //return category.nome.toLowerCase().indexOf(searchText) > -1;
   })
 }

  /*transform(clientes: any, texto?: string): any {
    console.log('trans ..'+texto);
    if( (texto == null) || (texto =='') ) return clientes;

   return clientes.filter(cliente => {
     
     cliente.nome.toLowerCase().indexOf(texto.toLowerCase()) > -1;
    });*/

    //return clientes.filter(function(cliente){
      //return cliente.nome.toLowerCase().indexOf(texto.toLowerCase()) > 1;
    //});
  //}

}
// clientes.filter(cliente => cliente.rua.nome.toLowerCase().indexOf(search))
//return customers.filter(customer => customer.email.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);

 
