import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService} from '../auth/auth.service' 


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router
  ){ }
  
 /* 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn;
  }
*/
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> 
  {
    return this.authService.isLoggedIn         // {1}
      .pipe
      (
         
        take(1),                              // {2} 
        
        map((isLoggedIn: boolean) => 
           {         // {3}
              if (!isLoggedIn){
                this.router.navigate(['login']);  // {4}
                return false;
              }
              console.log( 'Auth.Guard');
              return true;
           }
        
        )

        
      )
  }
  
}
