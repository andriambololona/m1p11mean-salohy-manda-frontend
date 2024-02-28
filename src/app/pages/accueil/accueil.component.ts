import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Service } from 'src/app/@core/entity/service';
import { ManagerService } from 'src/app/@core/services/manager.service';

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
