import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjoutServiceComponent } from './modal-ajout-service.component';

describe('ModalAjoutServiceComponent', () => {
  let component: ModalAjoutServiceComponent;
  let fixture: ComponentFixture<ModalAjoutServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAjoutServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAjoutServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
