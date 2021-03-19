import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadUsuarioComponent } from './cad-usuario/cad-usuario.component';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';  
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatTableModule} from '@angular/material/table';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogContentExampleDialogComponent } from './dialog-content-example-dialog/dialog-content-example-dialog.component';
import { SnackExemploComponent } from './snack-exemplo/snack-exemplo.component';   
import { ReactiveFormsModule } from '@angular/forms';
import { GrupoComponent } from './cad-usuario/grupo/grupo.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Md5} from 'ts-md5/dist/md5';
import { CadastroXComponent } from './cadastro-x/cadastro-x.component';
import { PrincipalComponent } from './principal/principal.component'; 

@NgModule({
  declarations: [
    AppComponent,
    CadUsuarioComponent,
    DialogBodyComponent,
    DialogContentExampleDialogComponent,
    SnackExemploComponent,
    GrupoComponent,
    PesquisaComponent,
    CadastroXComponent,
    PrincipalComponent 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule ,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule ,
    MatToolbarModule,
    MatMenuModule ,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSidenavModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
