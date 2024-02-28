import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Service } from 'src/app/@core/entity/service';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { ModalDetailServiceComponent } from '../manager/services/modal-detail-service/modal-detail-service.component';
import { ModalDescriptionServiceComponent } from './modal-description-service/modal-description-service.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  services: any[];
  isLoading: boolean = false;

  constructor(private managerService: ManagerService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.reloadAllService();
  }

  reloadAllService() {
    this.managerService.getAllService(true, 1, 50).subscribe({
      next: (data: HttpResponse<ApiResponse<any[]>>) => {
        this.services = data.body.data;
      },
      error: (err) => {

      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
