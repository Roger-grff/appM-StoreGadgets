import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GadgetDetallePage } from './gadget-detalle.page';

describe('GadgetDetallePage', () => {
  let component: GadgetDetallePage;
  let fixture: ComponentFixture<GadgetDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
