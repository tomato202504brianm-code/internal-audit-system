import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AuditLogs } from './pages/audit-logs/audit-logs';
import { LoginSuccess } from './pages/loginsuccess/loginsuccess';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'audit-logs', component: AuditLogs },
  { path: 'login-success', component: LoginSuccess },
];
