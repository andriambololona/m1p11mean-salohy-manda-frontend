import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMessageModalComponent } from './input-message-modal.component';

describe('InputMessageModalComponent', () => {
  let component: InputMessageModalComponent;
  let fixture: ComponentFixture<InputMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
