import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 
 
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'; 
import {Grupo} from  './grupo.model'; 
import { delay, map, tap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})

export class GrupoService {
 

  private grupoSubject$: BehaviorSubject<Grupo[]> = new BehaviorSubject<Grupo[]>([]);   
  private loaded: boolean = false; 
  constructor(private http: HttpClient) { } 

  getGrupos(): Observable<Grupo[]> {

    if (!this.loaded) {

        //this.http.get<[]>(`http://localhost:8080/crudphp/view/wsGrupo.php?nome=ZZ`)  
        this.http.get<[]>(`https://virtuax.herokuapp.com/view/wsGrupo.php?nome=ZZ`)   
        .pipe( 
          tap((grps) => console.log(' getGrupos')),
          tap((grps) => console.log(grps)),
          delay(1000)
        )
        .subscribe(this.grupoSubject$);

        this.loaded = true;
    }

    return this.grupoSubject$.asObservable(); 

  }

  getByName(pNome:String, pPagina:number): Observable<Grupo[]>  { 

        //return this.http.get<Grupo[]>( 'http://localhost:8080/crudphp/view/wsGrupo.php?nome=' +  pNome + '&pagina=' + pPagina.toString() )     
        return this.http.get<Grupo[]>('https://virtuax.herokuapp.com/view/wsGrupo.php?nome=' +  pNome + '&pagina=' + pPagina.toString() )  
        .pipe(
          tap((u) => {


                  console.log('atualizaServiceNome');
            
            /*
                  let grps = this.grupoSubject$.getValue();  
                  grps.splice(0,grps.length); 
                  for (let j = 0; j < u.length; j++) { 
                      grps.push(u[j]);   
                  }  

            */

          
          }), 
       
         )   
}

 



}