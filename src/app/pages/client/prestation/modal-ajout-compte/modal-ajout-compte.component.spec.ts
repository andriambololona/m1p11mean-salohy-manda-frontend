import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjoutCompteComponent } from './modal-ajout-compte.component';

describe('ModalAjoutCompteComponent', () => {
  let component: ModalAjoutCompteComponent;
  let fixture: ComponentFixture<ModalAjoutCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAjoutCompteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAjoutCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
