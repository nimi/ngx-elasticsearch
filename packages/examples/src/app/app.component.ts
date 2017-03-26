import { Component, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'example-app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
    @import 'https://fonts.googleapis.com/css?family=Open+Sans:400,700';
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
      display: block;
    }
    body {
      line-height: 1;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
  `]
})
export class AppComponent {

  constructor(private http: Http) {
    this.http.post(
      'http://localhost:9200/_search',
      // {"query":{"bool":{"should":[{"simple_query_string":{"query":"M*","fields":["_all"]}},{"multi_match":{"query":"M*","type":"phrase_prefix","fields":["_all"]}}]}}}
      {"query":{"simple_query_string":{"query":"mikael*","fields":["desc^5"]}}}
    )
      .subscribe((res) => {
        const data = res.json();
        console.log('POSTED', data);
      })
  }
}
