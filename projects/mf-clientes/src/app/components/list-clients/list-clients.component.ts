import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header.component/header.component';

@Component({
  selector: 'app-list-clients',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './list-clients.component.html',
  styleUrl: './list-clients.component.scss',
})
export class ListClientsComponent implements OnInit {
  username: string = '';
  totalClients: number = 16;
  clientsPerPage: number = 16;
  currentPage: number = 4;

  clients: any[] = [];

  ngOnInit() {
    this.username = sessionStorage.getItem('userName') || 'Usuário';
    this.carregarClientes();
  }

  carregarClientes() {
    this.clients = Array(16)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        nome: 'Eduardo',
        salario: 3500.0,
        empresas: 120000.0,
      }));
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
