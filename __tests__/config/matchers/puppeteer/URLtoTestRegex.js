const { messageDiff } = require("../../utils/assertionAux");

async function URLtoTestRegex(
  page,
  { regex: expected, description, timeout = 2000 }
) {
  let received;

  const pass = await new Promise((resolve) => {
    const tries = setInterval(() => {
      received = page.url();
      const test = RegExp(expected).test(received);
      if (test) {
        clearInterval(tries);
        clearTimeout(exit);
        resolve(true);
      }
    }, 500);

    const exit = setTimeout(
      () => {
        clearInterval(tries);
        clearTimeout(exit);
        resolve(false);
      },
      timeout < 2000 ? 2000 : timeout
    );
  });

  const result = {
    pass,
    expected: `regex.test(pageUrl) === true`,
    received: `${String(expected)}.test('${received}') === ${pass}`,
  };

  const message = await messageDiff(
    page,
    `Testando o endpoint via regex até o tempo limite de ${timeout}ms\n` +
      `Onde: '${description}'`,
    result,
    this.utils
  );

  return { actual: received, message, pass };
}

module.exports = URLtoTestRegex;
