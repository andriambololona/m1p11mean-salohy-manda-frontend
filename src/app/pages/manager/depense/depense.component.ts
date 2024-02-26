import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Depense } from 'src/app/@core/entity/depense';
import { DepenseRequest } from 'src/app/@core/entity/request/depenseRequest';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { ModalAjoutDepenseComponent } from './modal-ajout-depense/modal-ajout-depense.component';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/@core/entity/api-response';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.scss']
})
export class DepenseComponent {
  pageEvent: PageEvent;
  displayedColumns: string[] = ['motif', 'montant','date','action'];
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

  constructor(private managerService: ManagerService,public dialog: MatDialog) { }

  reloadAllDepense(page: number, limit: number) {
    const _page = page + 1;
    this.managerService.getAllDepense(true, _page, limit).subscribe({
      next: (data: HttpResponse<ApiResponse<any>>) => {
        console.log(data.body);
        
        this.dataSource = new MatTableDataSource<any>(data.body.data);
        this.length = data.body.paginator.dataCount;
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
    this.reloadAllDepense(this.pageIndex, this.pageSize);

  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.reloadAllDepense(this.pageIndex, this.pageSize)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  openDialogAjoutDepense(): Observable<DepenseRequest> {
    const dialogRef = this.dialog.open(ModalAjoutDepenseComponent, {

      //data: {name: this.name, animal: this.animal},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
    return  new Observable((observer)=>{
      dialogRef.componentInstance.emitDepense.subscribe((result)=>{
        observer.next(result);
      })
    })
  }
  /*openDialogDetailsService(service:object){
    const dialogRef = this.dialog.open(ModalDetailServiceComponent, {
      width: '800px',
      //data: {id:id,nom:"salohy"},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
    
    //console.log(service);
    
  }*/

  /*openDialogUpdateDepense(service:object): Observable<ServiceRequest>{
    //console.log(service);
    
     const dialogRef = this.dialog.open(ModalUpdateServiceComponent, {
      width: '800px',
      data: {service:service},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
    
    return  new Observable((observer)=>{
      dialogRef.componentInstance.emitService.subscribe((result)=>{
        observer.next(result);
      })
    })
    
  }

  updateDepense(service:object){
    this.openDialogUpdateDepense(service).subscribe({
      next:(data:ServiceRequest)=>{
        this.managerService.updateService(true,data).subscribe({
          next:(data)=>{
            //console.log(data);
            this.dialog.closeAll();
          },
          error:(err)=>{
            console.error(err);
               
          },
          complete: () => {
            this.reloadAllService(this.pageIndex, this.pageSize);
          },
        })
      },
      error:(err)=>{

      }
    })
  }*/


  registerDepense(){
    this.openDialogAjoutDepense().subscribe({
      next:(data:DepenseRequest)=>{
       console.log(data);
       
        
        
        this.managerService.addDepense(true,data).subscribe({
          next:(data)=>{
            this.reloadAllDepense(this.pageIndex, this.pageSize);
            this.dialog.closeAll();
          },
          error:(err)=>{
            console.error(err);
            
          },
          complete: () => {
            //this.reloadAllService(this.pageIndex, this.pageSize);
          },
        })
      },
      error:(err)=>{

      }
    })
    
  }
}
