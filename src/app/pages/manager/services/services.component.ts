import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { UserRequest } from 'src/app/@core/entity/request/userRequest';
import { Service } from 'src/app/@core/entity/service';
import { User } from 'src/app/@core/entity/user';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { ModalAjoutServiceComponent } from './modal-ajout-service/modal-ajout-service.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ServiceRequest } from 'src/app/@core/entity/request/serviceRequest';
import { ModalDetailServiceComponent } from './modal-detail-service/modal-detail-service.component';
import { ModalUpdateServiceComponent } from './modal-update-service/modal-update-service.component';
import { PromotionServiceRequest } from 'src/app/@core/entity/request/promotionServiceRequest';
import { ModalAjoutPromotionComponent } from './modal-ajout-promotion/modal-ajout-promotion.component';
import { SnackBarService } from 'src/app/@core/services/snack-bar.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit,AfterViewInit{
  pageEvent: PageEvent;
  displayedColumns: string[] = ['image', 'nom', 'prix', 'promotion','action'];
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

  constructor(private managerService: ManagerService, private messageModalService: MessageModalService,public dialog: MatDialog,private snackBar:SnackBarService) { }

  reloadAllService(page: number, limit: number) {
    const _page = page + 1;
    this.managerService.getAllService(true, _page, limit).subscribe({
      next: (data: HttpResponse<ApiResponse<Service[]>>) => {
        console.log(data.body);

        this.dataSource = new MatTableDataSource<any>(data.body.data);
        console.log(data.body.data);
        this.length = data.body.totalItems;
        this.pageIndex = page;
        this.pageSize = limit;
        this.isLoading=false;
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
    this.reloadAllService(this.pageIndex, this.pageSize);

  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.reloadAllService(this.pageIndex, this.pageSize)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  openDialogAddPromotionService(service: object): Observable<PromotionServiceRequest> {
    const dialogRef = this.dialog.open(ModalAjoutPromotionComponent, {
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

  openDialogAjoutService(): Observable<ServiceRequest> {
    const dialogRef = this.dialog.open(ModalAjoutServiceComponent, {

      //data: {name: this.name, animal: this.animal},
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
  openDialogDetailsService(service:object){
    const dialogRef = this.dialog.open(ModalDetailServiceComponent, {
      width: '800px',
      //data: {id:id,nom:"salohy"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });

    //console.log(service);

  }

  openDialogUpdateService(service:object): Observable<ServiceRequest>{
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
    });
  }

  addPromotion(promotion: object) {
    this.openDialogAddPromotionService(promotion).subscribe({
      next: (data: PromotionServiceRequest) => {
        this.managerService.addPromotion(true, data).subscribe({
          next: (data) => {
            this.snackBar.openSnackBarSuccess("Ajout de promotion réussie");
            this.dialog.closeAll();
          },
          error: (err)=>{
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

  }

  updateService(service:object){
    this.openDialogUpdateService(service).subscribe({
      next:(data:ServiceRequest)=>{
        this.managerService.updateService(true,data).subscribe({
          next:(data)=>{
            //console.log(data);
            this.dialog.closeAll();
            this.snackBar.openSnackBarSuccess("Modification du service réussie");
          },
          error:(err)=>{
            console.error(err);
            this.snackBar.openSnackBarErrorServer();
          },
          complete: () => {
            this.reloadAllService(this.pageIndex, this.pageSize);
          },
        })
      },
      error:(err)=>{

      }
    })
  }


  registerService(){
    this.openDialogAjoutService().subscribe({
      next:(data:ServiceRequest)=>{
        const formData:FormData=new FormData();
        formData.append("image",data.image);
        let obj={
          nom:data.nom,
          prix:data.prix,
          duree:data.duree,
          commission:data.commission
        }
        formData.append("service",JSON.stringify(obj));
        //formData.append("service",JSON.stringify(this.serviceReq));
        console.log(formData.get("image"));
        this.managerService.createService(true,formData).subscribe({
          next:(data)=>{
            this.snackBar.openSnackBarSuccess("Enregistrement du service réussie");
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

  }

}

