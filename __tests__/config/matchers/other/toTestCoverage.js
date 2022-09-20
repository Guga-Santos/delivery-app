const { result, messageDiff } = require("../../utils/assertionAux");

async function toTestCoverage({ path, pct: received }, expected) {
  try {
    const pass = Number(received) >= Number(expected);

    const result = {
      pass,
      expected,
      received,
    };

    const message = await messageDiff(
      null,
      `Atributo 'total.lines.pct' gerado pelo teste no arquivo em:\n${path}`,
      result,
      this.utils
    );

    return { actual: received, message, pass };
  } catch (e) {
    return result(
      null,
      false,
      `O avaliador não conseguiu executar o comando 'npm run test-coverage' em '${path}':\n"${e.message}"`
    );
  }
}

module.exports = toTestCoverage;
