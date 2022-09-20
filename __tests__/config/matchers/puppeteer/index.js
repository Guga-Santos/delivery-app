const toClearStorages = require("./toClearStorages");
const toClearTextFromInput = require("./toClearTextFromInput");
const toClickOnElement = require("./toClickOnElement");
const toCompareURL = require("./toCompareURL");
const toFindElement = require("./toFindElement");
const toGetCssStyle = require("./toGetCssStyle");
const toGetTextFromElement = require("./toGetTextFromElement");
const toGetValueFromElement = require("./toGetValueFromElement");
const toIncludesURL = require("./toIncludesURL");
const toNavigate = require("./toNavigate");
const toRefreshPage = require("./toRefreshPage");
const toResetValueFromElement = require("./toResetValueFromElement");
const toSelectItemOption = require("./toSelectItemOption");
const toTypeInInput = require("./toTypeInInput");
const toVerifyIncludedValue = require("./toVerifyIncludedValue");
const toWaitReqFinished = require("./toWaitReqFinished");
const URLtoTestRegex = require("./URLtoTestRegex");

expect.extend({
  toClearStorages,
  toClearTextFromInput,
  toClickOnElement,
  toCompareURL,
  toFindElement,
  toGetCssStyle,
  toGetTextFromElement,
  toGetValueFromElement,
  toIncludesURL,
  toNavigate,
  toRefreshPage,
  toResetValueFromElement,
  toSelectItemOption,
  toTypeInInput,
  toVerifyIncludedValue,
  toWaitReqFinished,
  URLtoTestRegex,
});
