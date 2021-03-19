import {ThemePalette} from '@angular/material/core';
export interface Filial {
    nome: string;
    todos: boolean;
    cor: ThemePalette;
    id_usuario: number;
    id_filial:number;
    filiais?: Filial[];
  }