import { AngularWebV2Page } from './app.po';

describe('angular-web-v2 App', function() {
  let page: AngularWebV2Page;

  beforeEach(() => {
    page = new AngularWebV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
