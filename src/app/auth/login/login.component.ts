import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from  '../../usuario.model';
import {LoginService} from  '../../login.service'
 

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
    'senha': ['', [Validators.required, Validators.minLength(6)]],
  });

  userGrava: Usr = {email:'',senha:''};

  loading = false;

  constructor(    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router ,
    private snackBar: MatSnackBar, 
    private loginService: LoginService 
    ) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
 
      //console.log(this.userGrava.senha);  
      //console.log(this.loginForm.get('email')?.value);


      this.loginService.validaLogin (this.loginForm.get('email')?.value,this.loginForm.get('senha')?.value).subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
          }
        }, error: err => {
          if (err != null  ) {
            console.log('Erro');
          }
        }
      });



  } 



}
