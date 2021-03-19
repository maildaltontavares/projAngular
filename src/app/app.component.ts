import { Component, Inject  } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'santech';
  constructor (private matDialog: MatDialog){}   

}
