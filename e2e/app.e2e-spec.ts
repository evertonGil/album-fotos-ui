import { AppPage } from './app.po';
import { element, by, browser } from 'protractor';
var path = require('path');

describe('album-fotos-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('a pagina Deve ter um titulo', () => {
    page.navigateTo('/');
    expect(page.title).toEqual('Editor de Fotos');
  });

  describe('Ao clicar no botão de +', () => {

    it('deve abrir um seletor de imagem', () => {

      var fileToUpload = 'v.txt',
        absolutePath = path.resolve(__dirname, fileToUpload);

        console.log('[absolutePath]: ', absolutePath);

      browser.executeAsyncScript(function (callback) {
        // You can use any other selector
        document.querySelector('#upload').style.display = 'inline';
        callback();
      });

      element(by.id('upload')).sendKeys(absolutePath);
      element(by.id('upload')).click();

      expect(page.title).toEqual('Editor de Fotos');
    });
  });


});
