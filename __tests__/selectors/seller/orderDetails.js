const prefix = "seller_order_details__";
module.exports = {
  element: {
    orderDetails: {
      label: {
        orderId: `[data-testid^='${prefix}element-order-details-label-order-id']`,
        orderDate: `[data-testid^='${prefix}element-order-details-label-order-date']`,
        deliveryStatus: `[data-testid^='${prefix}element-order-details-label-delivery-status']`,
      },
    },
    orderTable: {
      itemNumber: `[data-testid^='${prefix}element-order-table-item-number-']`,
      name: `[data-testid^='${prefix}element-order-table-name-']`,
      quantity: `[data-testid^='${prefix}element-order-table-quantity-']`,
      unitPrice: `[data-testid^='${prefix}element-order-table-unit-price-']`,
      subTotal: `[data-testid^='${prefix}element-order-table-sub-total-']`,
    },
    totalPrice: `[data-testid='${prefix}element-order-total-price']`,
  },
  button: {
    preparingCheck: {
      default: `button[data-testid='${prefix}button-preparing-check']`,
      disabled: `button[data-testid='${prefix}button-preparing-check'][disabled]`,
      notDisabled: `button[data-testid='${prefix}button-preparing-check']:not([disabled])`,
    },
    dispatchCheck: {
      default: `button[data-testid='${prefix}button-dispatch-check']`,
      disabled: `button[data-testid='${prefix}button-dispatch-check'][disabled]`,
      notDisabled: `button[data-testid='${prefix}button-dispatch-check']:not([disabled])`,
    },
  },
};
