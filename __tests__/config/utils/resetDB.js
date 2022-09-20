const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const { environment } = require("../constants");

const scriptSuffix = environment === "test" ? "-test" : "-dev";

const executeSequelize = async () => {
  const { stderr } = await exec(`./scripts/reset-db${scriptSuffix}.sh`);
  if (stderr && !process.env.HEADLESS) throw new Error(stderr);
  return true;
};

module.exports = executeSequelize;
