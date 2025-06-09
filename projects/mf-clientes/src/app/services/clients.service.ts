import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, ClientResponse } from '../models/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  http = inject(HttpClient);

  private readonly url = 'https://boasorte.teddybackoffice.com.br/users';

  getClients(page: number, limit: number): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(
      `${this.url}?page=${page}&limit=${limit}`
    );
  }

  getClientById(id: number): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.url}/${id}`);
  }

  createClient(client: Client): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(this.url, client);
  }

  updateClient(client: Client): Observable<ClientResponse> {
    return this.http.patch<ClientResponse>(`${this.url}/${client.id}`, client);
  }

  deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.url}/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
