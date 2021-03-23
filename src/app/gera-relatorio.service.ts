import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})

export class GeraRelatorioService {  

  
vPdf:any;

constructor(
  private http: HttpClient, 
  
  ) { }   

geraRelatorio(pDtIni:string,pDtFim:string){  
      const httpOptions = {
        //responseType: 'arraybuffer' as 'json'
         'responseType'  : 'blob' as 'json'
        }; 

  //return this.http.get<any>( `http://localhost:8080/crudphp/view/wsRelatorio.php?dt_leitura_inicial=01/01/2020&dt_leitura_final=20/12/2021`, httpOptions);     
  return this.http.get<any>( `https://virtuax.herokuapp.com/view/wsRelatorio.php?dt_leitura_inicial=01/01/2020&dt_leitura_final=20/12/2021`, httpOptions);     
  
  

}



}



 
