import { Routes } from '@angular/router';
import { authGuard } from '@app/common/guards/auth.guard';

export default [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    canActivate: [],
    loadComponent: () => import('./admin-layout/admin-layout.component'),
    children: [
      {
        path: '',
        loadChildren: () => import('../modules/inicio/inicio.routes'),
      },
    ],
  },
  {
    path: 'carga-masiva',
    canActivate: [authGuard],
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
