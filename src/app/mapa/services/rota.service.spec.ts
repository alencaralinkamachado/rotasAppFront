import { TestBed, inject } from '@angular/core/testing';

import { RotaService } from './rota.service';

describe('RotaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RotaService]
    });
  });

  it('should be created', inject([RotaService], (service: RotaService) => {
    expect(service).toBeTruthy();
  }));
});
