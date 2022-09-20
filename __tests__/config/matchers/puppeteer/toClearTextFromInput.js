const { result } = require("../../utils/assertionAux");

async function toClearTextFromInput(page, selector) {
  try {
    await page.waitForTimeout(100);

    const inputValue = await page.$eval(selector, (el) => el.value);
    await page.focus(selector);
    await page.keyboard.press("End");
    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press("Backspace");
    }

    return result(page, true);
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível resetar o valor do elemento de referência '${selector}':\n"${e.message}"`
    );
  }
}

module.exports = toClearTextFromInput;
