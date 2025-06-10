import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Client, ClientResponse } from '../models/client.interface';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;
  let httpMock: HttpTestingController;
  const mockUrl = 'https://boasorte.teddybackoffice.com.br/users';

  const mockClient: Client = {
    id: 1,
    name: 'Teste Cliente',
    salary: 1000,
    companyValuation: 10000,
  };
  const mockClientResponse: ClientResponse = {
    clients: [mockClient],
    totalPages: 1,
    currentPage: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ClientsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get clients with pagination', () => {
    const page = 1;
    const limit = 10;

    service.getClients(page, limit).subscribe((response) => {
      expect(response).toEqual(mockClientResponse);
    });

    const req = httpMock.expectOne(`${mockUrl}?page=${page}&limit=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientResponse);
  });

  it('should get client by id', () => {
    const clientId = 1;

    service.getClientById(clientId).subscribe((response) => {
      expect(response).toEqual(mockClientResponse);
    });

    const req = httpMock.expectOne(`${mockUrl}/${clientId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientResponse);
  });

  it('should create a new client', () => {
    service.createClient(mockClient).subscribe((response) => {
      expect(response).toEqual(mockClientResponse);
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockClient);
    req.flush(mockClientResponse);
  });

  it('should update an existing client', () => {
    service.updateClient(mockClient).subscribe((response) => {
      expect(response).toEqual(mockClientResponse);
    });

    const req = httpMock.expectOne(`${mockUrl}/${mockClient.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockClient);
    req.flush(mockClientResponse);
  });

  it('should delete a client', () => {
    const clientId = 1;

    service.deleteClient(clientId).subscribe((response) => {
      expect(JSON.parse(response as unknown as string)).toEqual(mockClient);
    });

    const req = httpMock.expectOne(`${mockUrl}/${clientId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(JSON.stringify(mockClient), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
      statusText: 'OK',
    });
  });
});
