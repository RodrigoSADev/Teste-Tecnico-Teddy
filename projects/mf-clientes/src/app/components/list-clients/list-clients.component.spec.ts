import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { Client } from '../../models/client.interface';
import { SelectedClientsService } from '../../services/selected-clients.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { ModalComponent } from '../modal/modal.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ListClientsComponent } from './list-clients.component';

describe('ListClientsComponent', () => {
  let component: ListClientsComponent;
  let fixture: ComponentFixture<ListClientsComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let httpMock: HttpTestingController;
  let selectedClientsService: SelectedClientsService;

  const mockClients: Client[] = [
    {
      id: 1,
      name: 'Cliente Teste',
      salary: 5000,
      companyValuation: 100000,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListClientsComponent,
        HeaderComponent,
        ModalComponent,
        PaginationComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        SelectedClientsService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListClientsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    httpMock = TestBed.inject(HttpTestingController);
    selectedClientsService = TestBed.inject(SelectedClientsService);
  });

  const API_URL = 'https://boasorte.teddybackoffice.com.br/users';

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of clients', () => {
    const mockResponse = {
      clients: mockClients,
      totalPages: 1,
    };

    component.ngOnInit();
    const req = httpMock.expectOne(`${API_URL}?page=1&limit=16`);
    req.flush(mockResponse);
    fixture.detectChanges();

    const clientsCount = fixture.debugElement.query(
      By.css('[data-test="clients-count"]')
    );
    expect(clientsCount.nativeElement.textContent).toContain(
      '1 clientes encontrados'
    );
  });

  it('should display client information correctly', () => {
    const mockResponse = {
      clients: mockClients,
      totalPages: 1,
    };

    component.ngOnInit();
    const req = httpMock.expectOne(`${API_URL}?page=1&limit=16`);
    req.flush(mockResponse);
    fixture.detectChanges();

    const clientName = fixture.debugElement.query(
      By.css('[data-test="client-name"]')
    );
    const clientSalary = fixture.debugElement.query(
      By.css('[data-test="client-salary"]')
    );
    const clientCompany = fixture.debugElement.query(
      By.css('[data-test="client-company"]')
    );

    expect(clientName.nativeElement.textContent).toBe('Cliente Teste');
    expect(clientSalary.nativeElement.textContent).toContain(
      'Salário: R$5,000.00'
    );
    expect(clientCompany.nativeElement.textContent).toContain(
      'Empresa: R$100,000.00'
    );
  });

  it('should have all action buttons for each client', () => {
    const mockResponse = {
      clients: mockClients,
      totalPages: 1,
    };

    component.ngOnInit();
    const req = httpMock.expectOne(`${API_URL}?page=1&limit=16`);
    req.flush(mockResponse);
    fixture.detectChanges();

    const selectButton = fixture.debugElement.query(
      By.css('[data-test="select-client-btn"]')
    );
    const editButton = fixture.debugElement.query(
      By.css('[data-test="edit-client-btn"]')
    );
    const deleteButton = fixture.debugElement.query(
      By.css('[data-test="delete-client-btn"]')
    );

    expect(selectButton).toBeTruthy();
    expect(editButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
  });

  it('should have create client button', () => {
    const createButton = fixture.debugElement.query(
      By.css('[data-test="create-client-btn"]')
    );
    expect(createButton).toBeTruthy();
    expect(createButton.nativeElement.textContent.trim()).toBe('Criar cliente');
  });

  it('should have pagination component', () => {
    const pagination = fixture.debugElement.query(
      By.css('[data-test="pagination"]')
    );
    expect(pagination).toBeTruthy();
  });

  it('should have clients per page select', () => {
    const select = fixture.debugElement.query(
      By.css('[data-test="clients-per-page-select"]')
    );
    expect(select).toBeTruthy();

    const options = select.nativeElement.options;
    expect(options.length).toBe(2);
    expect(options[0].value).toBe('16');
    expect(options[1].value).toBe('32');
  });

  it('should have modal component', () => {
    const modal = fixture.debugElement.query(
      By.css('[data-test="client-modal"]')
    );
    expect(modal).toBeTruthy();
  });

  it('should load clients on init', () => {
    const mockResponse = {
      clients: mockClients,
      totalPages: 1,
    };

    component.ngOnInit();
    const req = httpMock.expectOne(`${API_URL}?page=1&limit=16`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.clients()).toEqual(mockClients);
    expect(component.totalPages()).toBe(1);

    httpMock.verify();
  });

  it('should handle page change', () => {
    component.onPageChange(2);

    const req = httpMock.expectOne(`${API_URL}?page=2&limit=16`);
    expect(req.request.method).toBe('GET');
    req.flush({ clients: mockClients, totalPages: 1 });

    expect(component.currentPage()).toBe(2);
  });

  it('should handle clients per page change', () => {
    component.onClientsPerPageChange(32);

    const req = httpMock.expectOne(`${API_URL}?page=1&limit=32`);
    expect(req.request.method).toBe('GET');
    req.flush({ clients: mockClients, totalPages: 1 });

    expect(component.clientsPerPage()).toBe(32);
    expect(component.currentPage()).toBe(1);
  });

  it('should toggle client selection', () => {
    const client = mockClients[0];
    component.onSelectClient(client);

    expect(component.isSelected(client)).toBe(true);

    component.onSelectClient(client);
    expect(component.isSelected(client)).toBe(false);
  });

  it('should create new client', () => {
    const newClient: Client = {
      id: 2,
      name: 'Novo Cliente',
      salary: 6000,
      companyValuation: 120000,
    };

    component.onSaveClient(newClient);

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    req.flush(newClient);

    const loadReq = httpMock.expectOne(`${API_URL}?page=1&limit=16`);
    expect(loadReq.request.method).toBe('GET');
    loadReq.flush({ clients: [newClient], totalPages: 1 });

    httpMock.verify();
  });

  it('should update existing client', () => {
    const updatedClient: Client = {
      id: 1,
      name: 'Cliente Atualizado',
      salary: 7000,
      companyValuation: 150000,
    };

    component.selectedClient.set(mockClients[0]);
    component.onSaveClient(updatedClient);

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('POST');
    req.flush(updatedClient);

    const loadReq = httpMock.expectOne(`${API_URL}?page=1&limit=16`);
    expect(loadReq.request.method).toBe('GET');
    loadReq.flush({ clients: [updatedClient], totalPages: 1 });

    httpMock.verify();
  });

  it('should delete client', () => {
    const clientToDelete = mockClients[0];
    component.onDeleteClient(clientToDelete);

    const req = httpMock.expectOne(`${API_URL}/${clientToDelete.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    const loadReq = httpMock.expectOne(`${API_URL}?page=1&limit=16`);
    expect(loadReq.request.method).toBe('GET');
    loadReq.flush({ clients: [], totalPages: 0 });

    httpMock.verify();
  });

  it('should open create modal', () => {
    const modalSpy = spyOn(component.clientModal() as any, 'open');
    component.openModalCreateClient();

    expect(component.modalType).toBe('create');
    expect(component.selectedClient()).toBeNull();
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should open edit modal', () => {
    const client = mockClients[0];
    const modalSpy = spyOn(component.clientModal() as any, 'open');

    component.openModalEditClient(client);

    expect(component.modalType).toBe('edit');
    expect(component.selectedClient()).toEqual(client);
    expect(modalSpy).toHaveBeenCalled();
  });

  it('should open delete modal', () => {
    const client = mockClients[0];
    const modalSpy = spyOn(component.clientModal() as any, 'open');

    component.openModalDeleteClient(client);

    expect(component.modalType).toBe('delete');
    expect(component.selectedClient()).toEqual(client);
    expect(modalSpy).toHaveBeenCalled();
  });
});
