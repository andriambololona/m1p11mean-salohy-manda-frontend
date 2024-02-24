import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PrestationService } from 'src/app/@core/services/prestation.service';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {

  caJour: number = 0;
  caJourAvant: number = 0;
  rapportCaJour: number = 0;
  caMois: number = 0;
  caMoisAvant: number = 0;
  rapportCaMois: number = 0;
  beneficeMois: number = 0;
  beneficeMoisAvant: number = 0;
  rapportBeneficeMois: number = 0;

  // historiqueCaJournaliere: 

  constructor(private prestationService: PrestationService){}

  ngOnInit(): void {
      this.getCaJour();
      this.getCaJourAvant();
      this.getCaMois();
      this.getCaMoisAvant();
      this.getBeneficeMois();
      this.getBeneficeMoisAvant();
  }

  onCaJourChange(){
    if (this.caJourAvant != 0){
      this.rapportCaJour = this.caJour / this.caJourAvant;
    } else {
      this.rapportCaJour = 0;
    }
  }

  onCaMoisChange(){
    if (this.caMoisAvant != 0) {
      this.rapportCaMois = this.caMois / this.caMoisAvant;
    } else {
      this.rapportCaMois = 0;
    }
  }

  onBeneficeMoisChange(){
    if (this.beneficeMoisAvant != 0){
      this.rapportBeneficeMois = this.beneficeMois / this.beneficeMoisAvant;
    } else {
      this.rapportBeneficeMois = 0;
    }
  }

  getCaJour() {
    this.prestationService.getChiffreAffaireJour(true, new Date()).subscribe({
      next: (data: HttpResponse<any>) => {
        this.caJour = data.body.chiffreAffaire;
        this.onCaJourChange();
      },
      error: (err) => {

      }
    })
  }

  getCaJourAvant() {
    const date : Date = new Date();
    date.setDate(date.getDate() - 1);
    this.prestationService.getChiffreAffaireJour(true, date).subscribe({
      next: (data: HttpResponse<any>) => {
        this.caJourAvant = data.body.chiffreAffaire;
        this.onCaJourChange();
      },
      error: (err) => {

      }
    })
  }

  getCaMois() {
    const date = new Date();
    this.prestationService.getChiffreAffaireMois(true, date.getFullYear(), date.getMonth()).subscribe({
      next: (data: HttpResponse<any>) => {
        this.caMois = data.body.chiffreAffaire;
        this.onCaMoisChange();
      },
      error: (err) => {

      }
    })
  }

  getCaMoisAvant() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    this.prestationService.getChiffreAffaireMois(true, date.getFullYear(), date.getMonth()).subscribe({
      next: (data: HttpResponse<any>) => {
        this.caMoisAvant = data.body.chiffreAffaire;
        this.onCaMoisChange();
      },
      error: (err) => {

      }
    })
  }

  getBeneficeMois() {
    const date = new Date();
    this.prestationService.getBenefice(true, date.getFullYear(), date.getMonth()).subscribe({
      next: (data: HttpResponse<any>) => {
        this.caMois = data.body.benefice;
        this.onBeneficeMoisChange();
      },
      error: (err) => {

      }
    })
  }

  getBeneficeMoisAvant() {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    this.prestationService.getBenefice(true, date.getFullYear(), date.getMonth()).subscribe({
      next: (data: HttpResponse<any>) => {
        this.caMoisAvant = data.body.benefice;
        this.onBeneficeMoisChange();
      },
      error: (err) => {

      }
    })
  }

}
