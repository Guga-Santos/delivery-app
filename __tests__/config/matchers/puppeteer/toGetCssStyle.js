/* eslint-disable no-undef */
const { result, messageDiff } = require("../../utils/assertionAux");

async function toGetCssStyle(page, selector, styleName, expected) {
  try {
    await page.waitForTimeout(100);

    const received = await page
      // eslint-disable-next-line no-undef
      .evaluate(
        (selector, styleName) =>
          // eslint-disable-next-line no-undef
          window.getComputedStyle(document.querySelector(selector))[styleName],
        selector,
        styleName
      );

    const pass = Object.is(received, expected);

    const result = {
      pass,
      expected,
      received,
    };

    const message = await messageDiff(
      page,
      `Valor para propriedade '${styleName}', do elemento '${selector}'`,
      result,
      this.utils
    );

    return { actual: received, message, pass };
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível trazer propriedades do elemento de referência '${selector}':\n"${e.message}"`
    );
  }
}

module.exports = toGetCssStyle;
