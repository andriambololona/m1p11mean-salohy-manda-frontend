import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Rendezvous } from 'src/app/@core/entity/rendezvous';
import { Service } from 'src/app/@core/entity/service';
import { User } from 'src/app/@core/entity/user';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { RendezvousService } from 'src/app/@core/services/rendezvous.service';
import { SnackBarService } from 'src/app/@core/services/snack-bar.service';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent {
  pageEvent: PageEvent;
  isLoading: boolean = false;
  page: number = 0;
  limit: number = 10;
  displayedColumns: string[] = ['date', 'prestations', 'montant', 'client','statut','action'];
  dataSource = new MatTableDataSource<RendezVous>([]);
  length: number;//colonne total sans pagination
  pageSize: number=10;//nombre row initial
  pageIndex: number=0;//page
  hidePageSize = false;
  colorToogle: ThemePalette = 'accent';
  filtre_recherche:string="";

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rendezVousService:RendezvousService,private messageModalService:MessageModalService,private snackBarService:SnackBarService){

  }

  ngOnInit() {
    this.isLoading = true;
    this.GetData(true, this.page, this.limit);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetData(showErrorNotif: boolean, page: number, limit: number,q:string="") {
    const _page = page+1;
    this.rendezVousService.get(showErrorNotif,_page, limit,q).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{

          console.log(data.body.data);
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
    this.GetData(true,this.page,this.limit,this.filtre_recherche);
  }

  deleteRendezVous(id_rendezVous:string){

      console.log(id_rendezVous);

  }

  createRendezVous(id_rendezVous:string){

    var body={
      id:id_rendezVous
    }
    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      this.isLoading=true;
      if(confirm){
        this.rendezVousService.createPrestationRendezVous(true,body).subscribe({
          next:(data)=>{
            this.snackBarService.openSnackBarSuccess("validation rendez-vous réussie")
            this.GetData(true, this.page, this.limit);
          },
          error:(err)=>{
            this.snackBarService.openSnackBarErrorServer();
          }
        })
      }

    });
    //bodyRendezVous._id=id_rendezVous;
      console.log(id_rendezVous);

  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.GetData(true,this.pageIndex, this.pageSize)
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
