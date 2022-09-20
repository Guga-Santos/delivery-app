const prefix = "customer_products__";
module.exports = {
  element: {
    navbar: {
      links: {
        products: `[data-testid='${prefix}element-navbar-link-products']`,
        orders: `[data-testid='${prefix}element-navbar-link-orders']`,
        logout: `[data-testid='${prefix}element-navbar-link-logout']`,
      },
      userFullName: `[data-testid='${prefix}element-navbar-user-full-name']`,
    },
    card: {
      price: `[data-testid^='${prefix}element-card-price-']`,
      title: `[data-testid^='${prefix}element-card-title-']`,
    },
    checkout: {
      value: `[data-testid='${prefix}checkout-bottom-value']`,
    },
  },
  img: {
    card: {
      bgImage: `img[data-testid^='${prefix}img-card-bg-image-']`,
    },
  },
  button: {
    cart: {
      default: `button[data-testid='${prefix}button-cart']`,
      disabled: `button[data-testid='${prefix}button-cart'][disabled]`,
      notDisabled: `button[data-testid='${prefix}button-cart']:not([disabled])`,
    },
    card: {
      addItem: `button[data-testid^='${prefix}button-card-add-item-']`,
      rmItem: `button[data-testid^='${prefix}button-card-rm-item-']`,
    },
  },
  input: {
    card: {
      quantity: `input[data-testid^='${prefix}input-card-quantity-']`,
    },
  },
};
