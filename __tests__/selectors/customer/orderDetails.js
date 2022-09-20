const prefix = "customer_order_details__";
module.exports = {
  element: {
    orderDetails: {
      label: {
        orderId: `[data-testid^='${prefix}element-order-details-label-order-id']`,
        sellerName: `[data-testid^='${prefix}element-order-details-label-seller-name']`,
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
    deliveryCheck: {
      default: `button[data-testid='${prefix}button-delivery-check']`,
      disabled: `button[data-testid='${prefix}button-delivery-check'][disabled]`,
      notDisabled: `button[data-testid='${prefix}button-delivery-check']:not([disabled])`,
    },
  },
};
