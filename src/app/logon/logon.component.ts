import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackExemploComponent } from '../snack-exemplo/snack-exemplo.component'; 
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from  '../usuario.model';
import {LoginService} from  '../login.service'
import { DOCUMENT } from '@angular/common';
 

export interface Usr {  
  senha: string;
  email:string;
}

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent implements OnInit {

 
  loginForm: FormGroup = this.fb.group({
    'email': ['', [Validators.required, Validators.email]],
    'senha': ['', [Validators.required, Validators.minLength(1)]],
  });

  userGrava: Usr = {email:'',senha:''};
  pwdCripto: string ='';
  pwdUser = '';

  loading = false;

  constructor(    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router ,
    private _snackBar: MatSnackBar, 
    private loginService: LoginService ,
    @Inject(DOCUMENT) private document: Document
    ) { }

  ngOnInit(): void {
  }



  openSnackBar(msg:string) {
    this._snackBar.open(msg,'', {
            duration: 3000,verticalPosition: 'bottom', 
             horizontalPosition: 'center',
             
           });

    //this._snackBar.openFromComponent(SnackExemploComponent, {
    //   duration: 1000,verticalPosition: 'bottom', // Allowed values are  'top' | 'bottom'
    //  horizontalPosition: 'center',       
    //});

  };

  onSubmit() {
 
      //console.log(this.userGrava.senha);  
      //console.log(this.loginForm.get('email')?.value);

      //

      this.loginService.validaLogin (this.loginForm.get('email')?.value,'').subscribe({
        next: (res) => {
          if (res) {
            console.log('Valida: ' + res.senha);
           
            this.pwdUser = res.senha;

                  this.loginService.cripto (this.loginForm.get('email')?.value,this.loginForm.get('senha')?.value).subscribe({
                    next: (res) => {
                      if (res) {
                            console.log('Cripto >> ' + res.senha); 
                            this.pwdCripto = res.senha;
                            if(this.pwdUser==this.pwdCripto)
                            {
                              console.log(this.router);
                              this.router.navigateByUrl('principal'); 
                            }
                            else
                            {
                              this.openSnackBar('Usuário ou senha incorreto!' );
                              console.log('Senhas não conferem!');
                            } 
                      }
                    }, error: err => {
                      if (err != null  ) {
                        console.log('Erro');
                      }
                    }
                  }); 


          }
        }, error: err => {
          if (err != null  ) {
            console.log('Erro');
          }
        }
      });


    }


}
