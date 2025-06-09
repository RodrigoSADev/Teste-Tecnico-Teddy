import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.interface';
import { ClientsService } from '../../services/clients.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-list-clients',
  imports: [HeaderComponent, CommonModule, FormsModule, PaginationComponent],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
})
export class ListClientsComponent implements OnInit {
  clientsService = inject(ClientsService);

  username: string = '';
  clientsPerPage = signal<number>(8);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);

  clients = signal<Client[]>([]);

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

  selecionarCliente(cliente: any) {
    console.log('Cliente selecionado:', cliente);
  }

  editarCliente(cliente: any) {
    console.log('Editar cliente:', cliente);
  }

  excluirCliente(cliente: any) {
    console.log('Excluir cliente:', cliente);
  }

  criarCliente() {
    console.log('Criar novo cliente');
  }
}
