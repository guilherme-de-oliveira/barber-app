import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaberReservationComponent } from './baber-reservation.component';

describe('BaberReservationComponent', () => {
  let component: BaberReservationComponent;
  let fixture: ComponentFixture<BaberReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaberReservationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaberReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
