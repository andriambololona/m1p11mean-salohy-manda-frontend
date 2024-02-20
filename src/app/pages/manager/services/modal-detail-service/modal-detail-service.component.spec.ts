import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailServiceComponent } from './modal-detail-service.component';

describe('ModalDetailServiceComponent', () => {
  let component: ModalDetailServiceComponent;
  let fixture: ComponentFixture<ModalDetailServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
