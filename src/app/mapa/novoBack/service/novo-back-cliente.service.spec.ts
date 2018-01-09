import { TestBed, inject } from '@angular/core/testing';

import { NovoBackClienteService } from './novo-back-cliente.service';

describe('NovoBackClienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NovoBackClienteService]
    });
  });

  it('should be created', inject([NovoBackClienteService], (service: NovoBackClienteService) => {
    expect(service).toBeTruthy();
  }));
});
