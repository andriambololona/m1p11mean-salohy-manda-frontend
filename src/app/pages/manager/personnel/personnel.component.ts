import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { ManagerService } from 'src/app/@core/services/manager.service';


@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  pageEvent: PageEvent;
  displayedColumns: string[] = [ 'nom', 'prenom', 'email','activation','verification','action'];
  dataSource :MatTableDataSource<any>;
  length:number;//colonne total sans pagination
  pageSize:number;//nombre row initial
  pageIndex: number;//page
  pageSizeOptions = [5, 10, 25,100];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private managerService:ManagerService){}

  reloadAllPersonnel(page:number,limit:number){
    const _page=page+1;
    this.managerService.getAllPersonnel(true,_page,limit).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{
        this.dataSource = new MatTableDataSource<any>(data.body.data);
        this.length=data.body.totalItems;
        this.pageIndex=page;
        this.pageSize=limit;
      },
      error:(err)=>{

      }
    })
  }
  ngOnInit(): void {
      this.reloadAllPersonnel(this.pageIndex,this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.reloadAllPersonnel(this.pageIndex,this.pageSize)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}

