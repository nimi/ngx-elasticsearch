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
          <ngx-es-hierarchical-menu-filter
            [fields]="['teamnick.keyword', 'p1name.keyword']"
            [title]="'Categories'"
            [id]="'categories'"
          >
          </ngx-es-hierarchical-menu-filter>
          <ngx-es-range-filter
            [min]="0"
            [max]="100"
            [field]="'xcoord'"
            [id]="'xcoord'"
            [title]="'X Coordinate'"
            [showHistogram]="false"
          >
          </ngx-es-range-filter>
          <ngx-es-facet-filter
            [id]="'type'"
            [title]="'Type'"
            [field]="'type.keyword'"
            [operator]="'OR'"
            [size]="10"
          >
          </ngx-es-facet-filter>
        </ngx-es-side-bar>
        <ngx-es-layout-results>
          <ngx-es-action-bar>
            <ngx-es-action-bar-row>
              Action Row 1
            </ngx-es-action-bar-row>
            <ngx-es-action-bar-row>
              <ngx-es-selected-filters
                (onFilterChange)="handleFilterChange($event)"
              ></ngx-es-selected-filters>
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

  handleFilterChange(filters: any[]) {
    console.log('filty', filters);
  }

}
