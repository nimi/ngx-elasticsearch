import { Component, OnInit, Input, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  QueryAccessor,
  PageSizeAccessor,
  block
} from '@ngx-elasticsearch/core';

const selector = 'hits';

@Component({
  selector: 'ngx-hits-list',
  template: `
    <div [attr.class]="listClassName">
      <div [attr.class]="itemClassName" *ngFor="let hit of hits">
        <ng-content *ngTemplateOutlet="itemTemplate || defaultItem; context: { $implicit: hit }"></ng-content>
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
  @Input() listType: 'list' | 'grid' = 'list';

  @Input()
  @ContentChild(NgxHitsListComponent, { read: TemplateRef })
  itemTemplate: TemplateRef<any>;

  accessor: any;
  service: NgxSearchManagerService;
  hits: any[];

  public listClassName: any;
  public itemClassName: any;

  constructor(service: NgxSearchManagerService) {
    super(service);
    this.service = service;
  }

  ngOnInit() {
    super.ngOnInit();
    this.listClassName = block(`${selector}-${this.listType}`);
    this.itemClassName = block(`${selector}-${this.listType}-hit`).mix(this.listClassName('item'));
  }

  ngAfterViewInit() {
    this.service.results$
      .subscribe((results) => {
        this.hits = results;
        console.log('hits', results);
      });
  }

  defineAccessor() {
    return new PageSizeAccessor(this.hitsPerPage);
  }

}
