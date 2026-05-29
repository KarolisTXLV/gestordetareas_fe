import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-gaurd-guard';

export const routes: Routes = [
  { path: 'login',    loadComponent: () => import('./components/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./components/register/register').then(m => m.RegistroComponent) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/header/header').then(m => m.Header),
    children: [
      { path: 'workspaces', loadComponent: () => import('./components/panel-espacios-trabajo/panel-espacios-trabajo').then(m => m.PanelEspaciosTrabajo) },
      { path: 'workspace',  loadComponent: () => import('./components/espacio-de-trabajo/espacio-de-trabajo').then(m => m.EspacioDeTrabajo) },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];