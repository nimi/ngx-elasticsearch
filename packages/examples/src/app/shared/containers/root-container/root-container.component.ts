import { Component } from '@angular/core';
import { ComponentRegistryService } from '../../services/component-registry.service';

@Component({
  selector: 'example-root-container',
  template: `
    <example-layout>
      <example-nav [suites]="suites"></example-nav>
      <div class="grow">
        <router-outlet></router-outlet>
      </div>
    </example-layout>
  `,
  styles: [`
    .grow {
      flex-grow: 5;
    }
  `]
})
export class RootContainerComponent {
  suites: any[];

  constructor(registry: ComponentRegistryService) {
    this.suites = registry.getAllComponents();
  }
}
