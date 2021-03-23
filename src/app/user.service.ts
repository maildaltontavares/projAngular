import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'; 
import {User} from  './usuario.model';
import { delay, map, tap } from 'rxjs/operators';  
import {Grupo} from  './grupo.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private grupoSubject$: BehaviorSubject<Grupo[]> = new BehaviorSubject<Grupo[]>([]);
  private loaded: boolean = false;
  private loaded_grp: boolean = false;
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {

    if (!this.loaded) {

        //this.http.get<User[]>(`http://localhost:8080/crudphp/view/webServiceGet.php`)
        this.http.get<User[]>(`https://virtuax.herokuapp.com/view/webServiceGet.php`)        
        .pipe( 
          tap((usrs) => console.log(' getUsers')),
          tap((usrs) => console.log(usrs)),
          delay(1000)
        )
        .subscribe(this.userSubject$);

        this.loaded = true;
    }
    return this.userSubject$.asObservable(); 
  } 

  getGrupos(): Observable<Grupo[]> { 
    if (!this.loaded_grp) { 
        //this.http.get<Grupo[]>(`http://localhost:8080/crudphp/view/wsUser.php?id=9999&wscd=1`) 
        this.http.get<Grupo[]>(`https://virtuax.herokuapp.com/view/wsUser.php?id=9999&wscd=1`) 
        .pipe( 
          tap((grps) => console.log(' getGrupos')),
          tap((grps) => console.log(grps)),
          delay(1000)
        )
        .subscribe(this.grupoSubject$);

        this.loaded_grp = true;
    }
    return this.grupoSubject$.asObservable(); 
  }
 
  getGrupoById(i:number): Observable<Grupo[]>  {  
    //return this.http.get<Grupo[]>( 'http://localhost:8080/crudphp/view/wsUser.php?id=' + i.toString() + '&wscd=1' ) 
    return this.http.get<Grupo[]>( 'https://virtuax.herokuapp.com/view/wsUser.php?id=' + i.toString() + '&wscd=1' ) 
    .pipe(
      tap((u) => {
      
      }), 
   
     )  
   } 

  addPost(d: User): Observable<any>  {  
       
       //return this.http.post(`http://localhost:8080/crudphp/view/wsUser.php`,JSON.stringify({ d }) )
        return this.http.post(`https://virtuax.herokuapp.com/view/wsUser.php`,JSON.stringify({ d }) )
       
        .pipe(
               map(
                    (res) => {  
                              this.userSubject$.getValue().push(d);
                              this.atualizaUsers();   
                             }
                  )
             ); 
          
  } 
 getByName(pNome:String,pEmail:string,pPagina:number): Observable<User[]>  { 

    //return this.http.get<User[]>( 'http://localhost:8080/crudphp/view/wsUser.php?nome=' +  pNome + '&email=' + pEmail + '&pagina=' + pPagina.toString() )     
    return this.http.get<User[]>( 'https://virtuax.herokuapp.com/view/wsUser.php?nome=' +  pNome + '&email=' + pEmail + '&pagina=' + pPagina.toString() )     
        .pipe(
          tap((u) => {
                
            /*
                  console.log('atualizaServiceNome');
                  let usrs = this.userSubject$.getValue();  
                  usrs.splice(0,usrs.length); 
                  for (let j = 0; j < u.length; j++) { 
                      usrs.push(u[j]);   
                  }   
            */

          }), 
         ) // Pipe 

}

  getById(i:number): Observable<User>  {  
   //return this.http.get<User>( 'http://localhost:8080/crudphp/view/wsUser.php?id=' + i.toString() )  
   return this.http.get<User>( 'https://virtuax.herokuapp.com/view/wsUser.php?id=' + i.toString() ) 
  }

  atualizaGrupos(): Observable<Grupo[]>  { 
 
    //return this.http.get<Grupo[]>( 'http://localhost:8080/crudphp/view/wsUser.php?id=99999' ) 
    return this.http.get<Grupo[]>(`https://virtuax.herokuapp.com/view/wsUser.php?id=99999` ) 
        .pipe(
          tap((u) => {
                  console.log('atualizaService');
                  let usrs = this.grupoSubject$.getValue();  
          }), 
       
         ) // Pipe 
  }

  atualizaUsers(): Observable<User[]>  { 
 
    //return this.http.get<User[]>( 'http://localhost:8080/crudphp/view/wsUser.php' ) 
    return this.http.get<User[]>(`https://virtuax.herokuapp.com/view/wsUser.php`)      
        .pipe(
          tap((u) => {
                  console.log('atualizaService'); 
          }), 
       
         ) // Pipe 
  }

  delecao(pId:number): Observable<any> { 
 
    //return this.http.delete( 'http://localhost:8080/crudphp/view/wsUser.php?id=' + pId.toString()) 
      return this.http.delete( 'https://virtuax.herokuapp.com/view/wsUser.php?id=' + pId.toString()) 
  
      .pipe( 
        tap((d)=> {
          let usrs = this.userSubject$.getValue();
          let i = usrs.findIndex(d => d.id === pId);
          if (i>=0)
          usrs.splice(i,1);
        }
      ))
  }

 

  update(d: User): Observable<any>  {  
   
    //return this.http.put<User>(`http://localhost:8080/crudphp/view/wsUser.php`,JSON.stringify({ d }) )
     return this.http.put(`https://virtuax.herokuapp.com/view/wsUser.php`,JSON.stringify({ d }) )
     .pipe(
              tap((d) => {
                //let usrs = this.userSubject$.getValue();  
               // console.log('update'); 
               // console.log(usrs); 

              }
          )
     )  
       
   }

 
 
}


