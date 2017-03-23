import { Type, ModuleWithProviders } from '@angular/core';
import { ComponentExample } from './component-example';

export interface ExampleSuiteModule {
  module?: any;
  ngModule: Type<any> | ModuleWithProviders;
  loadExperiments(): ComponentExample[];
}

export interface ResolvedExampleSuiteModule {
  ngModule: Type<any>;
  components: any; // { [id: string]: Type<any> };
}
