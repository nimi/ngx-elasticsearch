export interface ComponentExample {
  id: string;
  description: string;
  context?: any;
  template: string;
  styles?: string[];
  showSource?: boolean;
}

export interface ComponentExampleSuite {
  id: string;
  name: string;
  module?: NodeModule;
  examples: ComponentExample[];
}
