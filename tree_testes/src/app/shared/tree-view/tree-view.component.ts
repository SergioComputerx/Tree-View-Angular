import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Output} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { FoodNode } from '../foodNode';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */


const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    description: 'Fruits are very important to health',
    children: [
      {name: 'Apple', description: 'apple description'}, 
      {name: 'Banana',  description: 'banana description'},
      {name: 'Fruit loops',  description: 'Fruit loops description'}
    ],
  },
  {
    name: 'Vegetables',
    description: 'Vegetables are very important to health',
    children: [
      {
        name: 'Green',
        description: 'green description',
        children: [
          {name: 'Broccoli', description: 'apple description'},
          {name: 'Brussels sprouts', description: 'apple description'}
        ]
      },
      {
        name: 'Orange',
        description: 'orange description',
        children: [
          {name: 'Pumpkins', description: 'Pumpkins description'}, 
          {name: 'Carrots',  description: 'Pumpkins description'}
        ],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  description: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
})
export class TreeViewComponent {


  @Output()  noClicadoEvent = new EventEmitter<FoodNode>();
  
  noClicado: any;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      description: node.description,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  noClicadoClickEvent(node: FoodNode){

    this.noClicado = node;

    //caso seja consumido externamente
    this.noClicadoEvent.emit(this.noClicado);
  }
}
