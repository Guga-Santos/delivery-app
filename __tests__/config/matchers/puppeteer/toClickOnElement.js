/* eslint-disable no-undef */
const { result } = require("../../utils/assertionAux");

async function toClickOnElement(page, { selector, clickCount = 0, delay = 0 }) {
  try {
    await page.waitForTimeout(100);

    const hasClicked =
      clickCount > 1
        ? await page.$eval(
            selector,
            async (element, { clickCount, delay }) => {
              try{
                element.scrollIntoView();
              }catch(e){}

              function jestEvalTestClick(target) {
                for (const event of [
                  "mouseover",
                  "mousedown",
                  "mouseup",
                  "click",
                ]) {
                  // eslint-disable-next-line no-undef
                  let clickEvent = document.createEvent("MouseEvents");
                  clickEvent.initEvent(event, true, false);
                  target.dispatchEvent(clickEvent);
                }
              }

              return new Promise((resolve) => {
                let count = 0;

                const clicks = setInterval(
                  () => {
                    jestEvalTestClick(element);

                    count += 1;
                    if (count >= clickCount) {
                      clearInterval(clicks);
                      return resolve(true);
                    }
                  },
                  delay < 50 ? 50 : delay
                );
              });
            },
            { clickCount, delay }
          )
        : await page
            .click(selector)
            .then(() => true)
            .catch(() => false);

    return result(
      page,
      !!hasClicked,
      `Não foi possível clicar no elemento de referência '${selector}'`
    );
  } catch (e) {
    return result(
      page,
      false,
      `Não foi possível clicar no elemento de referência '${selector}':\n"${e.message}"`
    );
  }
}

module.exports = toClickOnElement;
