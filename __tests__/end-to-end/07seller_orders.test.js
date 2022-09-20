const moment = require("moment");

const requirement = global.__REQUIREMENTS__;
const toReturnDataWith = require("../config/matchers/mysql/toReturnDataWith");
const action = require("./actions");
const { showCurrentCart, showCurrentOrderInfo } = require("./actions/customer");

const sellerOrdersPage = require("../selectors/seller/orders");
const sales = require("../entities/sales");

let currentOrder = {};
let orderList = [];

let database;
beforeEach(async () => {
  database = global.__DATABASE__;
  const itemList = action.customer.getRandomProducts();
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
      (await action.common.navigate.login.default(page, "seller"))
  ).toBeTruthy();

  orderList = Array.from(
    await toReturnDataWith(database, {
      nonTest: true,
      query: [
        sales.query, 
        "WHERE user_id = ?", 
        "LIMIT ?"
      ].join(" "),
      values: [2, 10],
    })
  );
});

describe(requirement(27), () => {
  test("O avaliador ira testar se existem data-testids para até os dez primeiros itens contidos na tabela 'sales'", async () => {
    for (const { id } of orderList) {
      await expect(page).toFindElement(
        sellerOrdersPage.element.card.orderId + `[data-testid$='-${id}']`
      );
      await expect(page).toFindElement(
        sellerOrdersPage.element.card.deliveryStatus + `[data-testid$='-${id}']`
      );
      await expect(page).toFindElement(
        sellerOrdersPage.element.card.orderDate + `[data-testid$='-${id}']`
      );
      await expect(page).toFindElement(
        sellerOrdersPage.element.card.price + `[data-testid$='-${id}']`
      );
      await expect(page).toFindElement(
        sellerOrdersPage.element.card.address + `[data-testid$='-${id}']`
      );
    }
  });
});

describe(requirement(28), () => {
  test("O avaliador ira testar se os dados associados aos data-testids dos dez primeiros itens batem com os do banco de dados", async () => {
    for (const {
      id,
      status,
      sale_date: salesDate,
      total_price: totalPrice,
      delivery_address: deliveryAddress,
      delivery_number: deliveryNumber,
    } of orderList) {
      await expect(page).toGetTextFromElement(
        sellerOrdersPage.element.card.orderId + `[data-testid$='-${id}']`,
        id
      );
      await expect(page).toGetTextFromElement(
        sellerOrdersPage.element.card.deliveryStatus +
          `[data-testid$='-${id}']`,
        status
      );
      await expect(page).toGetTextFromElement(
        sellerOrdersPage.element.card.orderDate + `[data-testid$='-${id}']`,
        moment(salesDate).locale("pt-br").format("L")
      );
      await expect(page).toGetTextFromElement(
        sellerOrdersPage.element.card.price + `[data-testid$='-${id}']`,
        totalPrice.replace(/\./, ",")
      );
      await expect(page).toFindElement(
        sellerOrdersPage.element.card.address + `[data-testid$='-${id}']`,
        deliveryAddress
      );
      await expect(page).toFindElement(
        sellerOrdersPage.element.card.address + `[data-testid$='-${id}']`,
        deliveryNumber
      );
    }
  });
});

describe(requirement(29), () => {
  test("O avaliador acessará a tela de detalhes do último pedido pela tela de pedidos, após o checkout do mesmo", async () => {
    const { saleId } = currentOrder;

    await expect(page).toClickOnElement({
      selector:
        sellerOrdersPage.element.card.orderId + `[data-testid$='-${saleId}']`,
    });

    await expect(page).URLtoTestRegex({
      // eslint-disable-next-line no-useless-escape
      regex: new RegExp(`(?=\/seller\/orders\/${saleId})`),
      description: `<host>/seller/orders/${saleId}`,
      timeout: 8000,
    });
  });
});
