import { Component, OnInit, Input, ViewChild, Output, TemplateRef, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  NgxElasticsearchComponent,
  NgxSearchManagerService,
  NoFiltersHitCountAccessor,
  SuggestionsAccessor,
  SearchManager,
  block
} from '@ngx-elasticsearch/core';

const selector = 'no-hits';

@Component({
  selector: 'ngx-es-no-hits',
  template: `
    <div *ngIf="!hasError && hasSuggestion">
      <ng-content
        *ngTemplateOutlet="noHitTemplate || defaultTemplate; context: { $implicit: item }">
      </ng-content>
    </div>
    <div *ngIf="hasError && !hasSuggestion">
      <ng-content
        *ngTemplateOutlet="noHitErrorTemplate || defaultErrorTemplate; context: { $implicit: item }">
      </ng-content>
    </div>
    <ng-template #defaultTemplate let-item>
      <div [attr.class]="className">
        <div [attr.class]="className('info')">
          {{ item.noResultsLabel }}
        </div>
        <div
          [attr.class]="className('steps')"
        >
          <div 
            *ngIf="item.suggestion"
            (click)="setQueryString(item.suggestion)"
            [attr.class]="className('step-action')">
            {{ item.didYouMeanLabel + ' ' + item.suggestion }} 
          </div>
          <div 
            *ngIf="!item.suggestion && item.filtersCount > 0"
            (click)="resetFilters()"
            [attr.class]="className('step-action')">
            {{ item.resetFiltersLabel + ' ' + item.query }} 
          </div>
        </div>
      </div>
    </ng-template>
    <ng-template #defaultErrorTemplate let-item>
      <div [attr.class]="className">
        <div [attr.class]="className('info')">
          {{ item.errorLabel }}
        </div>
        <div
          (click)="resetSearch()"
          [attr.class]="className('steps')"
        >
          <div [attr.class]="className('step-action')">
            {{ item.tryAgainLabel }}
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: []
})
export class NgxNoHitsComponent extends NgxElasticsearchComponent implements OnInit {
  @ViewChild('defaultErrorTemplate') defaultErrorTemplate: TemplateRef<any>;
  @ViewChild('defaultTemplate') defaultTemplate: TemplateRef<any>;

  @Input() translations: any = {
		noResultsFoundLabel: "No results found for {query}.",
		noResultsDdYouMeanLabel: "No results found for {query}. Did you mean {suggestion}?",
		searchForSuggestionLabel: "Search for {suggestion} instead",
		searchWithoutFiltersLabel: "Search for {query} without filters",
		errorLabel: "We're sorry, an issue occurred when fetching your results. Please try again.",
		resetLabel: "Reset Search"
	}

  @Input() suggestionsField: string;

  @Input() noHitTemplate: TemplateRef<any>;
  @Input() noHitErrorTemplate: TemplateRef<any>;

  public className: any = block(selector);
  public hasError: boolean = false;
  public hasSuggestion: boolean = false;
  public messages: any;
  public item: any = {};

  private resultsSub: Subscription;
  private noFiltersAccessor: NoFiltersHitCountAccessor;
  private suggestionsAccessor: SuggestionsAccessor;

  constructor(private service: NgxSearchManagerService) {
    super(service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.messages = this.translations;
    this.noFiltersAccessor = this.service.manager.addAccessor(
      new NoFiltersHitCountAccessor()
    );

    if (this.suggestionsField) {
      this.suggestionsAccessor = this.service.manager.addAccessor(
        new SuggestionsAccessor(this.suggestionsField)
      );
    }

    this.resultsSub = this.service.results$
      .subscribe(results => {
        if ((this.hasHits() || this.isInitialLoading() || this.isLoading()) && !this.getError()) {
          return;
        }

        if (this.getError()) {
          this.hasError = true;
          this.hasSuggestion = false;
          return;
        }

        const suggestion = this.getSuggestion();
        const query = this.getQuery().getQueryString();
        this.hasError = false;
        this.hasSuggestion = true;
        this.item = {
          noResultsLabel: 'No Results',
          didYouMeanLabel: 'Did you mean?',
          resetFiltersLabel: 'Reset Filters label',
          suggestion,
          query,
          filtersCount: this.getFilterCount()
        };
      });
  }

  private getSuggestion() {
		return this.suggestionsAccessor && this.suggestionsAccessor.getSuggestion();
	}

	private setQueryString(query) {
		this.service.manager.getQueryAccessor().setQueryString(query, true);
		this.service.search(true);
	}

	private resetFilters() {
		this.service.manager.getQueryAccessor().keepOnlyQueryState();
		this.service.search(true);
	}

	private resetSearch() {
		this.service.manager.getQueryAccessor().resetState();
		this.service.search(true);
	}

	private getFilterCount() {
		return this.noFiltersAccessor && this.noFiltersAccessor.getCount();
	}

  private hasHits() { return super.hasHits(); }
  private isInitialLoading() { return super.isInitialLoading(); }
  private isLoading() { return super.isLoading(); }
  private getError() { return super.getError(); }
  private getQuery() { return super.getQuery(); }

}
