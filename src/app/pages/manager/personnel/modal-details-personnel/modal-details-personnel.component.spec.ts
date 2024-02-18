import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsPersonnelComponent } from './modal-details-personnel.component';

describe('ModalDetailsPersonnelComponent', () => {
  let component: ModalDetailsPersonnelComponent;
  let fixture: ComponentFixture<ModalDetailsPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsPersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailsPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
