const { result } = require("../../utils/assertionAux");

async function toResetValueFromElement(page, selector) {
  try {
    await page.waitForTimeout(100);

    const received = await page.$eval(selector, (el) => {
      el.value = "";
      return el.value;
    });

    const pass = received !== undefined;

    return result(page, pass);
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível resetar o valor do elemento de referência '${selector}':\n"${e.message}"`
    );
  }
}

module.exports = toResetValueFromElement;
