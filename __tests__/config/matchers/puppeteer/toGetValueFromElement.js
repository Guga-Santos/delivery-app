const { result, messageDiff } = require("../../utils/assertionAux");

async function toGetValueFromElement(page, selector, expected) {
  try {
    await page.waitForTimeout(100);

    const received = await page.$eval(selector, (el) => el.value);

    const pass = Object.is(String(received), String(expected));

    const result = {
      pass,
      expected,
      received,
    };

    const message = await messageDiff(
      page,
      `Valor do elemento '${selector}'`,
      result,
      this.utils
    );

    return { actual: received, message, pass };
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível trazer o valor do elemento de referência '${selector}':\n"${e.message}"`
    );
  }
}

module.exports = toGetValueFromElement;
