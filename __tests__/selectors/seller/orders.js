const prefix = "seller_orders__"
module.exports = {
  element: {
    card:{
      orderId: `[data-testid^='${prefix}element-order-id-']`,
      deliveryStatus: `[data-testid^='${prefix}element-delivery-status-']`,
      orderDate: `[data-testid^='${prefix}element-order-date-']`,
      price: `[data-testid^='${prefix}element-card-price-']`,
      address: `[data-testid^='${prefix}element-card-address-']`
    }
  }
}
