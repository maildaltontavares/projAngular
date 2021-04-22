import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'; 
 
export interface loginUsr {  
  senha: string;
  email:string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  usr: loginUsr = {senha:'',email:''};

  constructor(private http: HttpClient) { }

  validaLogin(pEmail: string, pPwd: string) {
    //return this.http.post<Profissional>(`${this.urlLocal + `insereProfissional`}`, profissional);
    return this.http.post<loginUsr>(`http://localhost:8080/crudphp/view/wsLogin.php`, { email:   pEmail , senha:   pPwd   }  )
  }
  



}
