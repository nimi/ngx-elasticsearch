import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  SearchManager,
  block
} from '@ngx-elasticsearch/core';

const selector = 'hits-stats';

@Component({
  selector: 'ngx-es-hits-stats',
  template: `
    <div class="{{ className }}">
      <div class="{{ className('info') }}">
        {{ resultsLabel }}
      </div>
    </div>
  `,
  styles: []
})
export class NgxHitsStatsComponent extends NgxElasticsearchComponent implements OnInit {

  @Input() translations: any = {
    resultsFoundLabel: (num, time) => `${num} results found in ${time} ms`
  };

  @Input() className: any = block(selector);

  @Input() countFormatter: Function = x => x;

  public messages: any;
  public hitCount: number = 0;
  public timeTaken: number = 0;
  public resultsLabel: string;

  private resultsSub: Subscription;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.messages = this.translations;

    this.resultsSub = this.service.results$
      .subscribe(results => {
        this.hitCount = this.getHitsCount();
        this.timeTaken = this.getTimeTaken();
        this.resultsLabel = this.messages.resultsFoundLabel(
          this.hitCount, this.timeTaken
        );
      });
  }

  ngOnDestroy() {
    this.resultsSub.unsubscribe();
  }

  private getTimeTaken() {
    return this.service.manager.getTime();
  }

  private getHitsCount() {
    return this.service.manager.getHitsCount();
  }

}
