const registerPage = require("../../../selectors/common/register");
const users = require("../../../entities/users");
const md5 = require("../../../config/utils/md5");

const { host } = require("../../../config/constants").frontEnd;
const { conflict, created } = require("../../../config/constants").httpCodes;

const register = async (page, { database, newUser, hasConflict = false }) => {
  await expect(page).toTypeInInput(registerPage.input.name, newUser.name);
  await expect(page).toTypeInInput(registerPage.input.email, newUser.email);
  await expect(page).toTypeInInput(
    registerPage.input.password,
    newUser.password
  );
  await expect(page).toFindElement(registerPage.button.register.notDisabled);

  await expect(page).toWaitReqFinished({
    trigger: () =>
      expect(page).toClickOnElement({
        selector: registerPage.button.register.notDisabled,
      }),
    method: "POST",
    status: hasConflict ? conflict : created,
  });

  await expect(database).toReturnDataWith({
    query: users.query,
    types: users.types,
    includes: {
      ...newUser,
      password: md5(newUser.password),
    },
  });

  if (hasConflict) {
    await expect(page).toFindElement(registerPage.element.invalidRegister);
  } else {
    await expect(page).toCompareURL(`${host}/customer/products`);
  }

  return true;
};

module.exports = register;
