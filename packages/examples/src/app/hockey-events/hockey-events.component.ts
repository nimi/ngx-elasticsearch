import { Component, OnDestroy } from '@angular/core';
import { TermQuery, BoolShould } from '@ngx-elasticsearch/core';

@Component({
  selector: 'example-imdb',
  template: `
    <ngx-es-layout>
      <ngx-es-top-bar>
        <div class="my-logo">Ngx Elasticsearch Demo</div> 
        <ngx-es-search-box [queryFields]="['desc^5']"></ngx-es-search-box>
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
          <ngx-es-dynamic-range-filter
            [field]="'ycoord'"
            [id]="'ycoord'"
            [title]="'Y Coordinate'"
            [showHistogram]="false"
          >
          </ngx-es-dynamic-range-filter>
          <ngx-es-facet-filter
            [id]="'type'"
            [title]="'Type'"
            [field]="'type.keyword'"
            [operator]="'OR'"
            [size]="10"
          >
          </ngx-es-facet-filter>
          <ngx-es-numeric-refinement-list-filter
            [id]="'period'"
            [title]="'Period'"
            [field]="'period'"
            [options]="[
              { title: 'All' },
              { title: 'Up to Third Period', from: 0, to: 3 },
              { title: 'After Third Period', from: 4, to: 6 }
            ]"
          >
          </ngx-es-numeric-refinement-list-filter>
          <ngx-es-checkbox-filter
            [id]="'tom'"
            [title]="'Events with...'"
            [label]="'Players named Tom Wilson'"
            [filter]="checkboxFilterQuery"
          >
          </ngx-es-checkbox-filter>
          <ngx-es-input-filter
            [id]="'teamnick_opposing'"
            [title]="'Opposing Team'"
            [placeholder]="'Search teams'"
            [searchOnChange]="true"
            [prefixQueryFields]="['teamnick_opposing']"
            [queryFields]="['teamnick_opposing']"
          >
          </ngx-es-input-filter>
        </ngx-es-side-bar>
        <ngx-es-layout-results>
          <ngx-es-action-bar>
            <ngx-es-action-bar-row>
              <ngx-es-hits-stats></ngx-es-hits-stats>
              <ngx-es-sorting-selector
                [options]="sortingSelectorOptions"
              >
              </ngx-es-sorting-selector>
              <ngx-es-page-size-selector
                [options]="[10, 25, 50]"
              >
              </ngx-es-page-size-selector>
            </ngx-es-action-bar-row>
            <ngx-es-action-bar-row>
              <ngx-es-selected-filters></ngx-es-selected-filters>
              <ngx-es-reset-filter></ngx-es-reset-filter>
            </ngx-es-action-bar-row>
          </ngx-es-action-bar>
          <ngx-es-hits-list 
            [listType]="'grid'"
            [itemTemplate]="item">
            <ng-template #item let-hit>
              <example-hits-list-item
                [hit]="hit"
              >
              </example-hits-list-item>
            </ng-template>
          </ngx-es-hits-list>
          <ngx-es-no-hits [suggestionsField]="'p1name'"></ngx-es-no-hits>
          <ngx-es-pagination [showNumbers]="true"></ngx-es-pagination>
        </ngx-es-layout-results>
      </ngx-es-layout-body>
    </ngx-es-layout>
    
  `
})
export class HockeyEventsComponent {

  public sortingSelectorOptions: any[] = [
    {label:"Relevance", field:"_score", order:"desc",defaultOption:true},
    {label:"Newest", field:"timestamp", order:"desc"},
    {label:"Oldest", field:"timestamp", order:"asc"}
  ];

  public checkboxFilterQuery: BoolShould = BoolShould([
    new TermQuery('p1name.keyword', 'Tom Wilson'),
    new TermQuery('p2name.keyword', 'Tom Wilson')
  ]);
}
