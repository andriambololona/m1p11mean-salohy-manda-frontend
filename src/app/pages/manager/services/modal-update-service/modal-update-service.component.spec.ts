import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateServiceComponent } from './modal-update-service.component';

describe('ModalUpdateServiceComponent', () => {
  let component: ModalUpdateServiceComponent;
  let fixture: ComponentFixture<ModalUpdateServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUpdateServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
