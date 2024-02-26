import { JsonPipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { UserRequest } from 'src/app/@core/entity/request/userRequest';
import { User } from 'src/app/@core/entity/user';
import { ClientService } from 'src/app/@core/services/client.service';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { TokenStorageService } from 'src/app/@core/services/token-storage.service';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-preference-employe',
  templateUrl: './preference-employe.component.html',
  styleUrls: ['./preference-employe.component.scss']
})
export class PreferenceEmployeComponent implements OnInit{
  isChangeIconFavoris:string="";
  isEtatIconFavoris:string="a";
  isEtatAddIconFavoris:string="a";
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
  constructor(private clientService:ClientService,private tokenStorage:TokenStorageService){}

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

  addPreference(user_id:string){
    //this.clientService.addPreference(true,).
    this.arrayFavoris.push(user_id);
    var userReq:UserRequest=new UserRequest();
    userReq.preferences.push(this.arrayFavoris);
    userReq._id=this.tokenStorage.getId();
    const preference=userReq.preferences.map((x)=>{
      return {employes:x}
    })
    userReq.preferences=preference;
    console.log(preference[0]);
    console.log(userReq);

    this.clientService.addPreference(true,userReq).subscribe({
      next:(data)=>{
        console.log(data);
        alert("success");
      },
      error:(err)=>{
        console.log(err);
        alert("error");
      }
    })

    //console.log(this.arrayFavoris);

    console.log(userReq);

    /*this.isChangeIconFavoris=this.isChangeIconFavoris;
    this.isEtatAddIconFavoris=this.isEtatAddIconFavoris;
    console.log(this.isChangeIconFavoris);

    this.arrayFavoris.push(user_id);
    console.log(this.arrayFavoris);*/

  }

  removePreference(user_id:string,index:number){
    this.isChangeIconFavoris=this.isChangeIconFavoris;
    this.isEtatIconFavoris=this.isEtatIconFavoris;
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
