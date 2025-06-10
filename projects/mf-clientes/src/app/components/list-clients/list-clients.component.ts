import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.interface';
import { ModalType } from '../../models/modal.type';
import { ClientsService } from '../../services/clients.service';
import { SelectedClientsService } from '../../services/selected-clients.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { ModalComponent } from '../modal/modal.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-list-clients',
  imports: [
    HeaderComponent,
    CurrencyPipe,
    FormsModule,
    PaginationComponent,
    ModalComponent,
  ],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
})
export class ListClientsComponent implements OnInit {
  clientModal = viewChild(ModalComponent);
  clientsService = inject(ClientsService);
  selectedClientsService = inject(SelectedClientsService);

  username = sessionStorage.getItem('userName') || 'Usuário';
  clientsPerPage = signal<number>(16);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);

  clients = signal<Client[]>([]);
  selectedClient = signal<Client | null>(null);
  isClientSelected = signal<boolean>(false);

  modalType: ModalType = 'create';

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService
      .getClients(this.currentPage(), this.clientsPerPage())
      .subscribe({
        next: (response) => {
          this.clients.set(response.clients);
          this.totalPages.set(response.totalPages);
        },
      });
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadClients();
  }

  onClientsPerPageChange(value: number): void {
    this.clientsPerPage.set(value);
    this.currentPage.set(1);
    this.loadClients();
  }

  onSelectClient(client: Client) {
    this.selectedClientsService.toggleSelectClient(client);
  }

  isSelected(client: Client): boolean {
    return this.selectedClientsService
      .selectedClients()
      .some((c) => c.id === client.id);
  }

  // Modal actions
  openModalCreateClient(): void {
    this.modalType = 'create';
    this.selectedClient.set(null);
    this.clientModal()?.open();
  }

  openModalEditClient(client: Client): void {
    this.modalType = 'edit';
    this.selectedClient.set(client);
    this.clientModal()?.open();
  }

  openModalDeleteClient(client: Client): void {
    this.modalType = 'delete';
    this.selectedClient.set(client);
    this.clientModal()?.open();
  }

  // Modal event handlers
  onSaveClient(clientData: Client): void {
    if (this.modalType === 'create') {
      this.createClient(clientData);
    } else if (this.modalType === 'edit') {
      this.updateClient(clientData);
    }
  }

  onDeleteClient(client: Client): void {
    this.deleteClient(client);
  }

  onModalCancel(): void {
    this.selectedClient.set(null);
  }

  // Service methods
  createClient(clientData: Client): void {
    this.clientsService.createClient(clientData).subscribe({
      next: () => {
        this.loadClients();
      },
      error: (error) => {
        console.error('Erro ao criar cliente:', error);
      },
    });
  }

  updateClient(clientData: Client): void {
    if (this.selectedClient()?.id) {
      this.clientsService.updateClient(clientData).subscribe({
        next: () => {
          this.loadClients();
          const selectedClients = this.selectedClientsService.selectedClients();
          const updatedSelectedClients = selectedClients.map((client) =>
            client.id === clientData.id ? clientData : client
          );
          this.selectedClientsService.selectedClients.set(
            updatedSelectedClients
          );
        },
        error: (error) => {
          console.error('Erro ao atualizar cliente:', error);
        },
      });
    }
  }

  deleteClient(client: Client): void {
    if (client.id) {
      this.clientsService.deleteClient(client.id).subscribe({
        next: () => {
          this.loadClients();
          const selectedClients = this.selectedClientsService.selectedClients();
          const updatedSelectedClients = selectedClients.filter(
            (c) => c.id !== client.id
          );
          this.selectedClientsService.selectedClients.set(
            updatedSelectedClients
          );
        },
        error: (error) => {
          console.error('Erro ao excluir cliente:', error);
        },
      });
    }
  }
}
