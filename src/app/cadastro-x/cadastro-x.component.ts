import { Component, OnInit } from '@angular/core'; 
import { GeraRelatorioService } from '../gera-relatorio.service';
 

@Component({
  selector: 'app-cadastro-x',
  templateUrl: './cadastro-x.component.html',
  styleUrls: ['./cadastro-x.component.css']
})
export class CadastroXComponent implements OnInit {

  vDtIni="";
  vDtFim="";
  constructor(  private relService: GeraRelatorioService ) {   }

  ngOnInit(): void {
  }

  geraReport(){
 
      
    this.relService.geraRelatorio(this.vDtIni,this.vDtFim).subscribe(
      (r) => {  

        const file = new Blob([r], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL,"_self");

        console.error(this.vDtIni);
        console.error(this.vDtFim);
    }
    //(err) => {
    //  console.log('Error no WebService');    
      //console.error(err);
    //}
    
    );
        

  }




}
