import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { CdkDragDrop,CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlName, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Rendezvous } from 'src/app/@core/entity/rendezvous';
import { Service } from 'src/app/@core/entity/service';
import { User } from 'src/app/@core/entity/user';
import { ClientService } from 'src/app/@core/services/client.service';
import { ManagerService } from 'src/app/@core/services/manager.service';


interface Animal {
  name: string;
  sound: string;
}


@Component({
  selector: 'app-formulaire-rendez-vous',
  templateUrl: './formulaire-rendez-vous.component.html',
  styleUrls: ['./formulaire-rendez-vous.component.scss'],
})
export class FormulaireRendezVousComponent implements OnInit{

  @ViewChild('pickerCustomIcon ') pickerCustomIcon : any;
  data_employe:Array<User>=[];
  service:Array<Service>=[];
  service2:Array<Service>=[];
  service3:Array<Service>=[];
  rendez_vous=new Rendezvous();
  isDisabledButtonValide:boolean=true;

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
  constructor(private clientService:ClientService,private managerService:ManagerService){
    //super();
  }

  animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
  
  ngOnInit(): void {
    this.reloadPersonnel();
    this.getAllServiceNotPaginate();
  }
  getAllServiceNotPaginate(){
    this.managerService.getAllServiceNotPaginate(true).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{
        //console.log(data.body.data);
        this.service=data.body.data;
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
    this.service3=event.container.data;
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
    console.log(this.service3);
    
  }
}
