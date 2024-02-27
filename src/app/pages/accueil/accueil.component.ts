import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Service } from 'src/app/@core/entity/service';
import { ManagerService } from 'src/app/@core/services/manager.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit{

  length: number;//colonne total sans pagination
  pageSize: number=3;//nombre row initial
  pageIndex: number=0;//page
  pageEvent: PageEvent;
  hidePageSize = false;
  data_service:Array<Service>=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading:boolean=false;
  constructor(private managerService:ManagerService){}

  ngOnInit(): void {
    this.reloadService(this.pageIndex,this.pageSize);
  }

  reloadService(page:number,limit:number){
    this.isLoading=true;
    let _page=page+1;
    this.managerService.getAllService(true,_page,limit).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{
        this.data_service=data.body.data
        this.length=data.body.totalItems;
        this.pageIndex = page;
        this.pageSize = limit;
        this.isLoading=false;
        console.log(data.body);

      },
      error:(err)=>{

      }
    })
  }

  detailsService(){

  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.reloadService(this.pageIndex, this.pageSize);
  }
}
