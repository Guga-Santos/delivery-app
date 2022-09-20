/* eslint-disable no-useless-escape */
const moment = require("moment");

const requirement = global.__REQUIREMENTS__;
const action = require("./actions");
const { showCurrentCart, showCurrentOrderInfo } = require("./actions/customer");
const toReturnDataWith = require("../config/matchers/mysql/toReturnDataWith");

const customerOrdersPage = require("../selectors/customer/orders");
const sales = require("../entities/sales");

let itemList = [];
let order = {};
let orderList;

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

  order = await action.customer.createSale(page, itemList);

  expect(
    !!order &&
      (await action.common.navigate.goto.homepage(page, "customer")) &&
      (await action.common.navigate.customer.orders.default(page))
  ).toBeTruthy();

  showCurrentOrderInfo(order, global.__TESTDESC__);

  orderList = Array.from(
    await toReturnDataWith(database, {
      nonTest: true,
      query: [
        sales.query, 
        "WHERE user_id = ?", 
        "LIMIT ?"
      ].join(" "),
      values: [3, 10],
    })
  );
});

describe(requirement(22), () => {
  test("O avaliador ira testar se existem data-testids para até os dez primeiros itens contidos na tabela 'sales'", async () => {
    for (const { id } of orderList) {
      await expect(page).toFindElement(
        customerOrdersPage.element.card.orderId + `[data-testid$='-${id}']`
      );
      await expect(page).toFindElement(
        customerOrdersPage.element.card.deliveryStatus +
          `[data-testid$='-${id}']`
      );
      await expect(page).toFindElement(
        customerOrdersPage.element.card.orderDate + `[data-testid$='-${id}']`
      );
      await expect(page).toFindElement(
        customerOrdersPage.element.card.price + `[data-testid$='-${id}']`
      );
    }
  });
});

describe(requirement(23), () => {
  test("O avaliador ira testar se os dados associados aos data-testids dos dez primeiros itens batem com os do banco de dados", async () => {
    for (const { id, status, sale_date: saleDate, total_price: totalPrice } of orderList) {
      await expect(page).toGetTextFromElement(
        customerOrdersPage.element.card.orderId + `[data-testid$='-${id}']`,
        id
      );
      await expect(page).toGetTextFromElement(
        customerOrdersPage.element.card.deliveryStatus +
          `[data-testid$='-${id}']`,
        status
      );
      await expect(page).toGetTextFromElement(
        customerOrdersPage.element.card.orderDate + `[data-testid$='-${id}']`,
        moment(saleDate).locale("pt-br").format("L")
      );
      await expect(page).toGetTextFromElement(
        customerOrdersPage.element.card.price + `[data-testid$='-${id}']`,
        totalPrice.replace(/\./, ",")
      );
    }
  });
});

describe(requirement(24), () => {
  test("O avaliador acessará a tela de detalhes do último pedido pela tela de pedidos, após o checkout do mesmo", async () => {
    const { saleId } = order;

    await expect(page).toClickOnElement({
      selector:
        customerOrdersPage.element.card.orderId + `[data-testid$='-${saleId}']`,
    });

    await expect(page).URLtoTestRegex({
      // eslint-disable-next-line no-useless-escape
      regex: new RegExp(`(?=\/customer\/orders\/${saleId})`),
      description: `<host>/customer/orders/${saleId}`,
      timeout: 8000,
    });
  });
});
