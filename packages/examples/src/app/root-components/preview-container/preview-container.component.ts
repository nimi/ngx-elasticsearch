
import { pluck } from 'rxjs/operator/pluck';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'example-preview-container',
  template: `
    <example-stage>
      <example-renderer [id]="exampleID$ | async"></example-renderer>
    </example-stage>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
  `]
})
export class PreviewContainerComponent {
  exampleID$: Observable<string>;

  constructor(route: ActivatedRoute) {
    this.exampleID$ = pluck.call(route.params, 'versionID');
  }
}
