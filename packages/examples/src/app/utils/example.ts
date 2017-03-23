import { ComponentExample, ComponentExampleSuite } from '../shared/models/component-example';

export interface ExampleConfig {
  context?: any;
  template: string;
  showSource?: boolean;
  styles?: string[];
}

export class ExampleSuite implements ComponentExampleSuite {
  id: string;
  examples: ComponentExample[] = [];
  private _callCount = 0;

  constructor(public name: string, public module?: any) {
    this.id = `exp-${module ? module.id : name}`;
  }

  addExample(description: string, config: ExampleConfig): this {
    this.examples.push({
      id: `${this.id}-${++this._callCount}`,
      description,
      template: config.template,
      context: config.context,
      showSource: config.showSource,
      styles: config.styles
    });

    return this;
  }

  xaddExample(description: string, config: ExampleConfig): this {
    return this;
  }
}

export function createSuite(component: string, module?: any): ExampleSuite {
  return new ExampleSuite(component, module);
}
