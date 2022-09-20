const products = require("../../../entities/products");

const getRandomProducts = () => {
  const randomCards = products.state01.filter(() => Math.round(Math.random()));
  if (randomCards.length < 4) {
    return getRandomProducts();
  }

  let totalPrice = 0;
  const cart = randomCards.map(({ id: productId, name, price }, i) => {
    const quantity = Math.round(Math.random() * 5) || 1;
    const unitPrice = parseFloat(price);
    const subTotal = unitPrice * quantity;
    totalPrice = totalPrice + subTotal;
    return {
      id: i,
      productId,
      name,
      quantity,
      unitPrice: unitPrice.toFixed(2).replace(/\./, ","),
      subTotal: subTotal.toFixed(2).replace(/\./, ","),
    };
  });

  return {
    cart,
    totalPrice: totalPrice.toFixed(2).replace(/\./, ","),
  };
};

module.exports = getRandomProducts;
