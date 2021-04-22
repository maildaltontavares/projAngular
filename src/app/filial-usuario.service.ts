import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 
 
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'; 
import {Filial} from  './filial.model'; 
import { delay, map, tap } from 'rxjs/operators';  

@Injectable({
  providedIn: 'root'
})
export class FilialUsuarioService {

  private filialUsuarioSubject$: BehaviorSubject<Filial[]> = new BehaviorSubject<Filial[]>([]);   
  private loaded: boolean = false; 
  constructor(private http: HttpClient) { } 
 
  getUsuarioFilial(): Observable<Filial[]> {

    if (!this.loaded) {

        //this.http.get<[]>(`http://localhost:8080/crudphp/view/wsUser.php?id=9999&wscd=3`)     
        this.http.get<[]>(`https://virtuax.herokuapp.com/view/wsUser.php?id=9999&wscd=3`)   
        .pipe( 
          tap((filiais) => console.log(' getFilialUsuario')),
          tap((filiais) => console.log(filiais)),
          delay(1000)
        )
        .subscribe(this.filialUsuarioSubject$); 

        this.loaded = true;
    }

    return this.filialUsuarioSubject$.asObservable(); 

  }

  getUsuarioFilialById(pid:number): Observable<Filial[]>  { 

       // return this.http.get<Filial[]>( 'http://localhost:8080/crudphp/view/wsUser.php?id=' +   pid.toString() +   '&wscd=3'  ) 
       return this.http.get<Filial[]>( 'https://virtuax.herokuapp.com/view/wsUser.php?id=' +   pid.toString() +   '&wscd=3'  ) 
        .pipe(
          tap((u) => {  
                  console.log('atualizaServiceNome');  
          }),   
       
         )   
}  



}
