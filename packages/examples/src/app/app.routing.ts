import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootContainerComponent } from './shared/containers/root-container/root-container.component';
import { PreviewContainerComponent } from './shared/containers/preview-container/preview-container.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/components',
    pathMatch: 'full'
  },
  {
    path: 'components',
    component: RootContainerComponent,
    children: [
      {
        path: 'preview/:componentID/:versionID',
        component: PreviewContainerComponent
      },
    ],
  },
];


export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
