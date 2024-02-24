import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/@core/entity/service';
import { User } from 'src/app/@core/entity/user';
import { RendezvousService } from 'src/app/@core/services/rendezvous.service';

@Component({
  selector: 'app-historique-rendez-vous',
  templateUrl: './historique-rendez-vous.component.html',
  styleUrls: ['./historique-rendez-vous.component.scss']
})
export class HistoriqueRendezVousComponent implements OnInit, AfterViewInit {

  page: number = 1;
  limit: number = 10;
  displayedColumns: string[] = ['date', 'prestations', 'montant', 'gestionnaire'];
  dataSource = new MatTableDataSource<RendezVous>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rendezVousService:RendezvousService){

  }

  ngOnInit() {
    this.GetData(true, this.page, this.limit);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetData(showErrorNotif: boolean, page: number, limit: number) {
    this.rendezVousService.get(showErrorNotif, page, limit).subscribe({
      next:(data:HttpResponse<any>)=>{
        data.body.data.forEach((rendezVous: RendezVous) => {
          console.log(data.body.data);
          this.dataSource = new MatTableDataSource<RendezVous>(data.body.data);
        });
      },error:(err)=>{

      }
    });
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

