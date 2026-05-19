import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Softskills } from './softskills';

describe('Softskills', () => {
  let component: Softskills;
  let fixture: ComponentFixture<Softskills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Softskills],
    }).compileComponents();

    fixture = TestBed.createComponent(Softskills);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
