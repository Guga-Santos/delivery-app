const requirement = global.__REQUIREMENTS__;
const action = require("./actions");

const loginPage = require("../selectors/common/login");
const registerPage = require("../selectors/common/register");

const { host } = require("../config/constants").frontEnd;
const { zero, one } = require("../config/constants").common;

const { newUser } = action.dataAux;

const lengthRules = {
  name: 12,
  password: 6,
};

let database;

beforeEach(async () => {
  database = global.__DATABASE__;
  expect(await action.common.navigate.register.default(page)).toBeTruthy();
});

describe(requirement(6), () => {
  beforeEach(async () => {
    await expect(page).toNavigate(`${host}/login`);
    await expect(page).toCompareURL(`${host}/login`);
  });

  test("O avaliador navegará para o endereço do host utilizando o endpoint '/register'", async () => {
    await expect(page).toNavigate(`${host}/register`);
    await expect(page).toCompareURL(`${host}/register`);
  });
  test("O avaliador tentará o acesso via tela de login através do botão de cadastro", async () => {
    await expect(page).toFindElement(loginPage.button.register);
    await expect(page).toClickOnElement({
      selector: loginPage.button.register,
    });
    await expect(page).toCompareURL(`${host}/register`);
  });
});

describe(requirement(7), () => {
  test("O avaliador buscará pelos elementos fundamentais aos demais testes", async () => {
    await expect(page).toFindElement(registerPage.input.name);
    await expect(page).toFindElement(registerPage.input.email);
    await expect(page).toFindElement(registerPage.input.password);
    await expect(page).toFindElement(registerPage.button.register.default);
  });
});

describe(requirement(8), () => {
  const people = [
    {
      ...newUser({
        nameLen: lengthRules.name - one,
        passwordLen: lengthRules.password,
      }),
      valid: false,
    },
    {
      ...newUser({ passwordLen: lengthRules.password, email: "cliente@email" }),
      valid: false,
    },
    { ...newUser({ passwordLen: lengthRules.password - one }), valid: false },
    { ...newUser({ passwordLen: lengthRules.password }), valid: true },
  ];

  const baseTest = async (name, email, password, valid) => {
    await expect(page).toFindElement(registerPage.button.register.disabled);

    await expect(page).toTypeInInput(
      registerPage.input.name,
      name.substr(zero, name.length - one)
    );
    await expect(page).toFindElement(registerPage.button.register.disabled);
    await expect(page).toTypeInInput(
      registerPage.input.name,
      name.substr(-one)
    );

    await expect(page).toTypeInInput(registerPage.input.email, email);
    await expect(page).toFindElement(registerPage.button.register.disabled);

    await expect(page).toTypeInInput(
      registerPage.input.password,
      password.substr(zero, password.length - one)
    );
    await expect(page).toFindElement(registerPage.button.register.disabled);
    await expect(page).toTypeInInput(
      registerPage.input.password,
      password.substr(-one)
    );
    await expect(page).toFindElement(
      registerPage.button.register[valid ? "notDisabled" : "disabled"]
    );

    return true;
  };

  test.each(people)(
    "O avaliador testará isoladamente o caso: `%p`",
    async ({ name, email, password, valid }) => {
      expect(await baseTest(name, email, password, valid)).toBeTruthy();
    }
  );
  test("O avaliador testará os casos anteriores de forma seguida, sem recarregar a página", async () => {
    for (const { name, email, password, valid } of people) {
      expect(await baseTest(name, email, password, valid)).toBeTruthy();
      await expect(page).toClearTextFromInput(registerPage.input.name);
      await expect(page).toClearTextFromInput(registerPage.input.email);
      await expect(page).toClearTextFromInput(registerPage.input.password);
    }
  });
});

describe(requirement(9), () => {
  const testUser = newUser({ passwordLen: lengthRules.password });

  test(`O avaliador tentará realizar o fluxo de cadastro com os dados: ${JSON.stringify(
    testUser
  )}, validando-os no banco`, async () => {
    expect(
      await action.common.register(page, { database, newUser: testUser })
    ).toBeTruthy();
  });
});

describe(requirement(10), () => {
  const testUser = newUser({ passwordLen: lengthRules.password });

  test(`O avaliador tentará realizar o fluxo de cadastro duas vezes, com os dados: ${JSON.stringify(
    testUser
  )}`, async () => {
    expect(
      await action.common.register(page, { database, newUser: testUser })
    ).toBeTruthy();

    await expect(page).toClearStorages();
    expect(await action.common.navigate.register.default(page)).toBeTruthy();

    expect(
      await action.common.register(page, {
        database,
        newUser: testUser,
        hasConflict: true,
      })
    ).toBeTruthy();
  });
});
