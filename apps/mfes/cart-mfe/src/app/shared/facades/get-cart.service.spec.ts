import { TestBed } from '@angular/core/testing';

import { GetCartFacadeService } from './get-cart.service';

describe('GetCartService', () => {
  let service: GetCartFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCartFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
