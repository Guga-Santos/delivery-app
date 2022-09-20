const { internet } = require("@faker-js/faker/locale/pt_BR");

const requirement = global.__REQUIREMENTS__;
const action = require("./actions");

const loginPage = require("../selectors/common/login");
const users = require("../entities/users");

const { host } = require("../config/constants").frontEnd;
const { zero, one } = require("../config/constants").common;
const { notFound } = require("../config/constants").httpCodes;

const passwordMinLen = 6;

let database;

beforeEach(async () => {
  database = global.__DATABASE__;
  await expect(database).toReturnDataWith({
    query: users.query,
    types: users.types,
    compare: users.state01,
  });

  await expect(page).toNavigate(`${host}/login`);
  await expect(page).toCompareURL(`${host}/login`);
});

describe(requirement(1), () => {
  test("O avaliador navegará para o endereço do host utilizando o endpoint '/'", async () => {
    await expect(page).toNavigate(`${host}/`);
    await expect(page).toCompareURL(`${host}/login`);
  });
  test("O avaliador navegará para o endereço do host utilizando o endpoint '/login'", async () => {
    await expect(page).toNavigate(`${host}/login`);
    await expect(page).toCompareURL(`${host}/login`);
  });
});

describe(requirement(2), () => {
  test("O avaliador buscará pelos elementos fundamentais aos demais testes", async () => {
    await expect(page).toFindElement(loginPage.input.login);
    await expect(page).toFindElement(loginPage.input.password);
    await expect(page).toFindElement(loginPage.button.login.default);
    await expect(page).toFindElement(loginPage.button.register);
  });
});

describe(requirement(3), () => {
  const logins = [
    {
      email: "cliente@email",
      password: internet.password(passwordMinLen),
      valid: false,
    },
    {
      email: internet.email().toLowerCase(),
      password: internet.password(passwordMinLen - 1),
      valid: false,
    },
    {
      email: internet.email().toLowerCase(),
      password: internet.password(passwordMinLen),
      valid: true,
    },
  ];

  const baseTest = async (email, password, valid) => {
    await expect(page).toFindElement(loginPage.button.login.disabled);

    await expect(page).toTypeInInput(loginPage.input.login, email);
    await expect(page).toFindElement(loginPage.button.login.disabled);

    await expect(page).toTypeInInput(
      loginPage.input.password,
      password.substr(zero, password.length - one)
    );
    await expect(page).toFindElement(loginPage.button.login.disabled);
    await expect(page).toTypeInInput(
      loginPage.input.password,
      password.substr(-one)
    );
    await expect(page).toFindElement(
      loginPage.button.login[valid ? "notDisabled" : "disabled"]
    );

    return true;
  };

  test.each(logins)(
    "O avaliador testará isoladamente o caso: `%p`",
    async ({ email, password, valid }) => {
      expect(await baseTest(email, password, valid)).toBeTruthy();
    }
  );
  test("O avaliador testará os casos anteriores de forma seguida, sem recarregar a página", async () => {
    for (const { email, password, valid } of logins) {
      expect(await baseTest(email, password, valid)).toBeTruthy();

      await expect(page).toClearTextFromInput(loginPage.input.login);
      await expect(page).toClearTextFromInput(loginPage.input.password);

      await page.waitForTimeout(2000);
    }
  });
});

describe(requirement(4), () => {
  const login = {
    email: internet.email().toLowerCase(),
    password: internet.password(passwordMinLen),
  };

  test(`O avaliador tentará fazer login com dados: ${JSON.stringify(
    login
  )}`, async () => {
    await expect(page).toTypeInInput(loginPage.input.login, login.email);
    await expect(page).toTypeInInput(loginPage.input.password, login.password);

    await expect(page).toWaitReqFinished({
      trigger: () =>
        expect(page).toClickOnElement({
          selector: loginPage.button.login.default,
        }),
      method: "POST",
      status: notFound,
    });

    await expect(page).toCompareURL(`${host}/login`);
    await expect(page).toFindElement(loginPage.element.invalidLogin);
  });
});

describe(requirement(5), () => {
  test("O avaliador tentará fazer a ação de login com dados válidos, esse teste pressupõe a validade dos anteriores", async () => {
    expect(
      await action.common.navigate.login.default(page, "customer")
    ).toBeTruthy();
  });
});
