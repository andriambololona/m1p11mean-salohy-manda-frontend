import { HttpResponse } from '@angular/common/http';
import { Component, Inject, Optional, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Prestation } from 'src/app/@core/entity/prestation';
import { PrestationService } from 'src/app/@core/services/prestation.service';
import { ModalPaiementComponent } from './modal-paiement/modal-paiement.component';
import { ModalAjoutCompteComponent } from './modal-ajout-compte/modal-ajout-compte.component';
import { Observable } from 'rxjs';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { SnackBarService } from 'src/app/@core/services/snack-bar.service';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.scss']
})
export class PrestationComponent {

  pageEvent: PageEvent;
  isLoading: boolean = false;
  page: number = 0;
  limit: number = 10;
  displayedColumns: string[] = ['date', 'prestations', 'montant', 'gestionnaire','statut','action'];
  dataSource = new MatTableDataSource<Prestation[]>([]);
  length: number;//colonne total sans pagination
  pageSize: number=10;//nombre row initial
  pageIndex: number=0;//page
  hidePageSize = false;
  colorToogle: ThemePalette = 'accent';
  filtre_recherche:string="";
  dateDebut=new FormControl<Date | null>(null);
  dateFin=new FormControl<Date | null>(null);
  data_solde:any={};
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private prestatiohnService:PrestationService,private snackBar:SnackBarService
    ,private dialog:MatDialog,private messageModalService:MessageModalService,private prestationService:PrestationService

  ){

  }

  ngOnInit() {
    this.isLoading = true;
    this.GetDataPrestation(true, this.page, this.limit,null,null);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetDataPrestation(showErrorNotif: boolean, page: number, limit: number,dateDebut:string,dateFin:string) {
    this.isLoading=true;
    const _page = page+1;
    this.prestatiohnService.getAllPrestation(showErrorNotif,_page, limit,dateDebut,dateFin).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{

          console.log(data.body.data[0]);
          this.dataSource = new MatTableDataSource<any>(data.body.data)
          this.data_solde=data.body.data[0].client.compte;
          this.length = data.body.paginator.dataCount;
          this.pageIndex = page;
          this.pageSize = limit;
        this.isLoading = false;
      },error:(err)=>{
        this.isLoading = false;
      }
    });
  }

  filter(){
    this.isLoading=true;
    console.log(this.dateDebut.value.toISOString());
    console.log(this.dateFin.value);
    this.GetDataPrestation(true, this.page, this.limit,this.dateDebut.value.toISOString(),this.dateDebut.value.toISOString());
  }


  OpenDialogPaiement(data:any):Observable<any>{
    const dialogRef = this.dialog.open(ModalPaiementComponent, {

      data: {data_prestation: data},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
    return new Observable((observer)=>{
      dialogRef.componentInstance.emitDataPaiement.subscribe((result)=>{
        observer.next(result);
      })
    })
  }

  OpenDialogAjoutCompte(data:any):Observable<any>{
    const dialogRef = this.dialog.open(ModalAjoutCompteComponent, {

      //data: {data_prestation: data},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
    return new Observable((observer)=>{
      dialogRef.componentInstance.emitcompteUser.subscribe((result)=>{
        observer.next(result);
      })
    })
  }

  validatePaiement(data_prestation:any){
    this.OpenDialogPaiement(data_prestation).subscribe({
      next:(data_emiter:any)=>{
        this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
          if(confirm){
            this.prestationService.paiement(true,data_emiter).subscribe({
              next:(data)=>{
                console.log(data);
                this.dialog.closeAll();
                this.snackBar.openSnackBarSuccess("Validation paiement réussi")
                //this.dialogRefPaiement.close();
                this.GetDataPrestation(true, this.page, this.limit,null,null);
              },
              error:(err)=>{


              }
            })
          }

        })

      },
      error:(err)=>{

        console.log(err);

      }
    })
  }

  ajoutCompte(data_prestation:any){
    this.OpenDialogAjoutCompte(data_prestation).subscribe({
      next:(data_emiter)=>{
        this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
          if(confirm){
            this.prestationService.createCompte(true,data_emiter).subscribe({
              next:(data)=>{
                console.log(data);
                this.snackBar.openSnackBarSuccess("Ajout montant réussi")
                this.dialog.closeAll();
                this.GetDataPrestation(true, this.page, this.limit,null,null);
              },
              error:(data)=>{
                console.log(data);

              }
            })
          }

        })
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.isLoading=true;
    this.GetDataPrestation(true,this.pageIndex, this.pageSize,null,null)
  }


}
