import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Service } from 'src/app/@core/entity/service';
import { User } from 'src/app/@core/entity/user';
import { RendezvousService } from 'src/app/@core/services/rendezvous.service';

@Component({
  selector: 'app-historique-rendez-vous',
  templateUrl: './historique-rendez-vous.component.html',
  styleUrls: ['./historique-rendez-vous.component.scss']
})
export class HistoriqueRendezVousComponent implements OnInit, AfterViewInit {

  pageEvent: PageEvent;
  isLoading: boolean = false;
  page: number = 0;
  limit: number = 10;
  displayedColumns: string[] = ['date', 'prestations', 'montant', 'gestionnaire','statut'];
  dataSource = new MatTableDataSource<RendezVous>([]);
  length: number;//colonne total sans pagination
  pageSize: number=10;//nombre row initial
  pageIndex: number=0;//page
  hidePageSize = false;
  colorToogle: ThemePalette = 'accent';
  filtre_recherche:string="";
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rendezVousService:RendezvousService){

  }

  ngOnInit() {
    this.isLoading = true;
    this.GetData(true, this.page, this.limit,this.filtre_recherche);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetData(showErrorNotif: boolean, page: number, limit: number,q:string) {
    const _page = page+1;
    this.rendezVousService.get(showErrorNotif,_page, limit,q).subscribe({
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
    this.GetData(true, this.page, this.limit,this.filtre_recherche);
  }


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.isLoading=true;
    this.GetData(true,this.pageIndex, this.pageSize,this.filtre_recherche)
  }


}

export interface RendezVous {
  _id?:string;
  client:User;
  montant:number;
  gestionnaire:User;
  prestations:Array<Service|User>;
  date:Date;
  dateFin:Date;
  estRealise:boolean;
  autre:string;
}

const ELEMENT_DATA: RendezVous[] = [];

