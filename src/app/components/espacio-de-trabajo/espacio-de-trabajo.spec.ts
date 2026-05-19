import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacioDeTrabajo } from './espacio-de-trabajo';

describe('EspacioDeTrabajo', () => {
  let component: EspacioDeTrabajo;
  let fixture: ComponentFixture<EspacioDeTrabajo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspacioDeTrabajo],
    }).compileComponents();

    fixture = TestBed.createComponent(EspacioDeTrabajo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
