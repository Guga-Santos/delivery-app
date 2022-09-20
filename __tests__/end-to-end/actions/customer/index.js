const getRandomProducts = require('./getRandomProducts');
const validateProductsTotalPrice = require('./validateProductsTotalPrice');
const showCurrentCart = require('./showCurrentCart');
const showCurrentOrderInfo = require('./showCurrentOrderInfo');
const checkoutNewSale = require('./checkoutNewSale');
const newOrder = require('./newOrder');
const createSale = require('./createSale');

module.exports = {
  getRandomProducts,
  validateProductsTotalPrice,
  showCurrentCart,
  showCurrentOrderInfo,
  checkoutNewSale,
  newOrder,
  createSale
}
