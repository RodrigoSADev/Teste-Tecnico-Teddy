import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Client } from '../../models/client.interface';
import { SelectedClientsService } from '../../services/selected-clients.service';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-selected-clients.component',
  imports: [CurrencyPipe, CommonModule, HeaderComponent],
  templateUrl: './selected-clients.component.html',
  styleUrl: './selected-clients.component.scss',
})
export class SelectedClientsComponent {
  selectedClientsService = inject(SelectedClientsService);

  selectedClients = this.selectedClientsService.selectedClients;
  username = sessionStorage.getItem('userName') || 'Usuário';

  removerSelecao(client: Client) {
    this.selectedClientsService.toggleSelectClient(client);
  }
}
