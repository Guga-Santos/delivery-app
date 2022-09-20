const { result, messageDiff } = require("../../utils/assertionAux");

async function toGetTextFromElement(page, selector, expect) {
  try {
    await page.waitForTimeout(100);

    const expected = String(expect).trim();
    const received = String(
      await page.$eval(selector, (el) => el.innerText)
    ).trim();

    const pass = received.includes(expected);

    const result = {
      pass,
      expected,
      received,
    };

    const message = await messageDiff(
      page,
      `Texto incluso no elemento '${selector}'`,
      result,
      this.utils
    );

    return { actual: received, message, pass };
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível trazer o texto interno do elemento de referência '${selector}':\n"${e.message}"`
    );
  }
}

module.exports = toGetTextFromElement;
