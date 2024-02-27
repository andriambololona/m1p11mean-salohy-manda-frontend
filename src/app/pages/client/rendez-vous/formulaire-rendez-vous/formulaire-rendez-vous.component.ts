
import { CdkDragDrop,CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlName, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Rendezvous } from 'src/app/@core/entity/rendezvous';
import { RendezVousRequest } from 'src/app/@core/entity/request/rendezVousRequest';
import { Service } from 'src/app/@core/entity/service';
import { User } from 'src/app/@core/entity/user';
import { ClientService } from 'src/app/@core/services/client.service';
import { ManagerService } from 'src/app/@core/services/manager.service';
import { MessageModalService } from 'src/app/@core/services/message-modal.service';
import { TokenStorageService } from 'src/app/@core/services/token-storage.service';


 export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-formulaire-rendez-vous',
  templateUrl: './formulaire-rendez-vous.component.html',
  styleUrls: ['./formulaire-rendez-vous.component.scss'],
  providers: [

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

  ]
})
export class FormulaireRendezVousComponent implements OnInit{

  @ViewChild('pickerCustomIcon ') pickerCustomIcon : any;
  data_employe:Array<User>=[];
  service:Array<Service>=[];
  service2:Array<Service>=[];
  service3:Array<Service>=[];
  rendez_vous=new Rendezvous();
  user=new User();
  isDisabledButtonValide:boolean=true;
  isLoadingService:boolean=false;
  isLoading:boolean=false;
  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'accent';

  dateControl=new FormControl("dateControl");
  constructor(private clientService:ClientService,private managerService:ManagerService
    ,private tokenStorage:TokenStorageService,private messageModalService:MessageModalService,private router:Router){
    //super();
  }


  ngOnInit(): void {
    this.reloadPersonnel();
    this.getAllServiceNotPaginate();
  }
  getAllServiceNotPaginate(){
    this.isLoadingService=true;
    this.managerService.getAllServiceNotPaginate(true).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{
        console.log(data.body.data);
        this.service=data.body.data;
        this.isLoadingService=false;
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }
  reloadPersonnel(){
    this.clientService.getAllPersonnelEmploye(true).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{
        //console.log(data.body.data);
        this.data_employe=data.body.data;
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  //todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<Service[]>) {
    //console.log(event.container.data);
    //console.log(event.previousContainer.data);
    //this.service3=event.previousContainer.data;
    console.log(this.service3.length);
    if(this.service3.length<=1){
      this.isDisabledButtonValide=true;
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  drop2(event: CdkDragDrop<Service[]>) {
    this.rendez_vous.prestations=event.container.data;
    if(this.service3.length>=0){
      this.isDisabledButtonValide=false;
    }

    console.log(this.service3.length);
    //console.log(event.previousContainer.data);
    if (event.previousContainer === event.container) {
      console.log("true1");

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log("false1");

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  valider_rendez_vous()
  {
    var theDate = new Date(this.rendez_vous.date);
    var dataFormat=theDate.getFullYear()+"-"+theDate.getMonth()+"-"+theDate.getDay()+" "+theDate.getHours()+":"+theDate.getMinutes()+":"+theDate.getSeconds();
    //this.rendez_vous.date=new Date(dataFormat);
    console.log(this.rendez_vous.date);
    var rendezVousReq:RendezVousRequest=new RendezVousRequest();
    rendezVousReq.date=this.rendez_vous.date;
    let prestations=this.rendez_vous.prestations.map((data)=>{
      return {service:data._id};
    })
    rendezVousReq.prestations=prestations;
    rendezVousReq.client=this.tokenStorage.getId();
    rendezVousReq.gestionnaire=this.rendez_vous.gestionnaire
    //rendezVousReq.gestionnaire._id=this.user._id;
    console.log(rendezVousReq);
    console.log(prestations);

    this.messageModalService.confirm("Confirmation","Etes-vous sûr de vouloir continuer ?").then(confirm=>{
      this.isLoading=true;
      if(confirm){
        this.clientService.createRendezVous(true,rendezVousReq).subscribe({
          next:(data)=>{
            console.log(data);
            this.isLoading=false;
            this.router.navigateByUrl('/pages/client/historique_rendez_vous');

          },
          error:(err)=>{
            console.log(err);

          }
        })
      }else{

      }
    })
  }
}
