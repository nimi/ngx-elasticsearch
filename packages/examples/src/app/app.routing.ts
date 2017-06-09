import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/components',
    pathMatch: 'full'
  }
];


export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
