import { Injectable, signal } from '@angular/core';
import { Client } from '../models/client.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectedClientsService {
  selectedClients = signal<Client[]>([]);

  toggleSelectClient(client: Client) {
    const current = this.selectedClients();
    const exists = current.find((c) => c.id === client.id);
    if (exists) {
      this.selectedClients.set(current.filter((c) => c.id !== client.id));
    } else {
      this.selectedClients.set([...current, client]);
    }
  }

  clearSelectedClients() {
    this.selectedClients.set([]);
  }
}
