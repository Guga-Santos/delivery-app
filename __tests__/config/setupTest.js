const { descriptionRegex } = require("../config/constants").jest;
const { basename } = require("path");
const { mysqlPool } = require("./utils/mysqlPool");

const action = require("../end-to-end/actions");

const excludeList = ["11coverage_tests.test.js"];

const {
  environment,
  database,
  puppeteer,
  frontEnd: { host },
} = require("./constants");

global.beforeAll(async () => {
  global.__DATABASE__ = mysqlPool();
  expect(await global.__DATABASE__.getConnection()).toBeTruthy();

  global.__TESTFILE__ = basename(expect.getState().testPath);

  ["development", "dev"].includes(environment) &&
    console.log(
      "\nRodando novo arquivo de teste com as configurações:\n",
      {
        file: global.__TESTFILE__,
        startedAt: new Date().toLocaleString(),
        environment,
        database,
        puppeteer,
        frontEndHost: host,
      },
      "\n"
    );
});

global.afterAll(async () => {
  if(global.__DATABASE__ && await global.__DATABASE__.getConnection()){
    await global.__DATABASE__.end();
    global.__DATABASE__ = undefined;
  }

  ["development", "dev"].includes(environment) &&
    console.log(
      `\nArquivo "${
        global.__TESTFILE__
      }" encerrado em: ${new Date().toLocaleString()}\n`
    );
});

global.beforeEach(async () => {
  global.__TESTID__ = Date.now();

  global.__TESTDESC__ = expect
    .getState()
    .currentTestName
    .trim()
    .replace(descriptionRegex, " > ");

  console.log(`Testando o requisito:\n\`${global.__TESTDESC__}\``);

  if (!excludeList.includes(global.__TESTFILE__)) {
    page && (await jestPuppeteer.resetBrowser());
    expect(await action.database.reset(global.__DATABASE__)).toBeTruthy();
  }
});

global.afterEach(async () => {
  if (!excludeList.includes(global.__TESTFILE__)) {
    page && (await expect(page).toClearStorages());
    await jestPuppeteer.resetPage();
  }
});
