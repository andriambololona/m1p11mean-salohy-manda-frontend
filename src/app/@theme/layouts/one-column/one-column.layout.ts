import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ExampleFlatNode, FoodNode,TREE_DATA_CLIENT, TREE_DATA_EMPLOYE, TREE_DATA_MANAGER} from './tree.menu';
import { TokenStorageService } from 'src/app/@core/services/token-storage.service';
import { HttpResponse } from '@angular/common/http';




@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl:'./one-column.layout.html',
})
export class OneColumnLayoutComponent implements OnInit{
  showFiller = false;
  currentAuth:HttpResponse<any>;
  constructor(private tokenStorageService:TokenStorageService) {
  
  }

  dynamicTree(roles){
    if(roles){
      roles.forEach(element => {
        if(element=='GROUPE_CLIENT'){
          this.dataSource.data = TREE_DATA_CLIENT;
        }
        if(element=='GROUPE_ADMINISTRATEUR'){
          this.dataSource.data = TREE_DATA_MANAGER;
        }
        if(element=='GROUPE_EMPLOYE'){
          this.dataSource.data = TREE_DATA_EMPLOYE;
        }
      });
    }
  }

  ngOnInit(): void {
    let roles=this.tokenStorageService.getRole();
    
   this.dynamicTree(roles);
    this.currentAuth=this.tokenStorageService.getId();
  }

  
  getAuthUser(authUser:HttpResponse<any>){
    //console.log(this.currentAuth.body.roles);
    this.currentAuth=authUser;
    if(this.currentAuth){
      this.dynamicTree(this.currentAuth.body.roles)
    }  
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link:node.link,
      icon:node.icon,
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
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
