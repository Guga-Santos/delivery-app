const moment = require("moment");
const customerCheckoutPage = require("../../../selectors/customer/checkout");

const checkoutNewSale = async (
  page,
  { sellerId, deliveryAddress, deliveryNumber }
) => {
  await expect(page).toSelectItemOption(
    customerCheckoutPage.select.orderSeller,
    sellerId
  );
  await expect(page).toTypeInInput(
    customerCheckoutPage.input.address,
    `${deliveryAddress}`
  );
  await expect(page).toTypeInInput(
    customerCheckoutPage.input.addressNumber,
    `${deliveryNumber}`
  );

  await expect(page).toWaitReqFinished({
    trigger: () =>
      expect(page).toClickOnElement({
        selector: customerCheckoutPage.button.submitOrder.default,
      }),
    method: "POST",
    status: 201,
    hasToken: true,
  });

  const saleDate = moment().toISOString();

  await expect(page).URLtoTestRegex({
    regex: /(?=\/customer\/orders\/\d)/,
    description: "<host>/customer/orders/<orderNumber>",
    timeout: 8000,
  });

  const urlSplit = (await page.url()).split("/");
  const saleId = Number(urlSplit[urlSplit.length - 1]);

  return {
    saleId,
    saleDate,
  };
};

module.exports = checkoutNewSale;
