import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjoutDepenseComponent } from './modal-ajout-depense.component';

describe('ModalAjoutDepenseComponent', () => {
  let component: ModalAjoutDepenseComponent;
  let fixture: ComponentFixture<ModalAjoutDepenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAjoutDepenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAjoutDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
