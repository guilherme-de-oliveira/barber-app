import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberDescriptionComponent } from './barber-description.component';

describe('BarberDescriptionComponent', () => {
  let component: BarberDescriptionComponent;
  let fixture: ComponentFixture<BarberDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarberDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
