import { HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Prestation } from 'src/app/@core/entity/prestation';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { PrestationService } from 'src/app/@core/services/prestation.service';
import { SnackBarService } from 'src/app/@core/services/snack-bar.service';
import { ModalAjoutCompteComponent } from '../../client/prestation/modal-ajout-compte/modal-ajout-compte.component';
import { ModalPaiementComponent } from '../../client/prestation/modal-paiement/modal-paiement.component';

@Component({
  selector: 'app-suivi',
  templateUrl: './suivi.component.html',
  styleUrls: ['./suivi.component.scss']
})
export class SuiviComponent {
  pageEvent: PageEvent;
  isLoading: boolean = false;
  page: number = 0;
  limit: number = 10;
  displayedColumns: string[] = ['date', 'prestations','commision_service', 'montant','commission', 'client','statut'];
  dataSource = new MatTableDataSource<Prestation[]>([]);
  length: number;//colonne total sans pagination
  pageSize: number=10;//nombre row initial
  pageIndex: number=0;//page
  hidePageSize = false;
  colorToogle: ThemePalette = 'accent';
  filtre_recherche:string="";
  dateDebut=new FormControl<Date | null>(null);
  dateFin=new FormControl<Date | null>(null);
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
    const _page = page+1;
    this.prestatiohnService.getAllPrestation(showErrorNotif,_page, limit,dateDebut,dateFin).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{

          console.log(data.body);
          this.dataSource = new MatTableDataSource<any>(data.body.data);
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


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.isLoading=true;
    this.GetDataPrestation(true,this.pageIndex, this.pageSize,null,null)
  }
}
