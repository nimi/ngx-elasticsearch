export interface ComponentExample {
  id: string;
  description: string;
  context?: any;
  template: string | Function;
  styles?: string[];
  showSource?: boolean;
}

export interface ComponentExampleSuite {
  id: string;
  name: string;
  module?: any;
  examples: ComponentExample[];
}
