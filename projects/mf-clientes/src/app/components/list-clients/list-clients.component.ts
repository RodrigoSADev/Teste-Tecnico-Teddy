import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client.interface';
import { ClientsService } from '../../services/clients.service';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-list-clients',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
})
export class ListClientsComponent implements OnInit {
  clientsService = inject(ClientsService);

  username: string = '';
  totalClients: number = 16;
  clientsPerPage: number = 16;
  currentPage: number = 1;

  clients = signal<Client[]>([]);

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientsService
      .getClients(this.currentPage, this.clientsPerPage)
      .subscribe({
        next: (response) => {
          this.clients.set(response.clients);
        },
      });
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
