import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEspaciosTrabajo } from './panel-espacios-trabajo';

describe('PanelEspaciosTrabajo', () => {
  let component: PanelEspaciosTrabajo;
  let fixture: ComponentFixture<PanelEspaciosTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelEspaciosTrabajo],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelEspaciosTrabajo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
