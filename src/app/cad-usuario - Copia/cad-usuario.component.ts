 
import { Component, OnInit } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { publish, take, takeUntil, tap, toArray } from 'rxjs/operators';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { UserService } from '../user.service';
import { User } from '../usuario.model';
import { PeriodicElement } from '../periodicelement.model';
import { SnackExemploComponent } from '../snack-exemplo/snack-exemplo.component'; 


import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DialogContentExampleDialogComponent } from '../dialog-content-example-dialog/dialog-content-example-dialog.component';   
import { FormBuilder } from '@angular/forms';
 
/*
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
*/
 

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
}) 


export class CadUsuarioComponent implements OnInit {

  simpleReqUsersObs$: Observable<User[]> | undefined;
  //simpleReqUsersObs$: Subject<any> = new Subject();
  onEdit: boolean = false;
  aUsers: User[] =[] ;
  aUsers1: User[] =[] ; 
  
  //displayedColumns: string[] = ['id', 'nome', 'email', 'editar'];
  //dataSource = ELEMENT_DATA;

  vNome ="";
  vEmail ="";
  vResult = "Nada";
  vId: number =0;
  subscription1: Subscription | undefined;
  pesqNome="";
  pesqEmail="";
  pMsg="";


  private unsubscribe$: Subject<any> = new Subject();
  private users$: Observable<User[]> = new Observable();

  usrEdit: User | undefined; 
  onAdd: boolean = false;
  onAlt: boolean = false; 

  userForm = this.fb.group(
    {
      fbNome:[''],
      fbEmail:[''],

    }
  );



  constructor(private usersService: UserService,private _snackBar: MatSnackBar,private matDialog: MatDialog,public dialog: MatDialog,private fb: FormBuilder) { }
 
  //,private _snackBar: MatSnackBar
  ngOnInit(): void { 

  
    console.log('Init');

    this.configura();

    //this.simpleReqUsersObs$ = this.usersService.getUsers().pipe(takeUntil(this.unsubscribe$));  // Dessa maneira teria que tirar o async do HTML

    //this.usersService.getUsers().pipe(takeUntil(this.unsubscribe$)).subscribe((usrs) => this.aUsers = usrs); 

        //this.usersService.getUsers().subscribe(users=>console.log(users));
        //this.simpleReqUsersObs$ = this.usersService.getUsers();   --- ok
        //this.subscription1 = this.usersService.getUsers().pipe(toArray()).subscribe(console.log); 
        //console.log(this.aUsers1);
        //console.log(this.aUsers);
        //console.log(this.subscription1 );
        
  }

  mostraPesq(){
      console.log(this.pesqNome);
  }
  limpaPesq(){
    this.pesqNome="";
    this.pesqEmail="";
    this.atualizaUsers();

  }

  confirmaDel(){
     this.vResult = 'Confirma';
     console.log(this.vResult);
 
  } 
 

  openDialog1() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data"; 
    this.matDialog.open(DialogBodyComponent, dialogConfig);  
  } 
 
  openDialog(u1:any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');    
      console.log(result);
      if(result){ 
        this.usersService.del(u1).subscribe(
          (usr) => {
            //this.vNome=usr.nome;
            //this.vEmail=usr.email;
           //this.vId=usr.id;
           // console.log('ById'); 
           // console.log(usr); 
          },
          (err) => console.error(err)) ;   
      }

    });
        
  }
  

  openDialog2(pId:number) {
    this.pMsg="Registro excluido com sucesso!";
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');    
      console.log(result);
      if(result){ 
        console.log(pId);
     //   this.openSnackBar('Registro gravado com sucesso!' );

 
        this.usersService.delecao(pId).subscribe(
          (usr) => {
            //this.vNome=usr.nome;
            //this.vEmail=usr.email;
           //this.vId=usr.id;
           // console.log('ById'); 
           // console.log(usr); 
           this.openSnackBar('Registro gravado com sucesso!' );
          },
          (err) => console.error(err)) ; 
 
      }

    });
        
  }
  configura(): void { 

    console.log('Configura'); 
    this.usersService.getUsers().pipe(takeUntil(this.unsubscribe$)).subscribe((usrs) => this.aUsers = usrs); 
    // this.aUsers1 = this.aUsers;  Não Funciona         
  }

  ngAfterContentInit(){  } 

  ngAOnChanges(){  }

  onSubmit(){  }   

  addUser(){
    this.onEdit = true;
    this.vNome="";
    this.vEmail=""; 
    this.onAdd   = true;   

    //this.aUsers1 = [];
    //this.users$ = this.usersService.user$;   Caso queira usar o asynch;

    //console.log('this.aUsers');
    //console.log(this.aUsers);

    //this.aUsers1 = this.aUsers;

    //console.log('this.aUsers1 antes inserção');
    //console.log(this.aUsers1); 
 
    //this.aUsers.push({id:1000,nome: 'OKAPA33',senha:"AAA",email:'Mail',tel:"999",filpad:2});
    //this.aUsers.push({id:1001,nome: 'OKAPA44',senha:"AAA2",email:'Mail2',tel:"9992",filpad:2});

    //this.aUsers1.push({id:1000,nome: 'OKAPA',senha:"AAA",email:'Mail',tel:"999",filpad:2});
    //this.aUsers1.push({id:1001,nome: 'OKAPA2',senha:"AAA2",email:'Mail2',tel:"9992",filpad:2});


    //console.log('this.aUsers1 depois inserção');
   // console.log(this.aUsers1); 

  }
   
  openSnackBar(msg:string) {
    //this._snackBar.open(msg);
    this._snackBar.openFromComponent(SnackExemploComponent, {
      duration: 2000,verticalPosition: 'bottom', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center'
    }
    );
  };
 

  save() {

    //Alteração
    if ( this.onAlt) {  
 
      this.usersService.update(
        {id:this.vId,nome: this.vNome,senha:"AAA",email:this.vEmail,tel:"999",filpad:2} )
 
        .subscribe(
          (usr) => { 
            console.log('Call update');   
            console.log(this.vId);            
            console.log(this.vNome); 
            console.log(this.vEmail);     

          },
          (err) => {
            console.log('Error');    
            console.error(err);
          }); 
    
    }
  
    //Inclusão
    if( this.onAdd) {
      this.usersService.addPost(
        {"id":0,"nome": this.vNome,"senha":"AAA","email":this.vEmail,"tel":"999","filpad":2})
        .subscribe(
          (usr) => { 
          
            console.log('Updated addPOST!');            
          },
          (err) => {
            console.log('Error');    
            console.error(err);
          });  
     
  }
  this.pMsg="Registro gravado com sucesso!";
  this.openSnackBar('Registro gravado com sucesso!' );
  //this.onAdd   = false;
  //this.onAlt  = false;
  //this.limpaCampos(); 
}
 


 
  cancel(){
    this.onEdit = false;
    
    this.onAdd   = false;    
    this.onAlt  = false;
    this.limpaCampos(); 


    this.atualizaUsers();
  }

   limpaCampos(){
    this.onEdit = false;
    this.vNome="";
    this.vEmail=""; 
    this.vId=0;
 
   }

   pesqByName(){
    
      this.usersService.getByName(this.pesqNome,this.pesqEmail).subscribe( 
        (usrs) => { },
        (err) => console.error(err)) ; 

   }


   atualizaUsers(){

    //this.configura();  


    this.usersService.atualizaUsers().subscribe( 
      (usrs) => { }
      //,
      //(err) => console.error(err)
      ) 
      ; 

      this.pesqNome="";
      this.pesqEmail="";
 
 

   }

   editUser(u1:any){       
     this.onEdit = true;
     this.onAlt   = true;
     this.usersService.getById(u1.id).subscribe(
      (usr) => {
        this.vNome=usr.nome;
        this.vEmail=usr.email;
        this.vId=usr.id;
        console.log('ById'); 
        console.log(usr); 
      },
      (err) => console.error(err)) ;   
 
   } 

delecao(pId:number){       
     
  this.usersService.delecao(pId).subscribe(
   (usr) => {
     //this.vNome=usr.nome;
     //this.vEmail=usr.email;
    //this.vId=usr.id;
    // console.log('ById'); 
    // console.log(usr); 
    this.openSnackBar('Registro gravado com sucesso!' );
   },
   (err) => console.error(err)) ;   
   
}    

   del(u1:any){       
     
    this.usersService.del(u1).subscribe(
     (usr) => {
       //this.vNome=usr.nome;
       //this.vEmail=usr.email;
      //this.vId=usr.id;
      // console.log('ById'); 
      // console.log(usr); 
     },
     (err) => console.error(err)) ;   

  }    


  ngOnDestroy() {
    console.log('Unsubscribe');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }

}
