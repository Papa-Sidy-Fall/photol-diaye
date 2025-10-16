import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard'; // Assurez-vous que ce chemin est correct

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' }, // Redirect root to products
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products-module').then(m => m.ProductsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule), // Nous allons créer ce module
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  }
];
