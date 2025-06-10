import { TestBed } from '@angular/core/testing';
import { Client } from '../models/client.interface';
import { SelectedClientsService } from './selected-clients.service';

describe('SelectedClientsService', () => {
  let service: SelectedClientsService;
  const mockClient1: Client = {
    id: 1,
    name: 'Cliente 1',
    salary: 0,
    companyValuation: 0,
  };
  const mockClient2: Client = {
    id: 2,
    name: 'Cliente 2',
    salary: 0,
    companyValuation: 0,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty selected clients', () => {
    expect(service.selectedClients()).toEqual([]);
  });

  describe('toggleSelectClient', () => {
    it('should add client when not selected', () => {
      service.toggleSelectClient(mockClient1);
      expect(service.selectedClients()).toEqual([mockClient1]);
    });

    it('should remove client when already selected', () => {
      service.toggleSelectClient(mockClient1);
      service.toggleSelectClient(mockClient1);
      expect(service.selectedClients()).toEqual([]);
    });

    it('should maintain other selected clients when toggling one client', () => {
      service.toggleSelectClient(mockClient1);
      service.toggleSelectClient(mockClient2);
      service.toggleSelectClient(mockClient1);
      expect(service.selectedClients()).toEqual([mockClient2]);
    });

    it('should clear all selected clients', () => {
      service.toggleSelectClient(mockClient1);
      service.toggleSelectClient(mockClient2);
      service.clearSelectedClients();
      expect(service.selectedClients()).toEqual([]);
    });
  });
});
