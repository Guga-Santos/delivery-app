module.exports = {
  launch: {
    product: "chrome",
    headless: process.env.HEADLESS !== "false",
    slowMo: 5,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--window-size=1270,720",
    ],
    defaultViewport: { width: 1260, height: 590 },
  },
  browserContext: "default",
};
