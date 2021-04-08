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
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { StoreModule} from '@ngrx/store';
import { appReducers} from './store';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { PersonComponent } from './cadastros/person/person.component';
import { PrincipalComponent } from './principal/principal.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import {StoreDevtoolsModule}   from '@ngrx/store-devtools';
import { AuthModule } from './auth/auth.module';   

@NgModule({
  declarations: [
    AppComponent,
    CadUsuarioComponent,
    DialogBodyComponent,
    DialogContentExampleDialogComponent,
    SnackExemploComponent,
    GrupoComponent,
    PesquisaComponent,
    CadastrosComponent,
    PersonComponent,
    PrincipalComponent,
    RelatoriosComponent 

    
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
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({maxAge:25}),
    AuthModule,


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
