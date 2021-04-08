import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../user.service';
import { FilialUsuarioService } from '../filial-usuario.service';
import { FilialService } from '../filial.service';
import { User } from '../usuario.model';
import { Grupo } from '../grupo.model'; 
import { Filial } from '../filial.model'; 
import { FilialUsuario } from '../filialUsuario.model'; 
import { SnackExemploComponent } from '../snack-exemplo/snack-exemplo.component'; 
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DialogContentExampleDialogComponent } from '../dialog-content-example-dialog/dialog-content-example-dialog.component';   
import { FormBuilder,Validators ,FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
 
 

@Component({
  selector: 'app-cad-usuario',
  templateUrl: './cad-usuario.component.html',
  styleUrls: ['./cad-usuario.component.css']
}) 

export class CadUsuarioComponent implements OnInit { 

  onEdit: boolean = false;
  aUsers: User[] =[] ;
  aUsers1: User[] =[] ;  
  aGrupo: Grupo[]= [];
  aGrupoGrava: Grupo[]= [];  
  userGrava: User | undefined;  
  displayedColumns: string[] = ['editar','id', 'nome','email' ];
  aNumber: number[] = [1,2,3];
  dataSource = new MatTableDataSource<User>(this.aUsers);
  vNome ="";
  vEmail ="";
  vPwd="";
  vFilialPad="";
  vResult = "Nada";
  vId: number =0;
  subscription1: Subscription | undefined;
  pesqNome="";
  pesqEmail="";
  pMsg="";
  vExcluir=false;
  pPagina = 0;
  vUser: User | undefined;
  aDescGrupos:string[] = [];
  aCodGrupos:string[] = [];
  private unsubscribe$: Subject<any> = new Subject();
  private users$: Observable<User[]> = new Observable();
  usrEdit: User | undefined; 
  onAdd: boolean = false;
  onAlt: boolean = false; 
  userForm = this.fb.group({});    
  
  todasFiliais: Filial[] = [];

  aCodFilial:Filial  = {
    nome: '',
    todos: false,
    cor: 'warn',
    id_usuario:0,
    id_filial:0,
    filiais: []
  };
 
  filial: Filial = {
    nome: 'Selecionar todas',
    todos: false,
    cor: 'warn',
    id_usuario:10,
    id_filial:2,
    filiais: this.todasFiliais
  };
  
 
  selected = 'Santana'; 
  vFiliaisUsu:FilialUsuario[]=[];
  /*
    {id:1,nome:  'Santana'},
    {id:2,nome:  'Nortex'},    
    {id:8,nome:  'Textiles'}    
  
  ];
*/
  //aCodFilial: Filial=;
 
  vNum: string="";



  allComplete: boolean = false;
  todosMarcados: boolean = false;
   
  constructor(

    private usersService: UserService ,
    private filUserService: FilialUsuarioService,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private filService: FilialService,
    
    ) { }
  
 
  ngOnInit(): void {  
    console.log('Init'); 
    this.configura();  
  } 

  ngAfterViewInit() {
 
  }

  atualizaTodosChk(){
    this.todosMarcados = this.filial.filiais != null && this.filial.filiais.every(t => t.todos);
  } 

  marcaParcialChk(){
    if (this.filial.filiais == null) {
      return false;
    }
    return this.filial.filiais.filter(t => t.todos).length > 0 && !this.todosMarcados;

  }  

  marcaTodos(pCompleta: boolean) {
    this.todosMarcados = pCompleta;
    if (this.filial.filiais == null) {
      return;
    }
    this.filial.filiais.forEach(t => t.todos = pCompleta);
  } 

  insereAgrupos() {
    this.aGrupo.push({id:0 , descricao:''});
  }  

  deleteGrupo(i: any) {
    this.aGrupo.splice(i, 1);
  }

  updateGrupo( g: Grupo, i:any) {
    console.log('updateGrupo()');
    console.log(g); 
    this.aGrupo[i].id = g.id;
    this.aGrupo[i].descricao = g.descricao; 
  }


  limpaPesq(){
    this.pesqNome="";
    this.pesqEmail="";
    this.atualizaUsers();

  }

  
  openDialog2(pId:number) {

    this.vExcluir=true;

    this.pMsg="Registro excluido com sucesso!";
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);
    
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');    
      console.log(result);
      if(result){ 
        console.log('Aqui');
     //   this.openSnackBar('Registro gravado com sucesso!' );

 
        this.usersService.delecao(pId).subscribe(
          (usr) => {
 
           this.openSnackBar('Registro gravado com sucesso!' );
          },
          (err) => console.error(err)) ; 
 
      }
      this.vExcluir=false;
    });
        
  }

  configura(): void { 

    console.log('Configura'); 
    this.usersService.getUsers().pipe(takeUntil(this.unsubscribe$)).subscribe((usrs) => this.aUsers = usrs); 
    this.usersService.getGrupos().pipe(takeUntil(this.unsubscribe$)).subscribe((grps) => this.aGrupo = grps); 
    this.filUserService.getUsuarioFilial().pipe(takeUntil(this.unsubscribe$)).subscribe((filiais) => this.filial.filiais = filiais); 
    this.filService.getFilial().pipe(takeUntil(this.unsubscribe$)).subscribe((filiais) => this.vFiliaisUsu = filiais);   
   
  
  }

  ngAfterContentInit(){} 

  ngAOnChanges(){}

  onSubmit(){
        console.log('METODO SUBMIT');
        if(!this.vExcluir){
          this.save();
        }        
  }     

  addUser(){

    this.configuraFormUser(null); 
    
    this.onEdit = true;
    this.onAdd   = true;
    
    
    this.usersService.getGrupoById(999).subscribe(
      (grp) => {  
        this.aGrupo = grp;   
    },
    (err) => console.error(err)) ;     
      

    this.filUserService.getUsuarioFilialById(9999).subscribe(
      (filiais) => {  
        this.filial.filiais = filiais;          
        console.log('GFiliaisUsuarioById'); 
        console.log(this.filial.filiais);           
    },
    (err) => console.error(err)) ;      

       
  }
   
  openSnackBar(msg:string) {
    //this._snackBar.open(msg);
    this._snackBar.openFromComponent(SnackExemploComponent, {
      duration: 1000,verticalPosition: 'bottom', // Allowed values are  'top' | 'bottom'
      horizontalPosition: 'center'
    }
    );
  };
 

  save() { 
    
    console.log('this.aGrupoGrava'); 
    this.aGrupoGrava = this.aGrupo;
    console.log(this.aGrupoGrava); 
    
    var i=0;  
    this.aCodGrupos=[];
    while (i < this.aGrupoGrava.length){ 
 
         if(this.aGrupoGrava[i].id !==0) {
             this.aCodGrupos.push(this.aGrupoGrava[i].id.toString());
         }
        console.log("Descricao: " + this.aGrupoGrava[i].descricao);
        i++;

    } 
    //console.log(this.aCodGrupos);
    console.log(this.vId);

    //Alteração

    i=0; 

    this.aCodFilial.filiais=this.filial.filiais;
    console.log('this.aCodFilial.filiais');
    console.log(this.aCodFilial.filiais );  

    if ( this.onAlt || !this.vExcluir) {   
            
      console.log('Altera');

      this.userGrava = {filiais:this.aCodFilial,grupos:this.aCodGrupos ,id:this.vId,nome: this.userForm.get('vNome')?.value,senha:this.userForm.get('vPwd')?.value,email:this.userForm.get('vEmail')?.value,tel:"999",filpad:this.userForm.get('vFilialPad')?.value } ;
      console.log(this.userGrava); 

      this.usersService.update(this.userGrava)
 
        .subscribe(
          (usr) => { 
            console.log(usr);   
            //console.log(this.vId);        

          },
          (err) => {
            console.log('Error no WebService');    
            //console.error(err);
          }); 
    
    }
  
    this.userGrava = {filiais:this.aCodFilial,grupos:this.aCodGrupos ,"id":0,"nome": this.userForm.get('vNome')?.value,"senha":this.userForm.get('vPwd')?.value,"email":this.userForm.get('vEmail')?.value,"tel":"999","filpad":this.userForm.get('vFilialPad')?.value };
    //console.log(this.userGrava); 

    //Inclusão
    if( this.onAdd) {
      this.usersService.addPost(this.userGrava)
        .subscribe(
          (usr) => { 
          
            console.log('Updated addPOST!');            
          },
          (err) => {
            console.log('Error no WebService');    
            //console.error(err);
          });  
     
  }
  this.pMsg="Registro gravado com sucesso!";
  this.openSnackBar('Registro gravado com sucesso!' );  

} 

  cancel(){

    this.userForm.reset();  
    this.onEdit = false;    
    this.onAdd   = false;    
    this.onAlt  = false;
    this.limpaCampos(); 
    this.atualizaUsers();
    this.atualizaGrupos();
  }

  limpaCampos(){
    this.onEdit = false;
    this.vId=0;
    this.pPagina = 0;
 
   }

   pesqByNamePag(pPag:number){
    
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

    this.usersService.getByName(this.pesqNome,this.pesqEmail,this.pPagina).subscribe( 
      (usrs) => { this.aUsers = usrs },
      (err) => console.error(err)) ; 

 }

   pesqByName(){
     this.pPagina = 0;
      this.usersService.getByName(this.pesqNome,this.pesqEmail,0).subscribe( 
        (usrs) => { this.aUsers = usrs },
        (err) => console.error(err)) ; 

   } 

   atualizaGrupos(){

        this.usersService.getGrupoById(999).subscribe(
          (grp) => {  
            this.aGrupo = grp;   
        },
        (err) => console.error(err)) ; 
  }

   atualizaUsers(){ 

    this.usersService.atualizaUsers().subscribe( 
      (usrs) => { 
          this.aUsers = usrs;
      }
      //,
      //(err) => console.error(err)
      ) ; 

      this.pesqNome="";
      this.pesqEmail="";  
   }

  configuraFormUser(u1:any = null){
    
    console.log('ConfiguraForm');
    console.log(u1);


    if(u1){

          this.userForm = this.fb.group(
            {
              vNome:[u1.nome,  [ Validators.required, Validators.minLength(5)]], //, Validators.pattern("^[a-zA-Z]+$") 
              vPwd:[u1.senha,[Validators.required]],
              vEmail:[u1.email,[Validators.required, Validators.email]],
              vFilialPad:[u1.filpad,[Validators.required]],
        
            } );  
    }
    else{
      this.userForm = this.fb.group(
        {
          vNome:['',  [ Validators.required, Validators.minLength(5)]], //, Validators.pattern("^[a-zA-Z]+$") 
          vPwd:['',[Validators.required]],
          vEmail:['',[Validators.required, Validators.email]],    
          vFilialPad:[0,[Validators.required]],
        } );  

    }

  }  

   editUser(u1:any){       

     this.onEdit = true;
     this.onAlt  = true;
   
    this.configuraFormUser(u1); 

    this.usersService.getById(u1.id).subscribe(
    (usr) => { 
 
      this.vId=usr.id;
      console.log('ById'); 
      console.log(usr); 
    },
    (err) => console.error(err)) ; 

    
    this.usersService.getGrupoById(u1.id).subscribe(
      (grp) => {  
        this.aGrupo = grp;          
        console.log('GrupoById'); 
        console.log(this.aGrupo);           
    },
    (err) => console.error(err)) ;   


    this.filUserService.getUsuarioFilialById(u1.id).subscribe(
      (filiais) => {  
        this.filial.filiais = filiais;          
        console.log('GFiliaisUsuarioById'); 
        console.log(this.filial.filiais);           
    },
    (err) => console.error(err)) ;   
 
   } 

delecao(pId:number){       
     
  this.usersService.delecao(pId).subscribe(
   (usr) => { 
    this.openSnackBar('Registro gravado com sucesso!' );
   },
   (err) => console.error(err)) ;   
   
}    
 
  ngOnDestroy() {
    console.log('Unsubscribe');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }

}
