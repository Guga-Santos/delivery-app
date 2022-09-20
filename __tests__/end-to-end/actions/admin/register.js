const adminManagePage = require("../../../selectors/admin/manage");
const users = require("../../../entities/users");
const md5 = require("../../../config/utils/md5");

const { conflict, created } = require("../../../config/constants").httpCodes;

const register = async (page, { database, people, hasConflict = false }) => {
  for (const person of people) {
    await expect(page).toClearTextFromInput(adminManagePage.input.name);
    await expect(page).toClearTextFromInput(adminManagePage.input.email);
    await expect(page).toClearTextFromInput(adminManagePage.input.password);

    await expect(page).toTypeInInput(adminManagePage.input.name, person.name);
    await expect(page).toTypeInInput(adminManagePage.input.email, person.email);
    await expect(page).toTypeInInput(
      adminManagePage.input.password,
      person.password
    );
    await expect(page).toSelectItemOption(
      adminManagePage.select.role,
      person.role
    );
    await expect(page).toFindElement(
      adminManagePage.button.register.notDisabled
    );

    await expect(page).toWaitReqFinished({
      trigger: () =>
        expect(page).toClickOnElement({
          selector: adminManagePage.button.register.notDisabled,
        }),
      method: "POST",
      hasToken: true,
      status: hasConflict ? conflict : created,
    });

    await expect(database).toReturnDataWith({
      query: users.query,
      types: users.types,
      includes: {
        ...person,
        password: md5(person.password),
      },
    });

    if (hasConflict) {
      await expect(page).toFindElement(adminManagePage.element.invalidRegister);
    }
  }

  return true;
};

module.exports = register;
