import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaInputMessageModalComponent } from './textarea-input-message-modal.component';

describe('TextareaInputMessageModalComponent', () => {
  let component: TextareaInputMessageModalComponent;
  let fixture: ComponentFixture<TextareaInputMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaInputMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaInputMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
