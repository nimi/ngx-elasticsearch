import { browser, element, by } from 'protractor';

export class SearchBoxPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ngx-root h1')).getText();
  }
}
