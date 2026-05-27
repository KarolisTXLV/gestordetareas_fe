import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAmigoModal } from './buscar-amigo-modal';

describe('BuscarAmigoModal', () => {
  let component: BuscarAmigoModal;
  let fixture: ComponentFixture<BuscarAmigoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarAmigoModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarAmigoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
