import { Component } from '@angular/core';
import { ComponentRegistryService } from '../shared/services/component-registry.service';

@Component({
  selector: 'example-root-container',
  template: `
    <example-layout>
      <md-sidenav-container>
        <md-sidenav mode="side" opened="true">
            <example-nav [suites]="suites"></example-nav>
        </md-sidenav>
        <div class="my-content inner-container">
          <div>
            <router-outlet></router-outlet>
          </div>
          <div>
            <example-controls-container></example-controls-container>
          </div>
        </div>
      </md-sidenav-container>
    </example-layout>
  `,
  styles: [`
    md-sidenav {
      width: 250px;
    }

    .grow {
      flex-grow: 5;
      overflow: hidden;
    }
    
    .inner-container {
       display: flex;
       flex-direction: column;
       height: 100vh;
    }
    
    .inner-container > div:first-child {
      flex: 1 1 auto;
      height: calc(100% - 200px);
    }
    
    .inner-container > div:last-child {
        height: 200px;
    }
  `]
})
export class RootContainerComponent {
  suites: any[];

  constructor(registry: ComponentRegistryService) {
    this.suites = registry.getAllComponents();
  }
}
