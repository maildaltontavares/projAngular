import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 
 
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'; 
import {User} from  './usuario.model';
import { delay, map, tap } from 'rxjs/operators';  
import { SrvRecord } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  //private userSubject$: Subject<User[]> = new Subject<User[]>();

  //public user$ = this.userSubject$.asObservable(); 

  private loaded: boolean = false;
  
  constructor(private http: HttpClient) { }

/*
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:8080/crudphp/view/webServiceGet.php`);
   //return this.http.get<User[]>(`http://localhost:8080/crudphp/view/webServiceGet.php?id=44`);
  }
*/

  getUsers(): Observable<User[]> {

    if (!this.loaded) {

        this.http.get<User[]>(`http://localhost:8080/crudphp/view/webServiceGet.php`)
        //this.http.get<User[]>(`http://virtuax.herokuapp.com/view/webServiceGet.php`)        
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

/*
  store(car: Car): Observable<Car[]>  
     {

       return this.http.post(`${this.baseUrl}/store`, { data: car })
      .pipe(map((res) => {
        this.cars.push(res['data']);
        return this.cars;
      }),
      catchError(this.handleError));
}

*/
  addPost(d: User): Observable<any>  { 
           
       //return this.http.post(`http://localhost:8080/crudphp/view/webServicePost2.php`,JSON.stringify({ d }) )
       
       return this.http.post(`http://localhost:8080/crudphp/view/wsUser.php`,JSON.stringify({ d }) )
        //return this.http.post(`http://virtuax.herokuapp.com/view/wsUser.php`,JSON.stringify({ d }) )
       
        .pipe(
               map(
                    (res) => {  
                              this.userSubject$.getValue().push(d);
                              this.atualizaUsers();   
                             }
                  )
             );
             
        
             
             
          
  }

/*
  addGet(d: User): Observable<User>  {
    return this.http.get<User>( `http://localhost:8080/crudphp/view/webServicePost.php?id=88`)
        .pipe(
          tap((usr: User) => console.log("gETaDD")  ),
          tap((usr: User) => console.log(usr)  ),
          tap((usr: User) => this.userSubject$.getValue().push(usr)),
          //tap((any) => console.log(this.userSubject$.getValue()) ) 
          ) // Pipe 
          
  }

  */

 getByName(pNome:String,pEmail:string): Observable<User[]>  { 

    return this.http.get<User[]>( 'http://localhost:8080/crudphp/view/wsUser.php?nome=' +  pNome + '&email=' + pEmail )  
  
}

  getById(i:number): Observable<User>  {
    console.log(i);
   // return this.http.get<User>( 'http://localhost:8080/crudphp/view/webServiceGet.php?id=' + i.toString() )  

   return this.http.get<User>( 'http://localhost:8080/crudphp/view/wsUser.php?id=' + i.toString() )  
   //return this.http.get<User>( 'http://virtuax.herokuapp.com/view/wsUser.php?id=' + i.toString() ) 
   


        //.pipe(
         // tap((usr: User) => console.log(usr)  ), 
        //  tap((any) => console.log(this.userSubject$.getValue()) ) 
         // tap((any) => console.log( 'ById >>>>' + i.toString()   ))   
        //  ) // Pipe 
  }


  atualizaUsers(): Observable<User[]>  {
    
    //return this.http.get<User[]>( 'http://localhost:8080/crudphp/view/webServiceGet.php' )  
    return this.http.get<User[]>( 'http://localhost:8080/crudphp/view/wsUser.php' ) 
    //return this.http.get<User[]>(`http://virtuax.herokuapp.com/view/webServiceGet.php`)      
        .pipe(
          tap((u) => {
                  console.log('atualizaService');
                  let usrs = this.userSubject$.getValue();  
                  usrs.splice(0,usrs.length);
                  //for (let j = 0; j < usrs.length; j++) { 
                    //console.log(usrs[j]);  
                  // console.log ("Block statement execution no22." + j);
                  // } 
      
                  for (let j = 0; j < u.length; j++) { 
                      usrs.push(u[j]);   
                  }  
          
          }), 
       
         ) // Pipe 
  }

  del(usr: User): Observable<any> { 

    //let body = JSON.stringify({d});  
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {headers: headers}
  
  // this.http.post('http://virtuax.herokuapp.com/view/wsUser.php?id=' + d.id.toString(), body, options)
  //    .subscribe(data => {
  //         console.log(data);
  // });
 
 /*

    let httpParams = new HttpParams().set('aaa', '111');
httpParams.set('bbb', '222');

let options1 = { params: httpParams };
*/ 
    //return this.http.get<User>( 'http://localhost:8080/crudphp/view/webServiceGet.php?id=' + usr.id.toString() )  
    return this.http.delete( 'http://localhost:8080/crudphp/view/wsUser.php?id=' + usr.id.toString())  

    //return this.http.delete( 'http://virtuax.herokuapp.com/view/wsUser.php?id=' + d.id.toString() )  

    //`http://localhost:8080/crudphp/view/wsUser.php`,JSON.stringify({ d }) 

    //return this.http.delete(`${this.url}/${dep._id}`)
      .pipe( 
        tap((d)=> {
          let usrs = this.userSubject$.getValue();
          let i = usrs.findIndex(d => d.id === usr.id);
          if (i>=0)
          usrs.splice(i,1);
        }
      ))
  }
 

  update(usr: User): Observable<User> {
    return this.http.get<User>( 'http://localhost:8080/crudphp/view/webServiceGet.php?id=' + usr.id.toString() )  
      .pipe(
        tap((d) => console.log( usr.nome + ' ==>> ' +  d.nome)),
        tap((d) => d.nome = d.nome + "  Alterado111"),
        tap((d) => {
          let usrs = this.userSubject$.getValue();          
          let i = usrs.findIndex(d => d.id === usr.id);
          if (i>=0)
              usrs[i].nome  = d.nome;
              usrs[i].email = d.email;
        })
      )
  }





}


