import { Rota } from './rota.model';
export class Cliente{
    constructor(public id_back?: number, public id?: number, public nome?: string, public end1?: string, 
        public end2?: string, public end3?: string, public onde?: string, public area?: number, 
        public latitude?: number, public longitude?: number, public foto?: string, public rota?: Rota ){}


        public enviado : boolean;
        public coletado : boolean;
}