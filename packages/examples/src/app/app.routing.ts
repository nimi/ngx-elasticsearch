import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HockeyEventsComponent } from './hockey-events/hockey-events.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/hockey-events',
    pathMatch: 'full'
  },
  {
    path: 'hockey-events',
    component: HockeyEventsComponent
  }
];


export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
