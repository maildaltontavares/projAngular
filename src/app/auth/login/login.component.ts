import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from  '../../usuario.model';
import {LoginService} from  '../../login.service';
 
 

export interface Usr {  
  senha: string;
  email:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

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
    private loginService: LoginService,
      
    ) { }

  ngOnInit(): void {
      //console.log('logout')  ;
      //this.authService.logout();
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
 
     this.authService.login(true);
     
/*     
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
                              this.authService.login(true);
                              //this.router.navigateByUrl('principal'); 
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

*/       

    }



}
