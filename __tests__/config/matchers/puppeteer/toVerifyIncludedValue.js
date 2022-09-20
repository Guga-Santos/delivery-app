const { result, messageDiff } = require("../../utils/assertionAux");

async function toGetValueFromElement(page, selector, expect) {
  try {
    await page.waitForTimeout(100);

    const expected = String(expect).trim();
    const received = String(
      await page.$eval(selector, (el) => el.value)
    ).trim();

    const pass = received.includes(expected);

    const result = {
      pass,
      expected,
      received,
    };

    const message = await messageDiff(
      page,
      `Valor incluso no elemento '${selector}'`,
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
