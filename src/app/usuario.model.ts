import {Filial} from  './filial.model';

export interface User {
    
    id : number;
    nome: string;
    senha: string;
    email:string;
    tel:string;
    filpad: number;
    grupos:string[];
    filiais:Filial;   

}
