import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVipPoints } from './buy-vip-points';

describe('BuyVipPoints', () => {
  let component: BuyVipPoints;
  let fixture: ComponentFixture<BuyVipPoints>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyVipPoints]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyVipPoints);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
