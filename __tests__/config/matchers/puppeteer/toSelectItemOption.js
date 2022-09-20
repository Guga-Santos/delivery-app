const { result } = require("../../utils/assertionAux");

async function toSelectItemOption(page, selector, value) {
  try {
    await page.waitForTimeout(100);

    await page.select(selector, String(value));
    return result(page, true);
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível selecionar no elemento de referência '${selector}':\n"${e.message}"`
    );
  }
}

module.exports = toSelectItemOption;
