import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescriptionServiceComponent } from './modal-description-service.component';

describe('ModalDescriptionServiceComponent', () => {
  let component: ModalDescriptionServiceComponent;
  let fixture: ComponentFixture<ModalDescriptionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDescriptionServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDescriptionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
