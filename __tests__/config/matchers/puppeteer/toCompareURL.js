const { messageDiff } = require("../../utils/assertionAux");

async function toCompareURL(page, expected) {
  await page.waitForTimeout(1000);

  const received = page.url();
  const pass = Object.is(received, expected);
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

module.exports = toCompareURL;
