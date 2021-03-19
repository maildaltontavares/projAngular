 
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Grupo } from '../../grupo.model';
import { DialogContentExampleDialogComponent} from '../../dialog-content-example-dialog/dialog-content-example-dialog.component';   
import {MatDialog, MatDialogConfig , MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackExemploComponent } from '../../snack-exemplo/snack-exemplo.component'; 
import { PesquisaComponent } from '../../pesquisa/pesquisa.component'; 
import { GrupoDescService } from '../../grupo-desc.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
}) 

export class GrupoComponent implements OnInit { 

  @Input() grupo: Grupo | any;
 
  @Output() updateGrupo = new EventEmitter<Grupo>();
  @Output() removeGrupo = new EventEmitter<any>();
  
  private unsubscribe$: Subject<any> = new Subject();
  onEdit: boolean = false;

  vGrupo1=0;
  vDescricao1=""; 
  vId=0;
  vExcluir = false;

  //vDescGrupo:Grupo = {id:0,descricao:""}
  vDescGrupo:Grupo[] =[];
 

  vResultado="";  
  vDesc="";  

  constructor(public dialog: MatDialog ,private _snackBar: MatSnackBar,private grupoDescService: GrupoDescService 
    ) { }

  ngOnInit(): void {
       this.vGrupo1 = this.grupo.id;
      
       this.vId = this.grupo.id; 
      /* this.grupoDescService.getDescGrupos().pipe(takeUntil(this.unsubscribe$)).subscribe((grps) => 
       {
         this.vDescGrupo  = grps;
         console.log(this.vDescGrupo);
      }); 
*/
      this.grupoDescService.getGrupoById(this.grupo.id).pipe(takeUntil(this.unsubscribe$)).subscribe((grps) => 
      {
        this.vDescGrupo  = grps;
        console.log(this.vDescGrupo);
     });      
 
    
     this.vDescricao1 = this.grupo.descricao; 
     

  }

 /*
  edit() {
    this.onEdit = true;
    this.vGrupo1 = this.grupo.id;
    this.vDescricao1 = this.grupo.descricao; 
    this.vId = this.grupo.id;
  }
*/
  remove() {
    console.log('remove');
    this.removeGrupo.emit();
  }

  save() {
    this.onEdit = false;
      this.updateGrupo.emit(
       {id:this.vId, descricao: this.vDescricao1 }
    )
    ;
  }

  focusOutFunction(event:any) { 

        console.log("You entered: ", event.target.value );  

        this.vId = event.target.value;
        this.vDescricao1 = "";

        this.grupoDescService.getGrupoById(this.vId).pipe(takeUntil(this.unsubscribe$)).subscribe((grps) => 
        {
          console.log('this.vDescGrupo');
          console.log(this.vId);  
          this.vDescGrupo  = grps;
          console.log(this.vDescGrupo);
      });  

      
      this.updateGrupo.emit(
        {id:this.vId , descricao:this.vDescricao1}
     ) ;     

  }

  focusOutFunctionK(event: { target: { value: any; }; }) {
    this.vId = event.target.value;
    console.log("You entered: ", event.target.value);  
  }

  openDialog3() {

    //this.vExcluir=true;

    
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);
   
    dialogRef.afterClosed().subscribe(result => 
      {
        //console.log('The dialog was closed');    
        console.log(result);
        if(result){ 
              console.log('Aqui'); 
              this.remove();
              this.openSnackBar('Registro gravado com sucesso!' );
            } 
 
      } 
    );
      
  }


  openSnackBar(msg:string) {
    //this._snackBar.open(msg);
    this._snackBar.openFromComponent(SnackExemploComponent, {
      duration: 2000,verticalPosition: 'bottom', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center'
    }
    );
  };


  pesqDialog() {

    //this.vExcluir=true;

    
    const dialogRef = this.dialog.open(
      PesquisaComponent , {
      width: '450px',
      height: '550px',
      data: {resultado: this.vResultado,descGrp: this.vDesc} 
      }
    ); 
   
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);   

      this.vId = result;  

        this.grupoDescService.getGrupoById(this.vId).pipe(takeUntil(this.unsubscribe$)).subscribe((grps) => 
        {
          console.log('this.vDescGrupo');
          console.log(this.vId);  
          this.vDescGrupo  = grps;
          console.log(this.vDescGrupo);
       }); 


     //this.vDescricao1 = this.vDescGrupo.descricao;       

      this.updateGrupo.emit(
        {id:this.vId , descricao: this.vDesc} //
     )
   
      if(result){ 
        console.log('Aqui pESdIALOG');   
        //this.openSnackBar('Registro gravado com sucesso!' );
      } 


    });


/*
    dialogRef.afterClosed().subscribe(result => 
      {
        //console.log('The dialog was closed');    
   
        if(result){ 
              console.log('Aqui'); 
        
              this.openSnackBar('Registro gravado com sucesso zzzz!' );
            } 
 
      } 
    );
  
    */

  }
 



}



