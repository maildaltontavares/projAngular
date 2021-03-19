import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-snack-exemplo',
  templateUrl: './snack-exemplo.component.html',
  styleUrls: ['./snack-exemplo.component.css']
})
export class SnackExemploComponent implements OnInit {

  @Input() pMsg="Operação realizada com sucesso!";

  constructor() { }

  ngOnInit(): void {
  }

}
