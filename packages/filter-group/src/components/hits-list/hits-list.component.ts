import { Component, OnInit, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  QueryAccessor,
  PageSizeAccessor
} from '@ngx-elasticsearch/core';

@Component({
  selector: 'ngx-hits-list',
  template: `
    <div class="ngx-hits-list">
      <div *ngFor="let hit of hits">
        <ng-container *ngTemplateOutlet="itemTemplate || defaultItem; context: { $implicit: hit }"></ng-container>
      </div>
    </div>
    <ng-template #defaultItem let-hit>
      <ngx-hits-list-item [item]="hit"></ngx-hits-list-item>
    </ng-template>
  `,
})
export class NgxHitsListComponent extends NgxElasticsearchComponent {
  @ViewChild('defaultItem') defaultItemTemplate;
  /**
   * Number of results per page
   * @type {number}
   */
  @Input() hitsPerPage: number = 10;
  @Input() itemTemplate: TemplateRef;

  accessor: any;
  service: NgxSearchManagerService;
  hits: any[];

  constructor(service: NgxSearchManagerService) {
    super(service);
    this.service = service;
  }

  ngOnInit() {
    super.ngOnInit();
    this.service.searchManager.emitter.addListener(() => {
      this.hits = this.service.searchManager.getHits();
    });
    // this.hits = this.service.manager.getHits();
  }

  defineAccessor() {
    return new PageSizeAccessor(this.hitsPerPage);
  }

}
