import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductForm } from './seller-product-form';

describe('SellerProductForm', () => {
  let component: SellerProductForm;
  let fixture: ComponentFixture<SellerProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerProductForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
