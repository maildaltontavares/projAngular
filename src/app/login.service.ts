import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'; 
 
export interface loginUsr { 
  nome:string;
  email:string; 
  senha: string;  
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  usr: loginUsr = {senha:'',email:'',nome:''};

  constructor(private http: HttpClient) { }

  validaLogin(pEmail: string, pPwd: string) {
    //return this.http.post<Profissional>(`${this.urlLocal + `insereProfissional`}`, profissional);
    //return this.http.post<loginUsr>(`http://localhost:8080/crudphp/view/wsLogin.php`, {"nome": "","email": pEmail,senha:""}  )
    return this.http.post<loginUsr>(`https://virtuax.herokuapp.com/view/wsLogin.php`, {"nome": "","email": pEmail,senha:""}  )
  }

  cripto(pEmail: string, pPwd: string) { 

    const headers = new HttpHeaders() 
      .append('Access-Control-Allow-Origin', '*')
      .append('AddHeader', '*');  

    console.log('Enviando para a criptografia...');

    //return this.http.post<loginUsr>(`http://localhost:3000/auth_cript`, {"nome": "","email": pEmail,"senha":pPwd},  {headers}  ) 
     
    return  this.http.post<loginUsr>(`https://nodesantechs.herokuapp.com/auth_cripto`, {"nome": "","email": pEmail,"senha":pPwd},  {headers}  );
  }
  
   


}
