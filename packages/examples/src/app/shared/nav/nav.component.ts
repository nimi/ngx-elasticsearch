import { Component, Input } from '@angular/core';

@Component({
  selector: 'example-nav',
  template: `
    <nav>
      <div *ngFor="let suite of suites" class="suite">
        <span class="suiteName">
          {{ suite.name }}
        </span>
        <nav class="examples">
          <a 
            *ngFor="let c of suite.examples" 
            [routerLink]="[ '/', 'components', 'preview', suite.id, c.id ]"
            routerLinkActive="exampleLinkActive"
            class="exampleLink">
            {{ c.description }}
          </a>
        </nav>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
      width: 220px;
      max-height: 100vh;
      overflow: auto;
      box-sizing: border-box;
    }
    span, a {
      font-family: 'Open Sans', sans-serif;
      color: #EEEFF7;
    }
    .suite:not(:last-child) {
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 2px solid #232730;
    }
    .suiteName {
      display: block;
      font-size: 13px;
      margin: 12px 0 8px;
      padding: 0px 8px;
    }
    .exampleLink {
      font-size: 11px;
      color: #626D79;
      display: block;
      text-decoration: none;
      margin: 10px 0px;
      padding: 8px;
      margin: 4px 0px;
      transition: all 200ms;
    }
    .exampleLink.exampleLinkActive, .exampleLink:hover {
      color: white;
      background-color: #1D202B;
    }
  `]
})
export class NavComponent {
  @Input() suites: any[] = [];
  @Input() activeExample: any;
}
