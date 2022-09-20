const moment = require("moment");

const requirement = global.__REQUIREMENTS__;
const toReturnDataWith = require("../config/matchers/mysql/toReturnDataWith");
const action = require("./actions");
const { showCurrentCart, showCurrentOrderInfo } = require("./actions/customer");

const customerOrderDetailsPage = require("../selectors/customer/orderDetails");
const users = require("../entities/users");

const { zero, one } = require("../config/constants");
const { pending } = require("../config/constants").frontEnd.deliveryStatus;

let itemList = {};
let currentOrder = {};

let database;
beforeEach(async () => {
  database = global.__DATABASE__;
  itemList = action.customer.getRandomProducts();
  showCurrentCart(itemList, global.__TESTDESC__);

  expect(
    (await action.common.navigate.login.default(page, "customer")) &&
      (await action.customer.validateProductsTotalPrice(page, itemList)) &&
      (await action.common.navigate.customer.checkout.default(page))
  ).toBeTruthy();

  const newOrder = action.customer.newOrder(itemList);

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
});

describe(requirement(25), () => {
  test("O avaliador testará os data-testids referentes aos itens e demais elementos", async () => {
    await expect(page).toFindElement(
      customerOrderDetailsPage.element.orderDetails.label.orderId
    );
    await expect(page).toFindElement(
      customerOrderDetailsPage.element.orderDetails.label.sellerName
    );
    await expect(page).toFindElement(
      customerOrderDetailsPage.element.orderDetails.label.orderDate
    );
    await expect(page).toFindElement(
      customerOrderDetailsPage.element.orderDetails.label.deliveryStatus
    );
    await expect(page).toFindElement(
      customerOrderDetailsPage.button.deliveryCheck.default
    );
    await expect(page).toFindElement(
      customerOrderDetailsPage.element.totalPrice
    );

    for (let i = zero; i < itemList.cart.length; i += one) {
      await expect(page).toFindElement(
        customerOrderDetailsPage.element.orderTable.itemNumber +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerOrderDetailsPage.element.orderTable.name +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerOrderDetailsPage.element.orderTable.quantity +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerOrderDetailsPage.element.orderTable.unitPrice +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerOrderDetailsPage.element.orderTable.subTotal +
          `[data-testid$='-${i}']`
      );
    }
  });
});

describe(requirement(26), () => {
  test("O avaliador testará se os dados contidos nos campos das linhas conferem com os dados da venda", async () => {
    await expect(page).toFindElement(
      customerOrderDetailsPage.button.deliveryCheck.disabled
    );

    const { saleId, sellerId, totalPrice, saleDate } = currentOrder;

    const sellerName = Array.from(
      await toReturnDataWith(database, {
        nonTest: true,
        query: [users.query, "WHERE id = ?"].join(" "),
        values: [sellerId],
      })
    )[0].name;

    await expect(page).toGetTextFromElement(
      customerOrderDetailsPage.element.orderDetails.label.orderId,
      saleId
    );
    await expect(page).toGetTextFromElement(
      customerOrderDetailsPage.element.orderDetails.label.sellerName,
      sellerName
    );
    await expect(page).toGetTextFromElement(
      customerOrderDetailsPage.element.orderDetails.label.orderDate,
      moment(saleDate).format("DD/MM/YYYY")
    );
    await expect(page).toGetTextFromElement(
      customerOrderDetailsPage.element.orderDetails.label.deliveryStatus,
      pending
    );
    await expect(page).toGetTextFromElement(
      customerOrderDetailsPage.element.totalPrice,
      totalPrice.replace(/\./, ",")
    );

    for (let i = zero; i < itemList.cart.length; i += one) {
      await expect(page).toGetTextFromElement(
        customerOrderDetailsPage.element.orderTable.itemNumber +
          `[data-testid$='-${i}']`
      );
      await expect(page).toGetTextFromElement(
        customerOrderDetailsPage.element.orderTable.name +
          `[data-testid$='-${i}']`
      );
      await expect(page).toGetTextFromElement(
        customerOrderDetailsPage.element.orderTable.quantity +
          `[data-testid$='-${i}']`
      );
      await expect(page).toGetTextFromElement(
        customerOrderDetailsPage.element.orderTable.unitPrice +
          `[data-testid$='-${i}']`
      );
      await expect(page).toGetTextFromElement(
        customerOrderDetailsPage.element.orderTable.subTotal +
          `[data-testid$='-${i}']`
      );
    }
  });
});
