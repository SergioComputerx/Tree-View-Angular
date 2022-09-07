import { Component } from '@angular/core';
import { FoodNode } from './shared/foodNode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'tree_testes';

  noClicado: FoodNode | undefined;

  constructor(){
  
  }

  recebeNoClicadoTree(node: FoodNode){

    this.noClicado = node;

  }
}
