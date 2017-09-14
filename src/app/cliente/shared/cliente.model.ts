import { Rua } from './rua.model';
import { Cidade } from './cidade.model';

export class Cliente{

    constructor( public id?: number, public nome?: string, public cpf?: string, public codCorreio?: number, 
    public ondeDeixar?: string, public rua?: Rua, public numero?: number, public cidade?: Cidade, 
    public latitude?: string, public longitude?: string){        
    }

}