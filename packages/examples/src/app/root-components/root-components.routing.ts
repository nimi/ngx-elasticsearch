import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootContainerComponent } from './root-container.component';
import { PreviewContainerComponent } from './preview-container/preview-container.component';


const routes: Routes = [
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
