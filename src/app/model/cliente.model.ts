import { Rua, Cidade, Rota } from './index';

export class Cliente{

    constructor( public id?: number, public nome?: string, public cpf?: string, public codCorreio?: number, 
    public ondeDeixar?: string, public rua?: Rua, public numero?: number, public cidade?: Cidade, 
    public latitude?: string, public longitude?: string, public latv?: number, public lngv?: number, 
    public complemento?: string, public email?: string, public telefone1?: string, public telefone2?: string, public telefone3?: string, 
    public rota?: Rota){  }


    public checked : boolean; 

}

/*

private int id;
    private String nome;
    private String cpf;
    private String ondeDeixar;
    private Rua rua;
    private Cidade cidade;
    private int numero;
    private int codCorreio;
    private String latitude;
    private String longitude;
    private String complemento;
    private String email;
    private String telefone1;
    private String telefone2;
    private String telefone3;

*/