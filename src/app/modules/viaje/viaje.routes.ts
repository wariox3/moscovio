import { Route } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/viaje/viaje.component'),
      },
    ],
  },
  {
    path: 'nuevo',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/viaje-nuevo/viaje-nuevo.component'),
      },
    ],
  },
  {
    path: 'editar/:id',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/viaje-editar/viaje-editar.component'),
      },
    ],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

export default routes;
