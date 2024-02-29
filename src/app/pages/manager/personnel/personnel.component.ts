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
import { ModalDetailsPersonnelComponent } from './modal-details-personnel/modal-details-personnel.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/@core/services/snack-bar.service';


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
  isLoading:boolean=true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    if(this.dataSource!=undefined)
      this.dataSource.paginator = this.paginator;
  }

  constructor(private _snackBar: SnackBarService,private managerService: ManagerService, private messageModalService: MessageModalService,public dialog: MatDialog) { }

  /*horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{duration:5000,horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition});
  }*/


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
        this.isLoading=false;

      },
      error: (err) => {

      }
    })
  }

  openModalDetailPersonnel(data:any){
    const dialogRef = this.dialog.open(ModalDetailsPersonnelComponent, {

      data: {personnel: data},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
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
            this._snackBar.openSnackBarSuccess("Modification de status réussi");
            //this.isCheckedToogle=data.body.data.estActif;
          },
          error: (err) => {
            console.log(err);
            this._snackBar.openSnackBarErrorServer();
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

