import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { UserRequest } from 'src/app/@core/entity/request/userRequest';
import { User } from 'src/app/@core/entity/user';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';


@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  user:User=new User();
  pageEvent: PageEvent;
  displayedColumns: string[] = ['nom', 'prenom', 'email', 'activation', 'action'];
  dataSource: MatTableDataSource<any>;
  length: number;//colonne total sans pagination
  pageSize: number=10;//nombre row initial
  pageIndex: number=0;//page
  pageSizeOptions = [5, 10, 25, 100];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  colorToogle: ThemePalette = 'accent';
  checkedToogle = false;
  disabledToogle = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    if(this.dataSource!=undefined)
      this.dataSource.paginator = this.paginator;
  }

  constructor(private managerService: ManagerService, private messageModalService: MessageModalService) { }

  reloadAllPersonnel(page: number, limit: number) {
    const _page = page + 1;
    this.managerService.getAllPersonnel(true, _page, limit).subscribe({
      next: (data: HttpResponse<ApiResponse<User[]>>) => {

        this.dataSource = new MatTableDataSource<any>(data.body.data);
        this.length = data.body.totalItems;
        this.pageIndex = page;
        this.pageSize = limit;
        //this.isCheckedToogle=data.body.data;
        /*data.body.data.forEach(element => {
          this.user.estActif = element.estActif;
        });*/
        //console.log(data.body.data);

      },
      error: (err) => {

      }
    })
  }
  ngOnInit(): void {
    this.reloadAllPersonnel(this.pageIndex, this.pageSize);

  }

  updateStatus(event) {
    //console.log(event);
    console.log(event.source);
    
    this.messageModalService.confirm("Confirmation", "Etes-vous sûr de vouloir changer de status?").then(confirm => {
      if (confirm) {
       
        let user = new UserRequest();
        user._id = event.source.id;
        this.managerService.updateStatusUser(true, user, event.checked).subscribe({
          next: (data: HttpResponse<ApiResponse<User>>) => {
            this, this.reloadAllPersonnel(this.pageIndex, this.pageSize);
            console.log(data.body.data.estActif);
            //this.isCheckedToogle=data.body.data.estActif;
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
      else{
        this.reloadAllPersonnel(this.pageIndex, this.pageSize);
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.reloadAllPersonnel(this.pageIndex, this.pageSize)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}

