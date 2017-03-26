import { createSuite } from '../utils/example';
import { useControls, text, boolean } from '../shared/services/control-utils';
import { NgxSearchBoxComponent } from '@ngx-elasticsearch/search-box';

export const suite = () =>
  createSuite(NgxSearchBoxComponent.name)
    .addPlugin(useControls)
    .addExample('simple example', {
      template: () => `<ngx-search-box></ngx-search-box>`,
      showSource: true
    })

    .addExample('simple w/ placeholder example', {
      context: () => ({
        placeholder: text('Placeholder', 'placeholder!'),
        searchOnChange: boolean('searchOnChange', true)
      }),
      template: () => `
        <ngx-search-box [placeholder]="placeholder" [searchOnChange]="searchOnChange">
        </ngx-search-box>
      `,
      showSource: true
    })
    .addExample('custom query fields', {
      context: () => ({ placeholder: 'placeholder' }),
      template: () => `<ngx-search-box [queryFields]="['desc^5']"></ngx-search-box>`,
      showSource: true
    });
