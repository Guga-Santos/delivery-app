const { result } = require("../../utils/assertionAux");
const { timeout } = require("../../constants").puppeteer;

async function toNavigate(page, url) {
  try {
    await page.goto(url, {
      waitUntil: ["networkidle2", "domcontentloaded"],
      timeout,
    });
    return result(page, true);
  } catch (e) {
    return result(
      page,
      false,
      `O avaliador não conseguiu acessar o endereço '${url}':\n"${e.message}"`
    );
  }
}

module.exports = toNavigate;
