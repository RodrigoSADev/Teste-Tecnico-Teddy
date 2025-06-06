import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      loadRemoteModule('mf-auth', './Component').then((m) => m.LoginComponent),
  },
  {
    path: 'clientes',
    loadComponent: () =>
      loadRemoteModule('mf-clientes', './Component').then(
        (m) => m.ListClientsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
