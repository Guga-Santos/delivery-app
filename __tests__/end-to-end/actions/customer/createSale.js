const newOrder = require('./newOrder');
const checkoutNewSale = require('./checkoutNewSale');

const createSale = async (page, itemList)  => {
  const order = newOrder(itemList);
  
  const { saleId, saleDate } = await checkoutNewSale(page, order);
  expect(typeof saleId).toBe("number");
  expect(typeof saleDate).toBe("string");

  return {
    saleId,
    ...order,
    totalPrice: order.totalPrice.replace(".", ","),
    saleDate
  }
}

module.exports = createSale;
