import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService { 
  
  private exibeMenuO = new BehaviorSubject<boolean>(false); // {1} 

  get exibirMenu() {
    return this.exibeMenuO.asObservable(); // {2}
  }
  constructor(
   
    ) {}

    mostraMenu(user: any){
        console.log('mostraMenu');
  
        this.exibeMenuO.next(true);
        console.log(this.exibeMenuO.value);
     
      //}
    }

    escondeMenu() {                            // {4}
      console.log('escondeMenu');
      

      this.exibeMenuO.next(false);
      console.log(this.exibeMenuO.value);

    }

  /*
  private exibeMenu = true; // {1}

  get exibirMenu() {
    console.log('NavService');
    console.log(this.exibeMenu);
    return this.exibeMenu; // {2}
  }

  constructor(
   
  ) {}

  mostraMenu(){
      console.log('mostraMenu');
      this.exibeMenu = true;
      console.log(this.exibeMenu);
  }

  escondeMenu() {                            // {4}
    console.log('escondeMenu');
    this.exibeMenu = false;
    console.log(this.exibeMenu);
  }

*/
}
