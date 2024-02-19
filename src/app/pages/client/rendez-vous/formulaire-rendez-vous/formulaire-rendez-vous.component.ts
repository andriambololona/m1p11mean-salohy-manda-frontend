import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { CdkDragDrop,CdkDropList, CdkDrag, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormControlName, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { ApiResponse } from 'src/app/@core/entity/api-response';
import { Rendezvous } from 'src/app/@core/entity/rendezvous';
import { User } from 'src/app/@core/entity/user';
import { ClientService } from 'src/app/@core/services/client.service';


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

  rendez_vous=new Rendezvous();

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
  constructor(private clientService:ClientService){
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
  data_employe:Array<User>=[];

  ngOnInit(): void {
    this.reloadPersonnel();
  }
  reloadPersonnel(){
    this.clientService.getAllPersonnelEmploye(true).subscribe({
      next:(data:HttpResponse<ApiResponse<any>>)=>{
        console.log(data.body.data);
        this.data_employe=data.body.data;
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
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
  valider_rendez_vous()
  {
    console.log(this.rendez_vous.date);
    
  }
}
