import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 
 
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'; 
import {Grupo} from  './grupo.model'; 
import { delay, map, tap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})

export class GrupoDescService { 

 
  //private grupoDescSubject$: BehaviorSubject<Grupo> = new BehaviorSubject<Grupo>({id:0,descricao:''}); 
  private grupoDescSubject$: BehaviorSubject<Grupo[]> = new BehaviorSubject<Grupo[]>([]);   

   
  private loaded_desc: boolean = false;
  
  constructor(private http: HttpClient) { }  

getDescGrupos(): Observable<Grupo[]> {

  if (!this.loaded_desc) {

      this.http.get<Grupo[]>(`http://localhost:8080/crudphp/view/wsGrupo.php?nome=ZZ`)     
      .pipe( 
        tap((grps) => console.log(' getDescGrupos')),
        tap((grps) => console.log(grps)),
        delay(1000)
      )
      .subscribe(this.grupoDescSubject$);

      this.loaded_desc = true;
  } 
  return this.grupoDescSubject$.asObservable();  
}

getGrupoById(id:number): Observable<Grupo[]>  {  
  return this.http.get<Grupo[]>( 'http://localhost:8080/crudphp/view/wsGrupo.php?id=' + id.toString() +'&wscd=1')     
      .pipe(
        tap((u) => { 
                console.log('GrupoServiceId');   
        }),  
       )   
}



}