const { snapShot } = require("../../end-to-end/actions/common");
const { snapshots } = require("../constants").puppeteer;

const snapCode = () =>
  snapshots ? `snapShotId: ${global.__TESTID__}\n\n` : "";

const result = async (page, pass, info = "") =>
  snapShot(page, pass).then(() => ({
    message: () => `${snapCode()}${info}`,
    pass,
  }));

const messageDiff = async (
  page,
  message = "",
  { pass, expected, received },
  utils
) =>
  snapShot(page, pass).then(
    () => () =>
      snapCode() +
      `${message}\n` +
      `\nEsperado: ${pass ? "not " : ""}${utils.printExpected(expected)}` +
      `\nRecebido: ${utils.printReceived(received)}`
  );

module.exports = {
  result,
  messageDiff,
};
