import {
  Component,
  ComponentRef,
  Injector,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ComponentService } from '../../shared/services/component.service';
import { ComponentRegistryService } from '../../shared/services/component-registry.service';

@Component({
  selector: 'example-renderer',
  template: `
    <div class="example" #exampleContainer></div>
    <details *ngIf="source">
        <summary>Source</summary>
        <pre style="white-space: pre-wrap;">{{source}}</pre>
    </details>`
})
export class RendererComponent implements OnDestroy {
  private _ref: ComponentRef<any>;
  public source: any;
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
    this.source = componentCase.showSource ? componentCase.template : () => {};

    if (typeof this.source === 'function') {
      this.source = this.source();
    }
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
