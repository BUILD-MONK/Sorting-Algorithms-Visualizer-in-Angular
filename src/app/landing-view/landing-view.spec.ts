import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingView } from './landing-view';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LandingView', () => {
  let component: LandingView;
  let fixture: ComponentFixture<LandingView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingView],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
