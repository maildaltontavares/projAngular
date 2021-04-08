import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../person.model';
import * as faker from 'faker';
import { select, Store, StoreFeatureModule } from '@ngrx/store';
import { AppState } from '../store';
import { PersonAll, PersonDelete, PersonNew, PersonUpdate } from '../store/person.actions';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.css']
})
export class CadastrosComponent implements OnInit {

  personTmp:Person | any;
  people$!: Observable<Person[]>;
 

constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
   
       this.store.dispatch(new PersonAll());
       this.people$ =  this.store.pipe(select('people'));

  }

  addNew(){ 
        
       let person : Person = {
        name: faker.name.findName(),
        age: Math.round(Math.random()*100),
        address : faker.address.streetAddress(),
        city: faker.address.city(),
        country: faker.address.country(),
        _id: '1'//new Date().getMilliseconds.toString()
       };
       //console.log(person);
       this.store.dispatch(new PersonNew({person}));
 
       


  }

  update(p:Person){

        console.log('update');
        console.log(p._id);
/*
        this.personTmp.name = faker.name.findName();
        //.name = faker.name.findName();
        this.personTmp.age= Math.round(Math.random()*100);
        this.personTmp.address = faker.address.streetAddress();
        this.personTmp.city= faker.address.city();
        this.personTmp.country= faker.address.country();
  */      
        let person : Person = {
          name: faker.name.findName(),
          age: Math.round(Math.random()*100),
          address : faker.address.streetAddress(),
          city: faker.address.city(),
          country: faker.address.country(),
         
         };
         person._id='1';

         this.personTmp = person;
        
        console.log('this.personTmp');
       console.log(this.personTmp);
       this.store.dispatch(new PersonUpdate({person: this.personTmp}));



  }


  delete(p:Person){
    //this.store.dispatch(new PersonDelete({id:p._id}));

  }

}
