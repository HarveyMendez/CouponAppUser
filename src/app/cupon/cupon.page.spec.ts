import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuponPage } from './cupon.page';

describe('CuponPage', () => {
  let component: CuponPage;
  let fixture: ComponentFixture<CuponPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
