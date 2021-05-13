import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 
 
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'; 
import {FilialUsuario} from  './filialUsuario.model'; 
import { delay, map, tap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class FilialService {

  private filialSubject$: BehaviorSubject<FilialUsuario[]> = new BehaviorSubject<FilialUsuario[]>([]);   
  private loaded: boolean = false; 
  constructor(private http: HttpClient) { } 
 
  getFilial(): Observable<FilialUsuario[]> { 

    if (!this.loaded) {

        //this.http.get<[]>(`http://localhost:8080/crudphp/view/wsFilial.php?wscd=1`)     
        this.http.get<[]>(`https://virtuax.herokuapp.com/view/wsFilial.php?wscd=1`)
        .pipe( 
          tap((filiais) => console.log(' getFilial')),
          tap((filiais) => console.log(filiais)),
          delay(1000)
        )
        .subscribe(this.filialSubject$);

        this.loaded = true;
    }

    return this.filialSubject$.asObservable(); 

  } 
  atualizaFilial(): Observable<FilialUsuario[]>  { 

    //return this.http.get<[]>(`http://localhost:8080/crudphp/view/wsFilial.php?wscd=1`)
    return this.http.get<[]>(`https://virtuax.herokuapp.com/view/wsFilial.php?wscd=1`)
    
      .pipe(
        tap((u) => {
          console.log('atualizaServiceFilial');
        })

      );   
} 
  



}
