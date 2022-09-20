const customerProductsPage = require("../../../selectors/customer/products");
const getRandomProducts = require("./getRandomProducts");

const validateProductsTotalPrice = async (page, itemList) => {
  const { cart, totalPrice } = itemList || getRandomProducts();

  for (const { productId, name, quantity } of cart) {
    await expect(page).toGetTextFromElement(
      customerProductsPage.element.card.title +
        `[data-testid$='-${productId}']`,
      name
    );

    await expect(page).toClickOnElement({
      selector:
        customerProductsPage.button.card.addItem +
        `[data-testid$='-${productId}']`,
      clickCount: quantity,
      delay: 100,
    });

    await expect(page).toGetValueFromElement(
      customerProductsPage.input.card.quantity +
        `[data-testid$='-${productId}']`,
      String(quantity)
    );

    await expect(page).toClickOnElement({
      selector:
        customerProductsPage.button.card.rmItem +
        `[data-testid$='-${productId}']`,
      clickCount: quantity * 2,
      delay: 100,
    });

    await expect(page).toGetValueFromElement(
      customerProductsPage.input.card.quantity +
        `[data-testid$='-${productId}']`,
      "0"
    );

    await expect(page).toClickOnElement({
      selector:
        customerProductsPage.button.card.addItem +
        `[data-testid$='-${productId}']`,
      clickCount: quantity,
      delay: 100,
    });

    await expect(page).toGetValueFromElement(
      customerProductsPage.input.card.quantity +
        `[data-testid$='-${productId}']`,
      String(quantity)
    );
  }

  await expect(page).toGetTextFromElement(
    customerProductsPage.element.checkout.value,
    totalPrice
  );

  return true;
};

module.exports = validateProductsTotalPrice;
