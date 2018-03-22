import { Component, Input } from '@angular/core';

@Component({
  selector: 'example-nav',
  template: `
    <nav *ngFor="let suite of suites" class="suite">
      <span class="suiteName">
        {{ suite.name }}
      </span>
      <ul class="examples">
        <li *ngFor="let c of suite.examples">
          <a  
            [routerLink]="[ '/', 'components', 'preview', suite.id, c.id ]"
            routerLinkActive="exampleLinkActive"
            class="exampleLink">
            {{ c.description }}
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
      width: 100%;
      max-height: 100vh;
      overflow-y: auto;
      box-sizing: border-box;
    }
    span {
      border: none;
      font-size: 10px;
      letter-spacing: 1px;
      line-height: 24px;
      text-transform: uppercase;
      font-weight: 400;
      margin: 0;
      padding: 0 16px;
    }
    span, a {
      font-family: 'Open Sans', sans-serif;
      color: #EEEFF7;
    }
    
    li {
      border-bottom-width: 1px;
      border-bottom-style: solid;
      margin: 0;
      padding: 0;
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
      padding: 8px;
      margin: 4px 0px;
      transition: all 200ms;
    }
    .exampleLink.exampleLinkActive, .exampleLink:hover {
      font-weight: 700;
    }
  `]
})
export class NavComponent {
  @Input() suites: any[] = [];
  @Input() activeExample: any;
}
