import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadUsuarioComponent } from './cad-usuario/cad-usuario.component';
import { CadastroXComponent } from './cadastro-x/cadastro-x.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path:'usuario',component:CadUsuarioComponent},
  {path:'producao',component: CadastroXComponent},
  {path:'principal',component: PrincipalComponent},
 
  {path:'',pathMatch:'full',redirectTo:'principal'}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
