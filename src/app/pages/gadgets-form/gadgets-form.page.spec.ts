import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GadgetsFormPage } from './gadgets-form.page';

describe('GadgetsFormPage', () => {
  let component: GadgetsFormPage;
  let fixture: ComponentFixture<GadgetsFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
