import { TestBed } from '@angular/core/testing';

import { LowjShopFormService } from './lowj-shop-form.service';

describe('LowjShopFormService', () => {
  let service: LowjShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LowjShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
