const prefix = "customer_checkout__"
module.exports = {
  element: {
    orderTable:{
      itemNumber: `[data-testid^='${prefix}element-order-table-item-number-']`,
      name: `[data-testid^='${prefix}element-order-table-name-']`,
      quantity: `[data-testid^='${prefix}element-order-table-quantity-']`,
      unitPrice: `[data-testid^='${prefix}element-order-table-unit-price-']`,
      subTotal: `[data-testid^='${prefix}element-order-table-sub-total-']`,
      remove: `[data-testid^='${prefix}element-order-table-remove-']`,
    },
    totalPrice: `[data-testid='${prefix}element-order-total-price']`
  },
  select: {
    orderSeller: `select[data-testid^='${prefix}select-seller']`,
  },
  input: {
    address: `input[data-testid^='${prefix}input-address']`,
    addressNumber: `input[data-testid^='${prefix}input-address-number']`
  },
  button: {
    submitOrder: {
      default: `button[data-testid='${prefix}button-submit-order']`,
      disabled: `button[data-testid='${prefix}button-submit-order'][disabled]`,
    }
  }
}
