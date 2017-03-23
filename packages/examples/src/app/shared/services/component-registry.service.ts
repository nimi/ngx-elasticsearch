import { Injectable, OpaqueToken, Inject } from '@angular/core';
import { ComponentExample, ComponentExampleSuite } from '../models/component-example';

export const COMPONENT_EXAMPLE_SUITES = new OpaqueToken('Component Example Suites');

export type IdMap<T extends { id: string }> = { [id: string]: T }

@Injectable()
export class ComponentRegistryService {
  exampleSuites: IdMap<ComponentExampleSuite> = {};
  examples: IdMap<ComponentExample> = {};

  constructor(@Inject(COMPONENT_EXAMPLE_SUITES) exampleSuites: ComponentExampleSuite[]) {
    this.exampleSuites = exampleSuites.reduce<IdMap<ComponentExampleSuite>>(byId, {});
    this.examples = exampleSuites.reduce<IdMap<ComponentExample>>((all, next) => {
      return Object.assign(all, next.examples.reduce<IdMap<ComponentExample>>(byId, {}));
    }, {});
  }

  getComponent(id: string): ComponentExampleSuite {
    return this.exampleSuites[id];
  }

  getComponentExample(id: string): ComponentExample {
    return this.examples[id];
  }

  getAllComponents() {
    return Object.keys(this.exampleSuites)
      .map(key => this.exampleSuites[key]);
  }
}

function byId<T extends { id: string }>(entities: IdMap<T> = {}, next: T): IdMap<T> {
  return { ...entities, [next.id]: next };
}


export function provideExperiments(exampleSuites: ComponentExampleSuite[]) {
  return { provide: COMPONENT_EXAMPLE_SUITES, useValue: exampleSuites };
}
