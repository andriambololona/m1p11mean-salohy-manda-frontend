import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { User } from 'src/app/@core/entity/user';
import { ClientService } from 'src/app/@core/services/client.service';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-preference-employe',
  templateUrl: './preference-employe.component.html',
  styleUrls: ['./preference-employe.component.scss']
})
export class PreferenceEmployeComponent implements OnInit{
  isChangeIconFavoris:boolean=false;
  arrayFavoris:Array<string>=[];
  dataUsers:Array<User>=[];
  length: number;//colonne total sans pagination
  pageSize: number=10;//nombre row initial
  pageIndex: number=0;//page
  pageEvent: PageEvent;
  hidePageSize = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /*ngAfterViewInit() {
    this.user = this.paginator;
  }*/
  constructor(private clientService:ClientService){}

  ngOnInit(): void {
      this.reloadAllEmploye(this.pageIndex, this.pageSize);
  }




  reloadAllEmploye(page:number, limit: number){
    const _page = page + 1;
    this.clientService.getAllPersonnelEmploye(true, _page, limit).subscribe({
      next: (data: HttpResponse<ApiResponse<User[]>>) => {
        console.log(data.body.data);
        
        this.dataUsers=data.body.data;
        this.length = data.body.totalItems;
        this.pageIndex = page;
        this.pageSize = limit;
       
        //console.log(data.body.data);

      },
      error: (err) => {

      }
    })
  }

  addPreference(event:any){
    this.isChangeIconFavoris=true;
    this.arrayFavoris.push(event);
    console.log(this.arrayFavoris);
    
  }

  removePreference(event:any){
    this.isChangeIconFavoris=false;
    //this.arrayFavoris.push(event);
    //console.log(this.arrayFavoris);
    
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.reloadAllEmploye(this.pageIndex, this.pageSize)
  }


}
