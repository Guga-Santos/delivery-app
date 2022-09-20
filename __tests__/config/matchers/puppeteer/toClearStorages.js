/* eslint-disable no-undef */
const { result } = require("../../utils/assertionAux");

async function toClearStorages(page) {
  try {
    await page.waitForTimeout(100);

    const received = await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
      return localStorage.length === 0 && sessionStorage.length === 0;
    });

    return result(page, received);
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível limpar o localStorage da página':\n"${e.message}"`
    );
  }
}

module.exports = toClearStorages;
