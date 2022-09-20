const { result } = require("../../utils/assertionAux");
const { timeout } = require("../../constants").puppeteer;

async function toRefreshPage(page) {
  try {
    await page.reload({
      waitUntil: ["networkidle2", "domcontentloaded"],
      timeout,
    });
    return result(page, true);
  } catch (e) {
    return result(
      page,
      false,
      `O avaliador não conseguiu atualizar a página:\n"${e.message}"`
    );
  }
}

module.exports = toRefreshPage;
