const moment = require("moment");

const requirement = global.__REQUIREMENTS__;
const action = require("./actions");
const { showCurrentCart, showCurrentOrderInfo } = require("./actions/customer");

const customerCheckoutPage = require("../selectors/customer/checkout");
const sales = require("../entities/sales");
const salesProducts = require("../entities/salesProducts");

const { zero, one } = require("../config/constants").common;
const { pending } = require("../config/constants").frontEnd.deliveryStatus;
const cartReduced = require("./actions/customer/cartReduced");

let itemList = {};
let order = {};

let database;
beforeEach(async () => {
  database = global.__DATABASE__;
  itemList = action.customer.getRandomProducts();
  showCurrentCart(itemList, global.__TESTDESC__);

  order = action.customer.newOrder(itemList);

  expect(
    (await action.common.navigate.login.default(page, "customer")) &&
      (await action.customer.validateProductsTotalPrice(page, itemList)) &&
      (await action.common.navigate.customer.checkout.default(page))
  ).toBeTruthy();
});

describe(requirement(17), () => {
  test("O avaliador testará os data-testids referentes aos itens do carrinho e demais elementos", async () => {
    for (let i = zero; i < itemList.cart.length; i += one) {
      await expect(page).toFindElement(
        customerCheckoutPage.element.orderTable.itemNumber +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerCheckoutPage.element.orderTable.name + `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerCheckoutPage.element.orderTable.quantity +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerCheckoutPage.element.orderTable.unitPrice +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerCheckoutPage.element.orderTable.subTotal +
          `[data-testid$='-${i}']`
      );
      await expect(page).toFindElement(
        customerCheckoutPage.element.orderTable.remove +
          `[data-testid$='-${i}']`
      );
    }
    await expect(page).toFindElement(customerCheckoutPage.element.totalPrice);
    await expect(page).toFindElement(customerCheckoutPage.select.orderSeller);
    await expect(page).toFindElement(customerCheckoutPage.input.address);
    await expect(page).toFindElement(customerCheckoutPage.input.addressNumber);
    await expect(page).toFindElement(
      customerCheckoutPage.button.submitOrder.default
    );
  });
});

const validateProductItens = async ({ cart = [], totalPrice }) => {
  for (let i = zero; i < cart.length; i += one) {
    const { name, unitPrice, quantity, subTotal } = cart[i];

    await expect(page).toGetTextFromElement(
      customerCheckoutPage.element.orderTable.itemNumber +
        `[data-testid$='-${i}']`,
      i + one
    );

    await expect(page).toGetTextFromElement(
      customerCheckoutPage.element.orderTable.name +
        `[data-testid$='-${i}']`,
      name
    );

    await expect(page).toGetTextFromElement(
      customerCheckoutPage.element.orderTable.quantity +
        `[data-testid$='-${i}']`,
      quantity
    );

    await expect(page).toGetTextFromElement(
      customerCheckoutPage.element.orderTable.unitPrice +
        `[data-testid$='-${i}']`,
      unitPrice
    );

    await expect(page).toGetTextFromElement(
      customerCheckoutPage.element.orderTable.subTotal +
        `[data-testid$='-${i}']`,
      subTotal
    );
  }

  await expect(page).toGetTextFromElement(
    customerCheckoutPage.element.totalPrice,
    totalPrice
  );

  return true;
}

describe(requirement(18), () => {
  test("O avaliador testará se os itens contidos na venda correspondem aos itens do checkout", async () => {
    expect(await validateProductItens(itemList)).toBeTruthy();
  });
});

describe(requirement(19), () => {
  test(`O avaliador tentará realizar a remoção de itens validando-os na tabela`, async () => {
    const { productsToExclude, newCart } = cartReduced(itemList);

    showCurrentCart({ cart: productsToExclude }, requirement(19), 'Produtos que serão deletados');
    showCurrentCart(newCart, requirement(19),'Nova lista de produtos');

    for (let i = productsToExclude.length - one ; i >= zero; i -= one) {
      const { listItem } = productsToExclude[i];
      await expect(page).toClickOnElement({
        selector: customerCheckoutPage.element.orderTable.remove + `[data-testid$='-${listItem - 1}']`
      });
    }

    expect(await validateProductItens(newCart)).toBeTruthy();
  });
});

describe(requirement(20), () => {
  test("O avaliador verificará se ao final do checkout o endereço da url contém o id do pedido", async () => {
    const { saleId } = await action.customer.checkoutNewSale(page, order);
    expect(typeof saleId).toBe("number");

    showCurrentOrderInfo(
      {
        saleId,
        ...order,
      },
      global.__TESTDESC__
    );
  });
});

describe(requirement(21), () => {
  test("O avaliador testará se, após realizado o checkout, as alterações constarão no banco de dados", async () => {
    const { saleId, saleDate } = await action.customer.checkoutNewSale(
      page,
      order
    );
    expect(typeof saleId).toBe("number");
    expect(typeof saleDate).toBe("string");

    showCurrentOrderInfo(
      {
        saleId,
        ...order,
        saleDate,
      },
      global.__TESTDESC__
    );

    await expect(database).toReturnDataWith({
      query: [sales.query, "WHERE id = ?"].join(" "),
      values: [saleId],
      types: sales.types,
      compare: [
        {
          id: saleId,
          user_id: order.userId,
          seller_id: order.sellerId,
          total_price: order.totalPrice,
          delivery_address: order.deliveryAddress,
          delivery_number: order.deliveryNumber,
          "sale_date": (date) => {
            try {
              const received = moment.utc(date);
              const expected = moment.utc(saleDate);
              const timeDiff = expected.diff(received, "seconds");
              return (
                timeDiff < 15 || {
                  Mensagem: `Datas divergem superando uma tolerância de 15 segundos`,
                  DataEsperada: expected,
                  DataRecebida: received,
                  DifEmSegundos: timeDiff,
                }
              );
            } catch (error) {
              return error.message;
            }
          },
          status: pending,
        },
      ],
    });

    const salesProductsExpected = itemList.cart.map(
      ({ productId, quantity }) => ({
        sale_id: saleId,
        product_id: productId,
        quantity,
      })
    );

    for (const item of salesProductsExpected) {
      await expect(database).toReturnDataWith({
        query: [salesProducts.query, "WHERE sale_id = ?"].join(" "),
        values: [saleId],
        types: salesProducts.types,
        includes: item,
      });
    }
  });
});
