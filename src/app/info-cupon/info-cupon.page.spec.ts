import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCuponPage } from './info-cupon.page';

describe('InfoCuponPage', () => {
  let component: InfoCuponPage;
  let fixture: ComponentFixture<InfoCuponPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCuponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
