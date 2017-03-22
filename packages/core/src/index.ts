import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxElasticsearchComponent } from './SearchComponent';
import { NgxSearchManagerService } from './SearchManagerService';
import { SearchManager } from './SearchManager';

export * from './history';
export * from './SearchManager';
export * from './AccessorManager';
export * from './SearchRequest';

export * from './accessors';
export * from './query';
export * from './state';
export * from './transport';

export * from './SearchManagerService';
export * from './SearchComponent';

let config = { url: '', options: {} };
export let searchManagerFactory = () => {
  const searchManager = new SearchManager(config.url, config.options);
  const service = new NgxSearchManagerService();
  console.log(config);
  service.initialize(searchManager);
  return service;
};

@NgModule({
  declarations: [
    NgxElasticsearchComponent
  ],
  exports: [
    NgxElasticsearchComponent
  ],
  providers: [
    NgxSearchManagerService
  ]
})
export class NgxElasticsearchModule {
  static forRoot(conf?: any): ModuleWithProviders {
    Object.assign(config, conf || {});
    return {
      ngModule: NgxElasticsearchModule,
      providers: [
        {
          provide: NgxSearchManagerService,
          useFactory: searchManagerFactory
        }
      ]
    };
  }
}