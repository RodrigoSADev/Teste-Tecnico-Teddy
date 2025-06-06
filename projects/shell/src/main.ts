import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'mf-auth': 'http://localhost:4202/remoteEntry.json',
  'mf-clientes': 'http://localhost:4201/remoteEntry.json',
})
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
