import { BookAppPage } from './app.po';

describe('book-app App', () => {
  let page: BookAppPage;

  beforeEach(() => {
    page = new BookAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
