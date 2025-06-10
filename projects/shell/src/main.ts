import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'mf-auth': 'https://teste-tecnico-teddy-mf-auth.vercel.app/remoteEntry.json',
  'mf-clientes':
    'https://teste-tecnico-teddy-mf-clientes.vercel.app/remoteEntry.jsonn',
})
  .catch((err) => console.error(err))
  .then((_) => import('./bootstrap'))
  .catch((err) => console.error(err));
