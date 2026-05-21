import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GadgetsPage } from './gadgets.page';

describe('GadgetsPage', () => {
  let component: GadgetsPage;
  let fixture: ComponentFixture<GadgetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
