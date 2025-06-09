export interface Client {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClientResponse {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}
