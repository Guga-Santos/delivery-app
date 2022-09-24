import React, { useEffect, useState } from 'react';

export default function CheckoutList() {
  const [finalCart, setFinalCart] = useState();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart'));
    setFinalCart(items);
  }, []);

  return (
    <div
      className="checkout-list-container"
      style={ {
        width: '100vw',
        margin: '5vh auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' } }
    >
      <h3>Finalizar Pedido</h3>
      <table
        className="checkout-table"
        style={ { width: '90vw' } }
      >
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          { finalCart && finalCart.map((product, index) => (
            <tr key={ product.id }>
              <th
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                { product.name }

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                { product.quantity }

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { (product.price / product.quantity).toFixed(2).replace(/\./, ',') }

              </th>
              <th
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { (product.price).toFixed(2).replace(/\./, ',') }

              </th>
              <th>
                <button
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  type="button"
                >
                  Remover
                </button>

              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <h2
        data-testid="customer_checkout__element-order-total-price"
      >
        {finalCart && finalCart
          .map((obj) => obj.price)
          .reduce((a, b) => a + b, 0)
          .toFixed(2).replace(/\./, ',')}

      </h2>
    </div>
  );
}
