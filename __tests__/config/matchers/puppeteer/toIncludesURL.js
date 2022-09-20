const { messageDiff } = require("../../utils/assertionAux");

async function toIncludesURL(page, expected) {
  await page.waitForTimeout(1000);

  const received = page.url();
  const pass = String(received).includes(expected);
  const result = {
    pass,
    expected,
    received,
  };
  const message = await messageDiff(
    page,
    "O avaliador não conseguiu identificar o endpoint",
    result,
    this.utils
  );

  return { actual: received, message, pass };
}

module.exports = toIncludesURL;
