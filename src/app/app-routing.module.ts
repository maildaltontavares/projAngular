import { NgModule } from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';  
import { CadUsuarioComponent } from './cad-usuario/cad-usuario.component'; 
import { CadastrosComponent } from './cadastros/cadastros.component';
import { PrincipalComponent } from './principal/principal.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { LogonComponent } from './logon/logon.component';

const routes: Routes = [
  {path:'usuario',component:CadUsuarioComponent}, 
  {path:'principal',component: PrincipalComponent}, 
  {path:'relatorio',component: RelatoriosComponent}, 
  {path:'cadastros',component: CadastrosComponent}, 
  {path:'',pathMatch:'full',redirectTo:'auth/login'},
  {path:'login',pathMatch:'full',redirectTo:'auth/login'},
  {path:'registro', redirectTo:'auth/register'},
  
   
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
