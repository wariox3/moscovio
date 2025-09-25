import { Routes } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'carga-masiva',
    pathMatch: 'full',
  },
  {
    path: 'carga-masiva',
    canActivate: [],
    loadComponent: () => import('./admin-layout/admin-layout.component'),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../modules/carga-masiva/pages/carga-masiva/carga-masiva.component'),
      },
    ],
  },
  // {
  //   path: 'transporte',
  //   canActivate: [],
  //   loadComponent: () => import('./admin-layout/admin-layout.component'),
  //   children: [
  //     {
  //       path: 'viaje',
  //       loadChildren: () => import('../modules/viaje/viaje.routes'),
  //     },
  //   ],
  // },
] as Routes;
