import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitacionAColaborarModal } from './invitacion-acolaborar-modal';

describe('InvitacionAColaborarModal', () => {
  let component: InvitacionAColaborarModal;
  let fixture: ComponentFixture<InvitacionAColaborarModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitacionAColaborarModal],
    }).compileComponents();

    fixture = TestBed.createComponent(InvitacionAColaborarModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
