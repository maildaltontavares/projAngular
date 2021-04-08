import { Action } from "@ngrx/store"; 
import { Person } from "../person.model";

export enum PersonActionTypes{
    PERSON_ALL    = '[PERSON_ALL] Busca todos as pessoas ',
    PERSON_NEW    = '[PERSON_NEW] Adicioa uma pessoa ',
    PERSON_UPDATE = '[PERSON_UPDATE] Atualiza  pessoas ',
    PERSON_DELETE = '[PERSON_DELETE] Deleta pessoas '


}

export class PersonAll implements Action {
      readonly type = PersonActionTypes.PERSON_ALL;
}

 
export class PersonNew implements Action {
    readonly type = PersonActionTypes.PERSON_NEW;
    constructor(public payload: {person: Person} ){}
}

export class PersonUpdate implements Action {
    readonly type = PersonActionTypes.PERSON_UPDATE;
    constructor(public payload: {person: Person} ){}
}

export class PersonDelete implements Action {
    readonly type = PersonActionTypes.PERSON_DELETE;
    constructor(public payload: {id:string} ){}
}
 
export type PersonActions = PersonAll |  PersonNew | PersonUpdate  | PersonDelete  ;