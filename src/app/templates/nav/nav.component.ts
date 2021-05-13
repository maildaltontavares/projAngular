import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService} from  '../../auth/auth.service'
import { NavService} from '../nav/nav.service'; 

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  exibe: Boolean = false;
  isLoggedIn$: Observable<boolean> = new Observable();   
  exibeMenu$: Observable<boolean> = new Observable();  
  estilo: any;

  constructor( 
    private authService: AuthService,
    private navService: NavService,
  ) { }

  ngOnInit(): void {
      this.isLoggedIn$ = this.authService.isLoggedIn;
      this.exibeMenu$  = this.navService.exibirMenu;
      
      console.log('this.navService.exibirMenu');
      console.log(this.navService.exibirMenu);
      //this.estilo= this.navService.exibirMenu;

  }

  onLogout(){
    this.authService.logout();                      // {3}
  }

  alteraEstilo(){
    //this.estilo= !this.estilo; 
    //this.estilo= 
    console.log(this.exibeMenu$);
    this.navService.escondeMenu();
  }

  exibeMenu(){
    //this.estilo= !this.estilo; 
    //this.estilo= 
     
    this.navService.mostraMenu(true);
  }



}
