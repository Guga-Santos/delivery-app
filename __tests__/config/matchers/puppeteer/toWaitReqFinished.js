const jwt = require("jsonwebtoken");
const jwtKey = require("fs")
  .readFileSync("./back-end/jwt.evaluation.key", { encoding: "utf-8" });

const { result, messageDiff } = require("../../utils/assertionAux");
const { timeout } = require("../../constants").puppeteer;

async function toWaitReqFinished(
  page,
  { method, status, trigger, hasToken = false }
) {
  return new Promise((resolve, reject) => {
    const removeListeners = () => {
      page.removeListener("response", callback);
      page.removeListener("requestfailed", callback);
      page.removeAllListeners();
    };

    const callback = async (response) => {
      const request = response && response.request && response.request();

      if (
        request &&
        request.method &&
        request.method() == method &&
        response.status
      ) {
        responseTimeout && clearTimeout(responseTimeout);
        removeListeners();

        const data = {
          url: request.url() || "Endereço indefinido",
          method,
          status: response.status(),
        };

        if (hasToken) {
          const { authorization } = request.headers && request.headers();
          data.token = !!jwt.verify(authorization, jwtKey);
        }

        const pass = hasToken
          ? status === data.status && data.token
          : status === data.status;

        const result = {
          pass,
          expected: { method, status, hasToken },
          received: JSON.stringify(data, 0, 2),
        };

        const message = await messageDiff(
          page,
          `Status da requisição '${data.method}' disparada para '${data.url}'`,
          result,
          this.utils
        );

        return resolve({ actual: status, message, pass });
      }
    };

    const responseTimeout = setTimeout(async () => {
      clearTimeout(responseTimeout);
      removeListeners();

      const testResult = await result(
        page,
        false,
        `Não ocorreu o evento de requisição e resposta esperado na página dentro do tempo limite: ${timeout}ms`
      );

      return resolve(testResult);
    }, timeout);

    page.on("response", callback);
    page.on("requestfailed", callback);

    if (trigger) {
      trigger().catch((err) => {
        responseTimeout && clearTimeout(responseTimeout);
        removeListeners();
        return reject(err);
      });
    }
  });
}

module.exports = toWaitReqFinished;
