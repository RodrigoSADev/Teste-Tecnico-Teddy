import { TestBed } from '@angular/core/testing';

import { SelectedClientsService } from './selected-clients.service';

describe('SelectedClientsService', () => {
  let service: SelectedClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
