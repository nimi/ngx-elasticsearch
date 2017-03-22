import { SearchBoxPage } from './app.po';

describe('search-box App', () => {
  let page: SearchBoxPage;

  beforeEach(() => {
    page = new SearchBoxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ngx works!');
  });
});
