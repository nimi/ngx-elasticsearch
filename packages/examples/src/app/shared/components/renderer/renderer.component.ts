import {
  Component,
  ComponentRef,
  Injector,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ComponentService } from '../../services/component.service';
import { ComponentRegistryService } from '../../services/component-registry.service';

@Component({
  selector: 'example-renderer',
  template: `
    <div class="example" #exampleContainer></div>
    <details *ngIf="source">
        <summary style="margin: 1em auto">Source</summary>
        <pre>{{source}}</pre>
    </details>`
})
export class RendererComponent implements OnDestroy {
  private _ref: ComponentRef<any>;
  public source: string;
  @ViewChild('exampleContainer', { read: ViewContainerRef }) public exampleContainer: ViewContainerRef;

  constructor(
    private componentFactory: ComponentService,
    private componentRegistry: ComponentRegistryService,
    private injector: Injector,
  ) { }

  @Input() set id(id: string) {
    this._cleanup();

    const { factory, injector } = this.componentFactory.compileComponent(id, this.injector);

    this._ref = this.exampleContainer.createComponent(factory, 0, injector, []);
    const componentCase = this.componentRegistry.getComponentExample(id);
    this.source = componentCase.showSource ? componentCase.template : '';
  }

  ngOnDestroy() {
    this._cleanup();
  }

  private _cleanup() {
    if (this._ref) {
      this._ref.destroy();
      this._ref = null;
    }
  }
}
