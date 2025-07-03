import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SharedService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
