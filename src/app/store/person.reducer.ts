import * as fromPersonActions from './person.actions';
import {state} from '@angular/animations';
import {Person} from '../person.model'; 
 

export const initialState: Person[] = []; 
 
export function reducer(state=initialState,action:fromPersonActions.PersonActions){  
     
    switch(action.type){

        case fromPersonActions.PersonActionTypes.PERSON_ALL:
            return state;
    
        case fromPersonActions.PersonActionTypes.PERSON_DELETE:
            return state.filter(p=>p._id != action.payload.id);            

        case fromPersonActions.PersonActionTypes.PERSON_NEW: 
            return state.concat(action.payload.person);       
            

        case fromPersonActions.PersonActionTypes.PERSON_UPDATE:

            console.log('Recebendo para Alterar'); 
            console.log('person');
            console.log(action.payload.person);

            let people = state.slice();
            console.log('people');
            console.log(people);
            let i = people.findIndex(p=>p._id == action.payload.person._id);
            console.log(i);
             if (i>0)
                 state[i] = action.payload.person;
             return people; 
       
           
            
 
        default:
            return state;

    }  


};