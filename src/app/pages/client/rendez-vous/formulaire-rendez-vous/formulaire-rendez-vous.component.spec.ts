import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireRendezVousComponent } from './formulaire-rendez-vous.component';

describe('FormulaireRendezVousComponent', () => {
  let component: FormulaireRendezVousComponent;
  let fixture: ComponentFixture<FormulaireRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireRendezVousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaireRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
