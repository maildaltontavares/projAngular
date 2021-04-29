import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';  
import { CadUsuarioComponent } from './cad-usuario/cad-usuario.component'; 
import { CadastrosComponent } from './cadastros/cadastros.component';
import { PrincipalComponent } from './principal/principal.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { LogonComponent } from './logon/logon.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'usuario',component:CadUsuarioComponent, canActivate: [AuthGuard] }, 
  {path:'principal',component: PrincipalComponent, canActivate: [AuthGuard] }, 
  {path:'relatorio',component: RelatoriosComponent, canActivate: [AuthGuard] }, 
  {path:'cadastros',component: CadastrosComponent, canActivate: [AuthGuard] }, 
  {path:'',pathMatch:'full',redirectTo:'auth/login'},
  {path:'login',pathMatch:'full',redirectTo:'auth/login'},
  {path:'registro', redirectTo:'auth/register', canActivate: [AuthGuard] },
  
   
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
