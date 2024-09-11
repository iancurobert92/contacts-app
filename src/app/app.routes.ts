import { Routes } from '@angular/router';
import { anonGuard, authGuard } from './auth/guards';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contacts',
  },
  {
    path: 'contacts',
    loadComponent: () => import('./auth/components/login/login.component').then((c) => c.LoginComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component').then((c) => c.LoginComponent),
    canActivate: [anonGuard],
  },
];
