import { Component, OnInit } from '@angular/core';
import { RelServiceService } from '../rel-service.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {
  vDtIni="";
  vDtFim="";
  constructor(private relService: RelServiceService ) { }

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
