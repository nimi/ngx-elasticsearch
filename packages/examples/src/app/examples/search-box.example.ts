import { createSuite } from '../utils/example';
import { NgxSearchBoxComponent } from '@ngx-elasticsearch/search-box';

export const suite = () =>
  createSuite(NgxSearchBoxComponent.name)
    .addExample('simple example', {
      template: `<ngx-search-box></ngx-search-box>`,
      showSource: true
    })
    .addExample('simple w/ placeholder example', {
      context: {
        placeholder: 'placeholder'
      },
      template: `<ngx-search-box [placeholder]="placeholder"></ngx-search-box>`,
      showSource: true
    });
