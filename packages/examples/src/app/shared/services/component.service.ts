import { Injectable, Compiler, NgModuleFactory, OpaqueToken, Inject, Injector, ComponentFactory } from '@angular/core';
import { ResolvedExampleSuiteModule } from '../models/example-module';

export const EXAMPLE_MODULE = new OpaqueToken('Example Module');

export interface CompiledExperiment {
  injector: Injector;
  factory: ComponentFactory<any>;
}

@Injectable()
export class ComponentService {
  private _lab: ResolvedExampleSuiteModule;
  private _factory: NgModuleFactory<any>;

  constructor(@Inject(EXAMPLE_MODULE) lab: ResolvedExampleSuiteModule, compiler: Compiler) {
    this._lab = lab;
    this._factory = compiler.compileModuleSync(lab.ngModule);
  }

  compileComponent(id: string, injector: Injector): CompiledExperiment {
    const component = this._lab.components[id];
    const ref = this._factory.create(injector);
    const factory = ref.componentFactoryResolver.resolveComponentFactory(component);

    return { factory, injector: ref.injector };
  }
}

export function provideResolvedExampleModule(lab: ResolvedExampleSuiteModule) {
  return { provide: EXAMPLE_MODULE, useValue: lab };
}
