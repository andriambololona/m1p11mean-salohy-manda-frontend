import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjoutPromotionComponent } from './modal-ajout-promotion.component';

describe('ModalAjoutPromotionComponent', () => {
  let component: ModalAjoutPromotionComponent;
  let fixture: ComponentFixture<ModalAjoutPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAjoutPromotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAjoutPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
