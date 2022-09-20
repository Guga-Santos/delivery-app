const PuppeteerEnvironment = require("jest-environment-puppeteer");
const { requirements } = require("../../.trybe/requirements.json");

class CustomEnvironment extends PuppeteerEnvironment {
  async setup() {
    await super.setup();

    // Suite sandbox globals setup
    this.global.__REQUIREMENTS__ = (id) => 
      (requirements[id-1] && requirements[id-1].description) ||
      `${id}. Descrição não definida`

    this.global.__DATABASE__ = {};
    this.global.__TESTID__ = "";
    this.global.__TESTDESC__ = "";
    this.global.__TESTFILE__ = "";

    this.global.page =
      (await this.global.browser.pages())[1] ||
      (await this.global.browser.newPage());
    
    await this.global.page.setCacheEnabled(false);
  }

  async teardown() {
    // Suite default teardown
    await super.teardown();
  }
}

module.exports = CustomEnvironment;
