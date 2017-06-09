import { ComponentExample, ComponentExampleSuite } from '../shared/models/component-example';

export interface ExampleConfig {
  context?: any;
  template: Function | string;
  showSource?: boolean;
  styles?: string[];
}

export class ExampleSuite implements ComponentExampleSuite {
  id: string;
  examples: ComponentExample[] = [];
  plugins: any[] = [];
  private _callCount = 0;
  private kind: string;

  constructor(public name: string, public module?: any) {
    this.kind = module ? module.id : name;
    this.id = `exp-${this.name}`;
  }

  addPlugin(fn: Function) {
    fn((v) => {}, { kind: this.kind, example: this.id });

    return this;
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
