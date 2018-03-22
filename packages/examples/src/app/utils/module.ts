import { NgModule, Component, NgZone } from '@angular/core';
import { flatten } from 'lodash';

import { ControlManagerService } from '../shared/services/control-manager.service';
import { manager } from '../shared/services/control-utils';
import { Subscription } from 'rxjs/Rx';

export function getModuleForExamples(inputModule: any, suites: any[]) {
  const componentsWithIds = flatten(suites.map(e => e.examples.map(c => {
    return {
      id: c.id,
      component: generateComponent(c)
    }
  })));

  const components = componentsWithIds.reduce((all, next) => {
    return Object.assign(all, { [next.id]: next.component });
  }, {});

  const ngModule = generateNgModule(inputModule, componentsWithIds.map(e => e.component));

  return { ngModule, components };
}

export function generateComponent(example: any) {
  @Component({
    template: example.template(),
    styles: example.styles
  })
  class ExampleComponent {
    manager: ControlManagerService = manager;
    channelSub: Subscription;

    constructor(private zone: NgZone) {
      Object.assign(this, example.context ? example.context() : {});
    }

    ngOnInit() {
      this.channelSub = this.manager.channel.subscribe((val) => {
        Object.assign(this, val);
      })
    }

    ngOnDestroy() {
      this.manager.resetStore();
      this.channelSub.unsubscribe();
    }
  }

  return ExampleComponent;
}

export function generateNgModule(inputModule: any, components: any) {
  @NgModule({
    imports: [
      inputModule
    ],
    declarations: [
      components
    ],
    entryComponents: [
      components
    ]
  })
  class ExampleSuiteModule { }


  return ExampleSuiteModule;
}
