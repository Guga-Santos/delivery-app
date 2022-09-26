const requirement = global.__REQUIREMENTS__;
const action = require("./actions");

const adminManagePage = require("../selectors/admin/manage");

const { zero, one } = require("../config/constants").common;
const showPeopleList = require("./actions/customer/showPeopleList");
const forceExcludeItens = require("./actions/common/forceExcludeItens");
const createUserForAdm = require("./actions/common/createUserForAdm");
const { newUser } = action.dataAux;

const lengthRules = {
  name: 12,
  password: 6,
};

let database;
beforeEach(async () => {
  database = global.__DATABASE__;
  expect(
    await action.common.navigate.login.default(page, "administrator")
  ).toBeTruthy();
});

describe(requirement(36), () => {
  test("O avaliador testará os data-testids referentes aos elementos do formulário de cadastros", async () => {
    await expect(page).toFindElement(adminManagePage.input.name);
    await expect(page).toFindElement(adminManagePage.input.email);
    await expect(page).toFindElement(adminManagePage.input.password);
    await expect(page).toFindElement(adminManagePage.select.role);
    await expect(page).toFindElement(adminManagePage.button.register.default);
  });
});

describe(requirement(37), () => {
  const people = [
    {
      ...newUser({
        nameLen: lengthRules.name - one,
        passwordLen: lengthRules.password,
      }),
      role: Math.round(Math.random()) ? "seller" : "customer",
      valid: false,
    },
    {
      ...newUser({ passwordLen: lengthRules.password, email: "cliente@email" }),
      role: Math.round(Math.random()) ? "seller" : "customer",
      valid: false,
    },
    {
      ...newUser({ passwordLen: lengthRules.password - one }),
      role: Math.round(Math.random()) ? "seller" : "customer",
      valid: false,
    },
    {
      ...newUser({ passwordLen: lengthRules.password }),
      role: Math.round(Math.random()) ? "seller" : "customer",
      valid: true,
    },
  ];

  const baseTest = async (name, email, password, role, valid) => {
    await expect(page).toFindElement(adminManagePage.button.register.disabled);

    await expect(page).toTypeInInput(
      adminManagePage.input.name,
      name.substr(zero, name.length - one)
    );
    await expect(page).toFindElement(adminManagePage.button.register.disabled);
    await expect(page).toTypeInInput(
      adminManagePage.input.name,
      name.substr(-one)
    );

    await expect(page).toTypeInInput(adminManagePage.input.email, email);
    await expect(page).toFindElement(adminManagePage.button.register.disabled);

    await expect(page).toTypeInInput(
      adminManagePage.input.password,
      password.substr(zero, password.length - one)
    );
    await expect(page).toFindElement(adminManagePage.button.register.disabled);
    await expect(page).toTypeInInput(
      adminManagePage.input.password,
      password.substr(-one)
    );
    await expect(page).toSelectItemOption(adminManagePage.select.role, role);

    await expect(page).toFindElement(
      adminManagePage.button.register[valid ? "notDisabled" : "disabled"]
    );

    return true;
  };

  test.each(people)(
    "O avaliador testará isoladamente o caso: `%p`",
    async ({ name, email, password, role, valid }) => {
      expect(await baseTest(name, email, password, role, valid)).toBeTruthy();
    }
  );
  test("O avaliador testará os casos anteriores de forma seguida, sem recarregar a página", async () => {
    for (const { name, email, password, role, valid } of people) {
      expect(await baseTest(name, email, password, role, valid)).toBeTruthy();
      await expect(page).toClearTextFromInput(adminManagePage.input.name);
      await expect(page).toClearTextFromInput(adminManagePage.input.email);
      await expect(page).toClearTextFromInput(adminManagePage.input.password);
    }
  });
});

describe(requirement(38), () => {
  const people = createUserForAdm(lengthRules);

  test(`O avaliador tentará realizar o fluxo de cadastro com ${people.length} pessoas usuárias, validando-os no banco`, async () => {
    showPeopleList(people, global.__TESTDESC__);
    
    expect(
      await action.admin.register(page, { database, people })
    ).toBeTruthy();
  });
});

describe.only(requirement(39), () => {
  const testUser = newUser({ passwordLen: lengthRules.password });
  testUser.role = Math.round(Math.random()) ? "seller" : "customer";

  test(`O avaliador tentará realizar o fluxo de cadastro duas vezes, com os dados: ${JSON.stringify(
    testUser
  )}`, async () => {
    expect(
      await action.admin.register(page, { database, people: [testUser] })
    ).toBeTruthy();
    expect(
      await action.admin.register(page, {
        database,
        people: [testUser],
        hasConflict: true,
      })
    ).toBeTruthy();
  });
});

describe(requirement(40), () => {
  const people = createUserForAdm(lengthRules);

  test(`O avaliador testará os data-testids referentes aos elementos da tabela de pessoas usuárias`, async () => {
    await expect(page).toFindElement(
      adminManagePage.element.userTable.itemNumber
    );
    await expect(page).toFindElement(adminManagePage.element.userTable.name);
    await expect(page).toFindElement(adminManagePage.element.userTable.email);
    await expect(page).toFindElement(adminManagePage.element.userTable.role);
    await expect(page).toFindElement(adminManagePage.element.userTable.remove);
  });

  test(`O avaliador tentará realizar o fluxo de cadastro com ${people.length} pessoas usuárias e verificará se as mesmas aparecem na tabela`, async () => {
    showPeopleList(people, global.__TESTDESC__);
    
    expect(
      await action.admin.register(page, { database, people })
    ).toBeTruthy();

    for (let i; i < people.length; i += one) {
      const { email, name, role } = people[i]
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.itemNumber + `[data-testid$='-${i}']`, i+1);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.email + `[data-testid$='-${i}']`, email);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.name + `[data-testid$='-${i}']`, name);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.role + `[data-testid$='-${i}']`, role);
    }
  });
});

describe(requirement(41), () => {
  const people = createUserForAdm(lengthRules);

  const peopleList = people
    .map((el,index)=> ({ listItem: index + 3, ...el  }));

  const excludeItens = forceExcludeItens(peopleList, 3);
  
  const peopleToExclude = peopleList
    .filter((el) => excludeItens.includes(el.listItem));

  const newPeopleList = peopleList
    .filter(({listItem}) => !excludeItens.includes(listItem))
    .map((el,index)=> ({ ...el, listItem: index + 3 }));

  peopleList.map(el => delete el.password && el);
  excludeItens.map(el => delete el.password && el);
  newPeopleList.map(el => delete el.password && el);
  
  test(`O avaliador tentará realizar o fluxo de cadastro com ${people.length} pessoas usuárias e removerá ${peopleToExclude.length} validando na tabela`, async () => {
    showPeopleList(peopleList, requirement(44));
    showPeopleList(peopleToExclude, requirement(44), 'Pessoas que serão deletadas');
    showPeopleList(newPeopleList, requirement(44),'Nova lista de pessoas');

    expect(
      await action.admin.register(page, { database, people })
    ).toBeTruthy();

    for (let i; i < peopleList.length; i += one) {
      const { listItem, email, name, role } = peopleList[i]
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.itemNumber + `[data-testid$='-${listItem -1}']`, listItem);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.email + `[data-testid$='-${listItem -1}']`, email);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.name + `[data-testid$='-${listItem -1}']`, name);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.role + `[data-testid$='-${listItem -1}']`, role);
    }

    for (let i = peopleToExclude.length-one ; i >= zero; i -= one) {
      const { listItem } = peopleToExclude[i];
      await expect(page).toClickOnElement({
        selector: adminManagePage.element.userTable.remove + `[data-testid$='-${listItem - 1}']`
      });
    }

    for (let i; i < newPeopleList.length; i += one) {
      const { listItem, email, name, role } = newPeopleList[i]
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.itemNumber + `[data-testid$='-${listItem -1}']`, listItem);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.email + `[data-testid$='-${listItem -1}']`, email);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.name + `[data-testid$='-${listItem -1}']`, name);
      await expect(page).toGetTextFromElement(adminManagePage.element.userTable.role + `[data-testid$='-${listItem -1}']`, role);
    }
  });
});
