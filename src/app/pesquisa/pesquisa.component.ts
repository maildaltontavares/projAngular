import { Component, Inject, OnInit } from '@angular/core';
import { Grupo } from '../grupo.model';
import {MatDialog, MatDialogConfig , MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { DialogData }   from '../resultado.model'; 
import { GrupoService } from '../grupo.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  aGrupos: Grupo[] =[] ;
  favoriteSeason: string | undefined;
  iGrupo: Grupo[] = [];
  pesqNome="";

  private unsubscribe$: Subject<any> = new Subject();
  private grupos$: Observable<Grupo[]> = new Observable();

  constructor (public dialogRef: MatDialogRef<PesquisaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,private grupoService: GrupoService) {} 

  onNoClick(): void {
    this.dialogRef.close();
  } 

  ngOnInit(): void {   
       console.log('Init'); 
       this.configura();  
  }

  trocaArray(){    
/*
    this.seasons.push({grupo:10,descricao:'Somente leitura',id:1});
    this.seasons.push({grupo:20,descricao:'Acesso total',id:2});
    this.seasons.push({grupo:30,descricao:'Acesso irrestrito',id:3});
    this.seasons.push({grupo:40,descricao:'Acesso de leitura',id:4});
 
*/
 
  }


  configura(): void { 

    console.log('ConfiguraGrupo'); 
    this.grupoService.getGrupos().pipe(takeUntil(this.unsubscribe$)).subscribe((grps) => this.aGrupos = grps); 
    console.log(this.aGrupos);        
  }


  ngOnDestroy() {
    console.log('Unsubscribe');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }

  pesqByNamePag(pPag:number){

    console.log('byName111');  
    console.log(this.pesqNome); 
    
    
    /*
    this.pPagina = (this.pPagina + (pPag*8));

    if(this.pPagina<0){
      this.pPagina=0;
    }
    else{

      if(this.pPagina>16){
        this.pPagina=16;
      }

    }

    console.log(this.pPagina);
*/
    this.grupoService.getByName(this.pesqNome,0).subscribe( 
      (grp) => {
        
        this.aGrupos = grp ;
        console.log('byName2222');  
        console.log(this.aGrupos); 
      
      },
      (err) => console.error(err)) ; 
      console.log(this.aGrupos);   

 }






}
