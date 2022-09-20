const requirement = global.__REQUIREMENTS__;
const action = require("./actions");
const { showCurrentCart, showCurrentOrderInfo } = require("./actions/customer");

const updateStatus = require("./actions/common/updateStatus");

let sellerPage = {};
let sellerContext = {};
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

  sellerContext = await browser.createIncognitoBrowserContext();
  sellerPage = await sellerContext.newPage();

  expect(
    (await action.common.navigate.login.default(sellerPage, "seller")) &&
      (await action.common.navigate.seller.orderDetails.default(
        sellerPage,
        saleId
      ))
  ).toBeTruthy();
});

afterEach(async () => {
  sellerPage && sellerPage.removeAllListeners && await sellerPage.removeAllListeners();
  sellerPage && sellerPage.close && await sellerPage.close();
  sellerContext && sellerContext.close && await sellerContext.close();
  sellerPage = undefined;
  sellerContext = undefined;
});

describe(requirement(33), () => {
  test("O avaliador verificará se, ao alterar o status do pedido na tela da pessoa vendedora, o mesmo também é alterado na tela de detalhes do pedido do cliente após atualização das páginas", async () => {
    expect(await updateStatus({ situation: 1, COD: page, SOD: sellerPage, currentOrder })).toBeTruthy()
  });
});

describe(requirement(34), () => {
  test("O avaliador verificará se, ao alterar o status do pedido na tela da pessoa vendedora, o mesmo também é alterado na tela de pedidos do cliente após atualização das páginas", async () => {
    expect(await updateStatus({ situation: 2, COD: page, SOD: sellerPage, currentOrder })).toBeTruthy();
  });
});

describe(requirement(35), () => {
  test("O avaliador verificará se, ao alterar o status do pedido na tela do cliente, o mesmo também é alterado na tela de detalhes do pedido da pessoa vendedora após atualização das páginas", async () => {
    expect(await updateStatus({ situation: 3, COD: page, SOD: sellerPage, currentOrder })).toBeTruthy();
  });
});
