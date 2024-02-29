import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { User } from 'src/app/@core/entity/user';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  employe: any = new User();
  isLoading: boolean;

  constructor(private userService: UserService){

  }

  ngOnInit(): void {
      this.isLoading = true;
      this.getProfil(true);
  }

  getProfil(showErrorNotif: boolean) {
    this.isLoading = true;
    this.userService.getProfil(showErrorNotif).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{
        this.employe = data.body;
        console.log(this.employe);
      },error:(err)=>{
      }, complete: () => {
        this.isLoading = false;
      }
    });
  }

}
