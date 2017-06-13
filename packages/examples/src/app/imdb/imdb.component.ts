import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'example-imdb',
  template: `
    <ngx-es-layout>
      <ngx-es-top-bar>
        <div class="my-logo">Ngx Elasticsearch Demo</div> 
        <ngx-search-box [queryFields]="['desc^5']"></ngx-search-box>
      </ngx-es-top-bar>
      <ngx-es-layout-body>
        <ngx-es-side-bar>
          Filters
          <ngx-es-hierarchical-menu-filter
            [fields]="['teamnick.keyword']"
            [title]="'Team'"
            [id]="'team'"
          >
          </ngx-es-hierarchical-menu-filter>
        </ngx-es-side-bar>
        <ngx-es-layout-results>
          <ngx-es-action-bar>
            <ngx-es-action-bar-row>
              Action Row 1
            </ngx-es-action-bar-row>
            <ngx-es-action-bar-row>
              Action Row 2
            </ngx-es-action-bar-row>
          </ngx-es-action-bar>
          <ngx-hits-list 
            [listType]="'grid'"
            [itemTemplate]="item">
            <ng-template #item let-hit>
              <example-hits-list-item
                [hit]="hit"
              >
              </example-hits-list-item>
            </ng-template>
          </ngx-hits-list>
        </ngx-es-layout-results>
      </ngx-es-layout-body>
    </ngx-es-layout>
    
  `
})
export class ImdbComponent implements OnDestroy {

  ngOnDestroy() {}

}
