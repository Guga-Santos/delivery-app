const { result } = require("../../utils/assertionAux");

async function toTypeInInput(page, selector, text) {
  try {
    await page.waitForTimeout(100);

    await page.type(selector, String(text));
    return result(page, true);
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível digitar no input de referência '${selector}':\n"${e.message}"`
    );
  }
}

module.exports = toTypeInInput;
