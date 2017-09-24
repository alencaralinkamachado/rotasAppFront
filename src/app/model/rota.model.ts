import { Cidade, Cliente } from './index';
export class Rota{

    constructor(public id?: number, public nome?: string, public cidade?: Cidade, public img?: string, public clientes?: Cliente[] ){

    }

}