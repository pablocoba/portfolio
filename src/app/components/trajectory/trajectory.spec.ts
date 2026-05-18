import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trajectory } from './trajectory';

describe('Trajectory', () => {
  let component: Trajectory;
  let fixture: ComponentFixture<Trajectory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trajectory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trajectory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
