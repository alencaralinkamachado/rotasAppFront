import { RotasAppFrontPage } from './app.po';

describe('rotas-app-front App', () => {
  let page: RotasAppFrontPage;

  beforeEach(() => {
    page = new RotasAppFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
