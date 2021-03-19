import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog"; 
import {
  MAT_DIALOG_DATA
} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  //template: "<h1>Dialog body component</h1>",
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent implements OnInit { 

  deleta = false; 
  ngOnInit(): void {
  } 

  constructor( public dialogRef: MatDialogRef<DialogBodyComponent>){
    this.dialogRef.updateSize('300vw','300vw') ;
 
  } 

  confirma(){
    this.deleta = true;
    console.log(this.deleta);
    this.close();
  }

  cancela(){
    this.deleta = false;
    console.log(this.deleta);
    this.close();
  }


  close() {
    this.dialogRef.close();
  }


}
 