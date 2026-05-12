import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgLion } from './bg-lion';

describe('BgLion', () => {
  let component: BgLion;
  let fixture: ComponentFixture<BgLion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgLion],
    }).compileComponents();

    fixture = TestBed.createComponent(BgLion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
