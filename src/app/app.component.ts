import { Component, Inject  } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog'; 
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import  {NavService}  from './templates/nav/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean> = new Observable();                // {1}
  
  title = 'santech';
  exibe = true;
  constructor (private matDialog: MatDialog,private authService: AuthService,private NavService: NavService){}   

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  onLogout(){
    this.authService.logout();                      // {3}
  }

  alteraMenu(){
   
     this.NavService.mostraMenu(true); 

  }




}


 


