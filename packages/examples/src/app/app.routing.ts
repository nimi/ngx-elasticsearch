import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImdbComponent } from './imdb/imdb.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/components',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: '/imdb',
    pathMatch: 'full'
  },
  {
    path: 'imdb',
    component: ImdbComponent
  }
];


export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
