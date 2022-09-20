const { snapshots } = require("../../../config/constants").puppeteer;
const { resolve } = require("path");

const snapShot = async (page, pass) => {
  try {
    if (page && page.screenshot) {
      if (!pass && snapshots) {
        await page.screenshot({
          fullPage: true,
          path: resolve(
            snapshots,
            `end-state-${global.__TESTID__ || "unknown"}.png`
          ),
        });
      }
    }
  } catch (error) {
    console.warn(error.message);
  }
  return true;
};

module.exports = snapShot;
