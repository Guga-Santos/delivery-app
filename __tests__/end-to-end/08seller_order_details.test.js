const moment = require("moment");

const requirement = global.__REQUIREMENTS__;
const action = require("./actions");
const { showCurrentCart, showCurrentOrderInfo } = require("./actions/customer");

const sellerOrderDetailsPage = require("../selectors/seller/orderDetails");

const { zero, one } = require("../config/constants");
const { pending } =
  require("../config/constants").frontEnd.deliveryStatus;

const updateStatus = require("./actions/common/updateStatus");

let itemList = [];
let currentOrder = {};

beforeEach(async () => {
  itemList = action.customer.getRandomProducts();
  showCurrentCart(itemList, global.__TESTDESC__);

  const newOrder = action.customer.newOrder(itemList);

  expect(
    (await action.common.navigate.login.default(page, "customer")) &&
      (await action.customer.validateProductsTotalPrice(page, itemList)) &&
      (await action.common.navigate.customer.checkout.default(page))
  ).toBeTruthy();

  const { saleId, saleDate } = await action.customer.checkoutNewSale(
    page,
    newOrder
  );
  expect(typeof saleId).toBe("number");

  currentOrder = {
    saleId,
    ...newOrder,
    saleDate,
  };

  showCurrentOrderInfo(currentOrder, global.__TESTDESC__);

  expect(
    (await action.common.navigate.logout.default(page)) &&
      (await action.common.navigate.login.default(page, "seller")) &&
      (await action.common.navigate.seller.orderDetails.default(page, saleId))
  ).toBeTruthy();
});

describe(requirement(30), () => {
  test("O avaliador testará os data-testids referentes aos itens e demais elementos", async () => {
    await expect(page).toFindElement(
      sellerOrderDetailsPage.element.orderDetails.label.orderId
    );
    await expect(page).toFindElement(
      sellerOrderDetailsPage.element.orderDetails.label.orderDate
    );
    await expect(page).toFindElement(
      sellerOrderDetailsPage.element.orderDetails.label.deliveryStatus
    );
    await expect(page).toFindElement(
      sellerOrderDetailsPage.button.preparingCheck.default
    );
    await expect(page).toFindElement(
      sellerOrderDetailsPage.button.dispatchCheck.default
    );
    await expect(page).toFindElement(sellerOrderDetailsPage.element.totalPrice);

    for (let i = zero; i < itemList.cart.length; i += one) {
      await expect(page).toFindElement(
        sellerOrderDetailsPage.element.orderTable.itemNumber +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        sellerOrderDetailsPage.element.orderTable.name +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        sellerOrderDetailsPage.element.orderTable.quantity +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        sellerOrderDetailsPage.element.orderTable.unitPrice +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        sellerOrderDetailsPage.element.orderTable.subTotal +
          `[data-testid$='-${i}']`
      );
    }
  });
});

describe(requirement(31), () => {
  test("O avaliador testará testará se os dados condizem com o pedido", async () => {
    await expect(page).toFindElement(
      sellerOrderDetailsPage.button.preparingCheck.notDisabled
    );
    await expect(page).toFindElement(
      sellerOrderDetailsPage.button.dispatchCheck.disabled
    );

    const { saleId, totalPrice, saleDate } = currentOrder;

    await expect(page).toGetTextFromElement(
      sellerOrderDetailsPage.element.orderDetails.label.orderId,
      saleId
    );
    await expect(page).toGetTextFromElement(
      sellerOrderDetailsPage.element.orderDetails.label.orderDate,
      moment(saleDate).format("DD/MM/YYYY")
    );
    await expect(page).toGetTextFromElement(
      sellerOrderDetailsPage.element.orderDetails.label.deliveryStatus,
      pending
    );
    await expect(page).toGetTextFromElement(
      sellerOrderDetailsPage.element.totalPrice,
      totalPrice.replace(/\./, ",")
    );

    for (let i = zero; i < itemList.cart.length; i += one) {
      await expect(page).toGetTextFromElement(
        sellerOrderDetailsPage.element.orderTable.itemNumber +
          `[data-testid$='-${i}']`
      );
      await expect(page).toGetTextFromElement(
        sellerOrderDetailsPage.element.orderTable.name +
          `[data-testid$='-${i}']`
      );
      await expect(page).toGetTextFromElement(
        sellerOrderDetailsPage.element.orderTable.quantity +
          `[data-testid$='-${i}']`
      );
      await expect(page).toGetTextFromElement(
        sellerOrderDetailsPage.element.orderTable.unitPrice +
          `[data-testid$='-${i}']`
      );
      await expect(page).toGetTextFromElement(
        sellerOrderDetailsPage.element.orderTable.subTotal +
          `[data-testid$='-${i}']`
      );
    }
  });
});

describe(requirement(32), () => {
  test("O avaliador testará se alteração do pedido é persistente após a atualização da página", async () => {
    expect(await updateStatus({ SOD: page, currentOrder })).toBeTruthy();
  });
});
